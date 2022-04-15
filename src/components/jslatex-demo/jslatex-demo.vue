<script setup lang="ts">
import { useWindowSize } from '@vueuse/core';
import { watch } from 'vue';

import EditableJsLatexSection from '~/components/jslatex-demo/editable-jslatex-section.vue';
import { useEditor } from '~/utils/editor.js';
import { compileJsLatex } from '~/utils/latex.js';

const { editor, display } = $(useEditor());

async function compileLatex() {
	try {
		const latex = editor?.getValue();

		if (latex === undefined) return;

		display?.setValue(await compileJsLatex(latex));
	} catch (error: unknown) {
		console.error(error);
	}
}

watch(
	() => editor,
	() => {
		// Compile the LaTeX whenever the editor is changed
		editor?.getModel()?.onDidChangeContent(async () => {
			await compileLatex();
		});
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
