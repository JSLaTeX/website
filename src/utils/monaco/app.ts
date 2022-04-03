import type { LanguageId } from "./register";
import type { ScopeName, TextMateGrammar, ScopeNameInfo } from "./providers";

// Recall we are using MonacoWebpackPlugin. According to the
// monaco-editor-webpack-plugin docs, we must use:
//
// import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
//
// instead of
//
// import * as monaco from 'monaco-editor';
//
// because we are shipping only a subset of the languages.
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import {
	createOnigScanner,
	createOnigString,
	loadWASM,
} from "vscode-oniguruma";
import { SimpleLanguageInfoProvider } from "./providers";
import { registerLanguages } from "./register";
import { rehydrateRegexps } from "./configuration";
import VsCodeDarkTheme from "./vs-dark-plus-theme";
import jsLatexTmLanguage from "./grammars/JSLaTeX.tmLanguage.json";
import jsLatexConfiguration from "./configurations/jslatex.json";
import { outdent } from "outdent";

interface DemoScopeNameInfo extends ScopeNameInfo {
	path: string;
}

export async function loadMonacoEditor(element: HTMLElement) {
	// Adding a new TextMate grammar entails the following:
	// - adding an entry in the languages array
	// - adding an entry in the grammars map
	// - making the TextMate file available in the grammars/ folder
	// - making the monaco.languages.LanguageConfiguration available in the
	//   configurations/ folder.
	//
	// You likely also want to add an entry in getSampleCodeForLanguage() and
	// change the call to main() above to pass your LanguageId.
	const languages: monaco.languages.ILanguageExtensionPoint[] = [
		{
			id: "jslatex",
			extensions: [".tex"],
			aliases: ["JSLaTeX"],
		},
	];

	const grammars: { [scopeName: string]: DemoScopeNameInfo } = {
		"text.tex.latex.jslatex": {
			language: "latex",
			path: "JSLaTeX.tmLanguage.json",
		},
	};

	const fetchGrammar = async (
		scopeName: ScopeName
	): Promise<TextMateGrammar> => {
		const grammar = jsLatexTmLanguage;
		const type = "json";
		return { type, grammar };
	};

	const fetchConfiguration = async (
		language: LanguageId
	): Promise<monaco.languages.LanguageConfiguration> => {
		const rawConfiguration = jsLatexConfiguration;
		return rehydrateRegexps(rawConfiguration);
	};

	const data: ArrayBuffer | Response = await loadVSCodeOnigurumWASM();
	loadWASM(data);
	const onigLib = Promise.resolve({
		createOnigScanner,
		createOnigString,
	});

	const provider = new SimpleLanguageInfoProvider({
		grammars,
		fetchGrammar,
		configurations: languages.map((language) => language.id),
		fetchConfiguration,
		theme: VsCodeDarkTheme,
		onigLib,
		monaco,
	});
	registerLanguages(
		languages,
		(language: LanguageId) => provider.fetchLanguageInfo(language),
		monaco
	);

	const language = "jslatex";
	const value = getSampleCodeForLanguage(language);

	monaco.editor.create(element, {
		value,
		language,
		theme: "vs-dark",
		minimap: {
			enabled: true,
		},
	});

	provider.injectCSS();
}

// Taken from https://github.com/microsoft/vscode/blob/829230a5a83768a3494ebbc61144e7cde9105c73/src/vs/workbench/services/textMate/browser/textMateService.ts#L33-L40
async function loadVSCodeOnigurumWASM(): Promise<Response | ArrayBuffer> {
	const response = await fetch(
		"/node_modules/vscode-oniguruma/release/onig.wasm"
	);
	const contentType = response.headers.get("content-type");
	if (contentType === "application/wasm") {
		return response;
	}

	// Using the response directly only works if the server sets the MIME type 'application/wasm'.
	// Otherwise, a TypeError is thrown when using the streaming compiler.
	// We therefore use the non-streaming compiler :(.
	return response.arrayBuffer();
}

function getSampleCodeForLanguage(language: LanguageId): string {
	if (language === "jslatex") {
		return outdent`
			\documentclass{article}

			\begin{document}
			<?
				const magicSquare = [
					[2, 7, 6],
					[9, 5, 1],
					[4, 3, 8]
				];
			?>
			\begin{tabular}{|c|c|c|c|}
				\\\hline
				<? for (let rowIndex = 0; rowIndex < 4; rowIndex += 1) { ?>
					<? for (let columnIndex = 0; columnIndex < 4; columnIndex += 1) { ?>
						<? if (rowIndex === 3 && columnIndex === 3) { ?>
							<?
								let total = 0;
								for (let i = 0; i < 3; i += 1) {
									total += magicSquare[i][i];
								}
							?>
							<?= total ?>
						<? } else if (columnIndex === 3) { ?>
							<?# Ramda.js is exposed in the top level for convenient utility functions! ?>
							<?= R.sum(row) ?>
						<? } else if (rowIndex === 3) { ?>
							<?= R.sum(magicSquare.map(row => row[columnIndex])) ?>
						<? } else { ?>
							<?= magicSquare[rowIndex][columnIndex] ?> &
						<? } ?>
					<? } ?>
					\\\hline
				<? } ?>
			\end{tabular}
			\end{document}
		`;
	}

	throw Error(`unsupported language: ${language}`);
}
