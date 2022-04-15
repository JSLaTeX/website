<script setup lang="ts">
import { useWindowSize } from '@vueuse/core';
import type * as monaco from 'monaco-editor';
import { useQuasar } from 'quasar';
import { h, onMounted, watch } from 'vue';

import { compileJsLatex } from '~/utils/latex.js';
import { createMonacoEditor } from '~/utils/monaco/create.js';

import EmbedJavaScriptInLatex from './embed-javascript-in-latex.vue';
import GetRegularLatexOut from './get-regular-latex-out.vue';
import MonacoDisplayElement from './monaco-display-element.vue';
import MonacoEditorElement from './monaco-editor-element.vue';

function EditableJsLatexSection() {
	const $q = useQuasar();

	if ($q.screen.lt.md) {
		return h(
			'div',
			{
				class: 'mx-8 border-2 border-black',
			},
			[
				h(EmbedJavaScriptInLatex),
				h(MonacoEditorElement),
				h(GetRegularLatexOut),
				h(MonacoDisplayElement),
			]
		);
	} else {
		return h(
			'div',
			{
				class: 'mx-8 border-2 border-black column h-120',
			},
			[
				h('div', { class: 'row' }, [
					h('div', { class: 'flex-1' }, h(EmbedJavaScriptInLatex)),
					h('div', { class: 'flex-1' }, h(GetRegularLatexOut)),
				]),
				h('div', { class: 'grid grid-cols-2 flex-1' }, [
					h('div', { class: 'w-full' }, h(MonacoEditorElement)),
					h('div', { class: 'w-full' }, h(MonacoDisplayElement)),
				]),
			]
		);
	}
}

const monacoEditorComponent = $ref();
const monacoDisplayComponent = $ref();

function useEditor() {
	const monacoEditorElement = document.createElement('div');
	monacoEditorElement.style.height = '100%';
	const monacoDisplayElement = document.createElement('div');
	monacoDisplayElement.style.height = '100%';

	let editor: monaco.editor.IStandaloneCodeEditor | undefined;
	let display: monaco.editor.IStandaloneCodeEditor | undefined;

	onMounted(async () => {
		editor = await createMonacoEditor(monacoEditorElement);
		display = await createMonacoEditor(monacoDisplayElement, {
			readonly: true,
		});
	});

	const resizeObserver = new ResizeObserver(() => {
		editor?.layout();
		display?.layout();
	});

	// Whenever the monaco editor element's ref changes (i.e. when the screen is resized and the alternative editor layout renders with new HTML elements, re-insert the `monacoEditorElement` into the DOM)
	watch(
		() => monacoEditorComponent?.container,
		(container) => {
			resizeObserver.observe(container);
			container.insertBefore(monacoEditorElement, null);
		}
	);

	watch(
		() => monacoDisplayComponent?.container,
		(container) => {
			resizeObserver.observe(container);
			container.insertBefore(monacoDisplayElement, null);
		}
	);

	return {
		editor,
		display,
		...$$({
			monacoEditorElement,
			monacoDisplayElement,
		}),
	};
}

const { editor, display } = useEditor();

async function compileLatex() {
	try {
		const latex = editor?.getValue();

		if (latex === undefined) return;

		display?.setValue(await compileJsLatex(latex));
	} catch (error: unknown) {
		console.error(error);
	}
}

// Compile the LaTeX whenever the editor is changed
watch(
	() => editor,
	() => {
		if (editor !== undefined) {
			editor.getModel()?.onDidChangeContent(async () => {
				await compileLatex();
			});
		}
	}
);

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

// Variables used for the LatexOnline PDF <iframe> element
const windowSize = useWindowSize();
const latexOnlineIframe = $ref<HTMLIFrameElement>();
const windowWidth = $computed(() => windowSize.width.value);
const windowHeight = $computed(() => windowSize.width.value);
</script>

<template>
	<div class="column w-full">
		<EditableJsLatexSection />

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
					>Render PDF</span
				>
				<div v-if="isCompileLatexPdfLoading" class="absolute-center">
					<q-spinner size="2em" />
				</div>
			</button>

			<span class="text-xs text-gray-600">
				Powered by
				<a
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
