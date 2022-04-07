<script setup lang="ts">
import { onMounted, watch } from 'vue';
import type * as monaco from 'monaco-editor';
import { useWindowSize } from '@vueuse/core';
import { compileJsLatex } from '../utils/latex.js';
import { createMonacoEditor } from '../utils/monaco/create.js';

const windowSize = useWindowSize();

const windowWidth = $computed(() => windowSize.width.value);
const windowHeight = $computed(() => windowSize.width.value);

const monacoEditorElement = document.createElement('div');
monacoEditorElement.style.height = '100%';
const monacoDisplayElement = document.createElement('div');
monacoDisplayElement.style.height = '100%';

const monacoEditorElementContainer = $ref<HTMLElement>();
const monacoDisplayElementContainer = $ref<HTMLElement>();

watch(
	() => monacoEditorElementContainer,
	(container) => {
		container.insertBefore(monacoEditorElement, null);
	}
);

watch(
	() => monacoDisplayElementContainer,
	(container) => {
		container.insertBefore(monacoDisplayElement, null);
	}
);

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

	window.addEventListener('resize', async () => {
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

<template lang="pug">
mixin embedJavaScriptInLatex
	div(class="column m-2")
		div(class="font-bold text-center text-xl")
			| Embed JavaScript in LaTeX...
		div(class="text-sm text-center")
			| Edit the code below to change the compiled output !{' '}
			span(v-if='$q.screen.lt.md') below!
			span(v-else) on the right!


mixin getRegularLatexOut
	div(class="column m-2")
		div(class="font-bold text-center text-xl") Get regular LaTeX out!
		div(class="text-sm text-center")
			| Press the Render PDF button below to render the below LaTeX as a PDF.

mixin monacoEditorElement
	div(class="overflow-hidden h-full" class!=attributes.class)
		div(class='h-full' ref='monacoEditorElementContainer')

mixin monacoDisplayElement
	div(class="overflow-hidden h-full" class!=attributes.class)
		div(class='h-full' ref='monacoDisplayElementContainer')

mixin editableJslatexSection
	//- For smaller screens
	div(
		v-if='$q.screen.lt.md'
		class="mx-8 border-2 border-black"
	)
		+embedJavaScriptInLatex
		+monacoEditorElement(class='h-60')
		+getRegularLatexOut
		+monacoDisplayElement(class='h-60')

	//- On larger screens, use a flexbox
	div(v-else class='mx-8 border-2 border-black column h-120')
		div(class='row')
			div(class='flex-1')
				+embedJavaScriptInLatex
			div(class='flex-1')
				+getRegularLatexOut
		div(class='grid grid-cols-2 flex-1')
			div(class='w-full')
				+monacoEditorElement
			div(class='w-full')
				+monacoDisplayElement

div(class="column w-full")
	+editableJslatexSection

	//- Render PDF Section
	div(class="column items-center mt-4 mb-3")
		button(
			class="rounded-md bg-[#007ACC] hover:bg-[#006ABC] hover:scale-105 transform transition-all text-white self-center p-2 mb-1 font-bold relative"
			@click="compileLatexPdf()"
		)
			span(
				:style="{ visibility: isCompileLatexPdfLoading ? 'hidden' : 'visible' }"
			) Render PDF
			div(v-if="isCompileLatexPdfLoading" class="absolute-center")
				q-spinner(size="2em")

		span(class="text-xs text-gray-600")
			| Powered by !{' '}
			a(
				class="text-blue-400 underline hover:text-blue-500"
				href="https://github.com/aslushnikov/latex-online"
			) LatexOnline
		div {{ latexCompileError }}

iframe(
	v-show="hasCompiledLatexPdfBeenCalled"
	ref="latexOnlineIframe"
	class="border-2 border-black rounded-md mb-8"
	:width="windowWidth * 0.8"
	:height="windowHeight * 0.8"
)
</template>

<style>
.monaco-editor-wrapper--cursor-hidden .monaco-editor .cursors-layer > .cursor {
	display: none !important;
}
</style>
