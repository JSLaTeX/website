<script setup lang="ts">
import { compileJsLatex } from "jslatex";
import { onMounted, ref } from "vue";
import esbuildWasm from "esbuild-wasm";
import onetime from "onetime";
import ky from "ky";
import type * as monaco from "monaco-editor";
import { loadMonacoEditor } from "../utils/monaco/load";

const monacoEditorElement = ref<HTMLElement>();

let editor: monaco.editor.IStandaloneCodeEditor | undefined;
onMounted(async () => {
	editor = await loadMonacoEditor(monacoEditorElement.value!);

	window.addEventListener("resize", () => {
		editor?.layout();
	});
});

const getEsbuild = onetime(async () => {
	await esbuildWasm.initialize({
		wasmURL: "./node_modules/esbuild-wasm/esbuild.wasm",
	});
	return esbuildWasm;
});

void getEsbuild();

const compiledLatex = ref("");
const latexCompileError = ref("");

async function compileLatex() {
	const latex = editor?.getValue();

	if (latex === undefined) return;

	try {
		compiledLatex.value = await compileJsLatex({
			latex,
			etsOptions: {
				async transform(source: string) {
					const esbuild = await getEsbuild();
					const { code } = await esbuild.transform(source);
					return code;
				},
			},
		});
	} catch (error: unknown) {
		latexCompileError.value = (error as Error).message;
		console.error(latexCompileError.value);
	}
}

async function compileLatexPdf(latex: string) {
	await ky.get(`https://latexonline.cc/compile`, {
		searchParams: {
			text: encodeURIComponent(compiledLatex.value),
		},
	});
}
</script>

<template>
	<div class="column w-full">
		<div class="row h-120">
			<div ref="monacoEditorElement" class="border-2 flex-1"></div>

			<div class="flex-1">
				{{ compiledLatex }}
			</div>
		</div>

		<button @click="compileLatex()">Compile</button>
		<div>{{ latexCompileError }}</div>
	</div>
</template>
