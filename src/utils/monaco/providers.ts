/* eslint-disable @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment */

import type * as monaco from 'monaco-editor';
import { Color } from 'monaco-editor/esm/vs/base/common/color.js';
import { TokenizationRegistry } from 'monaco-editor/esm/vs/editor/common/languages.js';
import { generateTokensCSSForColorMap } from 'monaco-editor/esm/vs/editor/common/languages/supports/tokenization.js';
import type {
	IGrammar,
	IOnigLib,
	IRawGrammar,
	IRawTheme,
	StackElement,
} from 'vscode-textmate';
import { INITIAL, parseRawGrammar,Registry } from 'vscode-textmate';

import type { LanguageId, LanguageInfo } from './register.js';

type Monaco = typeof monaco;

/** String identifier for a "scope name" such as 'source.cpp' or 'source.java'. */
export type ScopeName = string;

export type TextMateGrammar = {
	type: 'json' | 'plist';
	grammar: string;
};

export type SimpleLanguageInfoProviderConfig = {
	// Key is a ScopeName.
	grammars: Record<string, ScopeNameInfo>;

	fetchGrammar: (scopeName: ScopeName) => Promise<TextMateGrammar>;

	configurations: LanguageId[];

	fetchConfiguration: (
		language: LanguageId
	) => Promise<monaco.languages.LanguageConfiguration>;

	// This must be available synchronously to the SimpleLanguageInfoProvider
	// constructor, so the user is responsible for fetching the theme data rather
	// than SimpleLanguageInfoProvider.
	theme: IRawTheme;

	onigLib: Promise<IOnigLib>;
	monaco: Monaco;
};

export interface ScopeNameInfo {
	/**
	 * If set, this is the id of an ILanguageExtensionPoint. This establishes the
	 * mapping from a MonacoLanguage to a TextMate grammar.
	 */
	language?: LanguageId;

	/**
	 * Scopes that are injected *into* this scope. For example, the
	 * `text.html.markdown` scope likely has a number of injections to support
	 * fenced code blocks.
	 */
	injections?: ScopeName[];
}

/**
 * Basic provider to implement the fetchLanguageInfo() function needed to
 * power registerLanguages(). It is designed to fetch all resources
 * asynchronously based on a simple layout of static resources on the server.
 */
export class SimpleLanguageInfoProvider {
	private readonly monaco: Monaco;
	private readonly registry: Registry;
	private readonly tokensProviderCache: TokensProviderCache;

	constructor(private readonly config: SimpleLanguageInfoProviderConfig) {
		const { grammars, fetchGrammar, theme, onigLib, monaco } = config;
		this.monaco = monaco;

		this.registry = new Registry({
			onigLib,

			async loadGrammar(scopeName: ScopeName): Promise<IRawGrammar | null> {
				const scopeNameInfo = grammars[scopeName];
				if (scopeNameInfo === null) {
					return null;
				}

				const { type, grammar } = await fetchGrammar(scopeName);
				// If this is a JSON grammar, filePath must be specified with a `.json`
				// file extension or else parseRawGrammar() will assume it is a PLIST
				// grammar.
				return parseRawGrammar(grammar, `example.${type}`);
			},

			/**
			 * For the given scope, returns a list of additional grammars that should be
			 * "injected into" it (i.e., a list of grammars that want to extend the
			 * specified `scopeName`). The most common example is other grammars that
			 * want to "inject themselves" into the `text.html.markdown` scope so they
			 * can be used with fenced code blocks.
			 *
			 * In the manifest of a VS Code extension, a grammar signals that it wants
			 * to do this via the "injectTo" property:
			 * https://code.visualstudio.com/api/language-extensions/syntax-highlight-guide#injection-grammars
			 */
			getInjections(scopeName: ScopeName): string[] | undefined {
				const grammar = grammars[scopeName];
				return grammar ? grammar.injections : undefined;
			},

			// Note that nothing will display without the theme!
			theme,
		});

		this.tokensProviderCache = new TokensProviderCache(this.registry);
	}

	/**
	 * Be sure this is done after Monaco injects its default styles so that the
	 * injected CSS overrides the defaults.
	 */
	injectCSS() {
		const cssColors = this.registry.getColorMap();
		const colorMap = cssColors.map((color) => Color.Format.CSS.parseHex(color));
		// This is needed to ensure the minimap gets the right colors.
		TokenizationRegistry.setColorMap(colorMap);
		const css = generateTokensCSSForColorMap(colorMap);
		const style = createStyleElementForColorsCSS();
		style.innerHTML = css;
	}

