<script setup lang="ts">
import { onMounted } from 'vue';
import type * as monaco from 'monaco-editor';
import { useWindowSize } from '@vueuse/core';
import { compileJsLatex } from '../utils/latex.js';
import { createMonacoEditor } from '../utils/monaco/create.js';

const windowSize = useWindowSize();

const windowWidth = $computed(() => windowSize.width.value);
const windowHeight = $computed(() => windowSize.width.value);

const monacoEditorElement = $ref<HTMLElement>();
const monacoDisplayElement = $ref<HTMLElement>();

let editor: monaco.editor.IStandaloneCodeEditor | undefined;
let display: monaco.editor.IStandaloneCodeEditor | undefined;

const latexOnlineIframe = $ref<HTMLIFrameElement>();

async function compileLatex() {
	try {
		const latex = editor?.getValue();

		if (latex === undefined) return;

		display?.setValue(await compileJsLatex(latex));
	} catch (error: unknown) {
		console.error(error);
	}
}

onMounted(async () => {
	editor = await createMonacoEditor(monacoEditorElement);
	display = await createMonacoEditor(monacoDisplayElement, {
		readonly: true,
	});

	editor.getModel()?.onDidChangeContent(async () => {
		await compileLatex();
	});

	window.addEventListener('resize', () => {
		editor?.layout();
		display?.layout();
	});
});

const latexCompileError = $ref('');

let isCompileLatexPdfLoading = $ref(false);

let hasCompiledLatexPdfBeenCalled = $ref(false);
async function compileLatexPdf() {
	hasCompiledLatexPdfBeenCalled = true;

	const latex = display?.getValue();
	if (latex === undefined) return;
	if (latexOnlineIframe === undefined) return;

	isCompileLatexPdfLoading = true;

	latexOnlineIframe.addEventListener('load', () => {
		isCompileLatexPdfLoading = false;
	});

	latexOnlineIframe.src = `https://latexonline.cc/compile?text=${encodeURIComponent(
		latex
	)}`;
}
</script>

<template>
	<div class="column w-full">
		<!-- Editable JSLaTeX section -->
		<div
			class="grid grid-cols-1 md:grid-cols-2 md:grid-rows-[auto,1fr] md:h-120 mx-8 border-2 border-black"
		>
			<div class="column flex-1 m-2">
				<div class="font-bold text-center text-xl">
					Embed JavaScript in LaTeX...
				</div>
				<div class="text-sm text-center">
					Edit the code below to change the compiled output on the right!
				</div>
			</div>
			<div class="column flex-1 m-2 row-start-3 md:row-start-1">
				<div class="font-bold text-center text-xl">Get regular LaTeX out!</div>
				<div class="text-sm text-center">
					Press the Render PDF button below to render the below LaTeX as a PDF
				</div>
			</div>
			<div class="<md:h-60 md:flex-1 overflow-hidden">
				<div ref="monacoEditorElement" class="h-full"></div>
			</div>
			<div class="<md:h-60 md:h-[unset] md:flex-1 overflow-hidden">
				<div
					ref="monacoDisplayElement"
					class="h-full monaco-editor-wrapper--cursor-hidden"
				></div>
			</div>
		</div>

		<!-- Render PDF Section -->
		<div class="column items-center mt-4 mb-3">
			<button
				class="rounded-md bg-[#007ACC] hover:bg-[#006ABC] hover:scale-105 transform transition-all text-white self-center p-2 mb-1 font-bold relative"
				@click="compileLatexPdf()"
			>
				<span
					:style="{
						visibility: isCompileLatexPdfLoading ? 'hidden' : 'visible',
					}"
				>
					Render PDF
				</span>
				<div v-if="isCompileLatexPdfLoading" class="absolute-center">
					<q-spinner size="2em"></q-spinner>
				</div>
			</button>
			<span class="text-xs text-gray-600">
				Powered by
				<a
					target="_blank"
					class="text-blue-400 underline hover:text-blue-500"
					href="https://github.com/aslushnikov/latex-online"
				>
					LatexOnline
				</a>
			</span>
			<div>{{ latexCompileError }}</div>
		</div>
	</div>

	<iframe
		v-show="hasCompiledLatexPdfBeenCalled"
		ref="latexOnlineIframe"
		class="border-2 border-black rounded-md mb-8"
		:width="windowWidth * 0.8"
		:height="windowHeight * 0.8"
	></iframe>
</template>

<style>
.monaco-editor-wrapper--cursor-hidden .monaco-editor .cursors-layer > .cursor {
	display: none !important;
}
</style>
