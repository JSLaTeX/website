<script setup lang="ts">
import { onMounted, ref } from "vue";
import ky from "ky";
import type * as monaco from "monaco-editor";
import { compileJsLatex } from "../utils/latex";
import { createMonacoEditor } from "../utils/monaco/create";

const monacoEditorElement = ref<HTMLElement>();
const monacoDisplayElement = ref<HTMLElement>();

let editor: monaco.editor.IStandaloneCodeEditor | undefined;
let display: monaco.editor.IStandaloneCodeEditor | undefined;
onMounted(async () => {
	editor = await createMonacoEditor(monacoEditorElement.value!);
	display = await createMonacoEditor(monacoDisplayElement.value!, {
		readonly: true,
	});

	window.addEventListener("resize", () => {
		editor?.layout();
		display?.layout();
	});
});

const compiledLatex = ref("");
const latexCompileError = ref("");

const isCompileLatexLoading = ref(false);

async function compileLatex() {
	isCompileLatexLoading.value = true;
	return;
	try {
		isCompileLatexLoading.value = true;
		const latex = editor?.getValue();

		if (latex === undefined) return;
		compiledLatex.value = await compileJsLatex(latex);
	} catch (error: unknown) {
		latexCompileError.value = (error as Error).message;
		console.error(latexCompileError.value);
	} finally {
		isCompileLatexLoading.value = false;
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
			<div ref="monacoEditorElement" class="flex-1"></div>
			<div
				ref="monacoDisplayElement"
				class="flex-1 monaco-editor-wrapper--cursor-hidden"
			></div>
		</div>

		<button
			class="rounded-md bg-[#007ACC] hover:bg-[#006ABC] hover:scale-105 transform transition-all text-white p-2 self-center m-4"
			@click="compileLatex()"
		>
			<q-spinner v-if="isCompileLatexLoading"></q-spinner>
			<span v-else>Compile</span>
		</button>
		<div>{{ latexCompileError }}</div>
	</div>
</template>

<style>
.monaco-editor-wrapper--cursor-hidden .monaco-editor .cursors-layer > .cursor {
	display: none !important;
}
</style>
