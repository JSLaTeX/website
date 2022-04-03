// Recall we are using Vite. According to the
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
import { outdent } from "outdent";
import { compileJsLatex } from "../latex";
import type { LanguageId } from "./register";
import type { ScopeName, TextMateGrammar, ScopeNameInfo } from "./providers";

import { SimpleLanguageInfoProvider } from "./providers";
import { registerLanguages } from "./register";
import { rehydrateRegexps } from "./configuration";
import VsCodeDarkTheme from "./vs-dark-plus-theme";
import jsLatexTmLanguage from "./grammars/JSLaTeX.tmLanguage.json";
import jsLatexConfiguration from "./configurations/jslatex.json";
import latexTmLanguage from "./grammars/LaTeX.tmLanguage.json";
import typescriptTmLanguage from "./grammars/TypeScript.tmLangauge.json";
import texTmLanguage from "./grammars/TeX.tmLanguage.json";

interface DemoScopeNameInfo extends ScopeNameInfo {
	path: string;
}

type CreateMonacoEditorOptions = {
	readonly?: boolean;
};
export async function createMonacoEditor(
	element: HTMLElement,
	{ readonly }: CreateMonacoEditorOptions = {}
) {
	// Adding a new TextMate grammar entails the following:
	// - adding an entry in the languages array
	// - adding an entry in the grammars map
	// - making the TextMate file available in the grammars/ folder
	// - making the monaco.languages.LanguageConfiguration available in the
	//   configurations/ folder.
	const languages: monaco.languages.ILanguageExtensionPoint[] = [
		{ id: "jslatex" },
		{ id: "latex" },
		{ id: "tex" },
		{ id: "typescript" },
	];

	const grammars: Record<string, DemoScopeNameInfo> = {
		"text.tex.latex.jslatex": {
			language: "jslatex",
			path: "JSLaTeX.tmLanguage.json",
		},
		"text.tex.latex": {
			language: "latex",
			path: "LaTeX.tmLanguage.json",
		},
		"text.tex": {
			language: "tex",
			path: "TeX.tmLanguage.json",
		},
		"source.ts": {
			language: "typescript",
			path: "TypeScript.tmLanguage.json",
		},
	};

	const fetchGrammar = async (
		scopeName: ScopeName
	): Promise<TextMateGrammar> => {
		switch (scopeName) {
			case "text.tex.latex":
				return {
					grammar: JSON.stringify(latexTmLanguage),
					type: "json",
				};
			case "text.tex.latex.jslatex":
				return {
					grammar: JSON.stringify(jsLatexTmLanguage),
					type: "json",
				};
			case "source.ts":
				return {
					grammar: JSON.stringify(typescriptTmLanguage),
					type: "json",
				};
			case "text.tex":
				return {
					grammar: JSON.stringify(texTmLanguage),
					type: "json",
				};
			default:
				throw new Error(`Unknown scope: ${scopeName}`);
		}
	};

	const fetchConfiguration = async (
		language: LanguageId
	): Promise<monaco.languages.LanguageConfiguration> => {
		let rawConfiguration: string;
		if (language === "jslatex") {
			rawConfiguration = JSON.stringify(jsLatexConfiguration);
		} else {
			throw new Error(`Unknown langauge ID: ${language}`);
		}

		return rehydrateRegexps(rawConfiguration);
	};

	const data: ArrayBuffer | Response = await loadVSCodeOnigurumWASM();

	await loadWASM(data);

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
		async (language: LanguageId) => provider.fetchLanguageInfo(language),
		monaco
	);

	const language = "jslatex";
	const sampleCode = getSampleCodeForLanguage(language);
	const value = readonly ? await compileJsLatex(sampleCode) : sampleCode;

	const editor = monaco.editor.create(element, {
		value,
		language,
		theme: "vs-light",
		lineNumbers: "off",
		readOnly: readonly,
		minimap: {
			enabled: false,
		},
	});

	provider.injectCSS();

	return editor;
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
		return outdent.string(String.raw`
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
				\hline
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
							<?= R.sum(magicSquare[rowIndex]) ?>
						<? } else if (rowIndex === 3) { ?>
							<?= R.sum(magicSquare.map(row => row[columnIndex])) ?> &
						<? } else { ?>
							<?= magicSquare[rowIndex][columnIndex] ?> &
						<? } ?>
					<? } ?>
					\\\hline
				<? } ?>
			\end{tabular}
			\end{document}
		`);
	}

	throw new Error(`unsupported language: ${language}`);
}