	async fetchLanguageInfo(language: LanguageId): Promise<LanguageInfo> {
		const [tokensProvider, configuration] = await Promise.all([
			this.getTokensProviderForLanguage(language),
			this.config.fetchConfiguration(language),
		]);
		return { tokensProvider, configuration };
	}

	private async getTokensProviderForLanguage(
		language: string
	): Promise<monaco.languages.EncodedTokensProvider | null> {
		const scopeName = this.getScopeNameForLanguage(language);
		if (scopeName === null) {
			return null;
		}

		const encodedLanguageId =
			this.monaco.languages.getEncodedLanguageId(language);
		// Ensure the result of createEncodedTokensProvider() is resolved before
		// setting the language configuration.
		return this.tokensProviderCache.createEncodedTokensProvider(
			scopeName,
			encodedLanguageId
		);
	}

	private getScopeNameForLanguage(language: string): string | null {
		for (const [scopeName, grammar] of Object.entries(this.config.grammars)) {
			if (grammar.language === language) {
				return scopeName;
			}
		}

		return null;
	}
}

class TokensProviderCache {
	private readonly scopeNameToGrammar: Map<string, Promise<IGrammar>> =
		new Map();

	constructor(private readonly registry: Registry) {}

	async createEncodedTokensProvider(
		scopeName: string,
		encodedLanguageId: number
	): Promise<monaco.languages.EncodedTokensProvider> {
		const grammar = await this.getGrammar(scopeName, encodedLanguageId);

		return {
			getInitialState() {
				return INITIAL;
			},

			tokenizeEncoded(
				line: string,
				state: monaco.languages.IState
			): monaco.languages.IEncodedLineTokens {
				const tokenizeLineResult2 = grammar.tokenizeLine2(
					line,
					state as StackElement
				);
				const { tokens, ruleStack: endState } = tokenizeLineResult2;
				return { tokens, endState };
			},
		};
	}

	async getGrammar(
		scopeName: string,
		encodedLanguageId: number
	): Promise<IGrammar> {
		const grammar = this.scopeNameToGrammar.get(scopeName);
		if (grammar !== undefined) {
			return grammar;
		}

		// This is defined in vscode-textmate and has optional embeddedLanguages
		// and tokenTypes fields that might be useful/necessary to take advantage of
		// at some point.
		const grammarConfiguration = {};
		// We use loadGrammarWithConfiguration() rather than loadGrammar() because
		// we discovered that if the numeric LanguageId is not specified, then it
		// does not get encoded in the TokenMetadata.
		//
		// Failure to do so means that the LanguageId cannot be read back later,
		// which can cause other Monaco features, such as "Toggle Line Comment",
		// to fail.
		const promise = this.registry
			.loadGrammarWithConfiguration(
				scopeName,
				encodedLanguageId,
				grammarConfiguration
			)
			.then((grammar: IGrammar | null) => {
				if (grammar) {
					return grammar;
				} else {
					throw new Error(`failed to load grammar for ${scopeName}`);
				}
			});
		this.scopeNameToGrammar.set(scopeName, promise);
		return promise;
	}
}

function createStyleElementForColorsCSS(): HTMLStyleElement {
	// We want to ensure that our <style> element appears after Monaco's so that
	// we can override some styles it inserted for the default theme.
	const style = document.createElement('style');

	// We expect the styles we need to override to be in an element with the class
	// name 'monaco-colors' based on:
	// https://github.com/microsoft/vscode/blob/f78d84606cd16d75549c82c68888de91d8bdec9f/src/vs/editor/standalone/browser/standaloneThemeServiceImpl.ts#L206-L214
	const monacoColors = document.querySelectorAll('.monaco-colors')[0];
	if (monacoColors) {
		monacoColors.parentElement?.insertBefore(style, monacoColors.nextSibling);
	} else {
		// Though if we cannot find it, just append to <head>.
		let { head } = document;
		if (head === null) {
			head = document.querySelectorAll('head')[0];
		}

		head?.appendChild(style);
	}

	return style;
}
