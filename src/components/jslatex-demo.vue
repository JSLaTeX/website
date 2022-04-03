<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import type * as monaco from "monaco-editor";
import { useWindowSize } from "@vueuse/core";
import { compileJsLatex } from "../utils/latex";
import { createMonacoEditor } from "../utils/monaco/create";

const windowSize = useWindowSize();

const windowWidth = computed(() => windowSize.width.value);
const windowHeight = computed(() => windowSize.width.value);

const monacoEditorElement = ref<HTMLElement>();
const monacoDisplayElement = ref<HTMLElement>();

let editor: monaco.editor.IStandaloneCodeEditor | undefined;
let display: monaco.editor.IStandaloneCodeEditor | undefined;

const latexOnlineIframe = ref<HTMLIFrameElement>();

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
	editor = await createMonacoEditor(monacoEditorElement.value!);
	display = await createMonacoEditor(monacoDisplayElement.value!, {
		readonly: true,
	});

	editor.getModel()?.onDidChangeContent(async () => {
		await compileLatex();
	});

	window.addEventListener("resize", () => {
		editor?.layout();
		display?.layout();
	});
});

const latexCompileError = ref("");

const isCompileLatexPdfLoading = ref(false);

const hasCompiledLatexPdfBeenCalled = ref(false);
async function compileLatexPdf() {
	hasCompiledLatexPdfBeenCalled.value = true;

	const latex = display?.getValue();
	if (latex === undefined) return;
	if (latexOnlineIframe.value === undefined) return;

	isCompileLatexPdfLoading.value = true;

	latexOnlineIframe.value.addEventListener("load", () => {
		isCompileLatexPdfLoading.value = false;
	});

	latexOnlineIframe.value.src = `https://latexonline.cc/compile?text=${encodeURIComponent(
		latex
	)}`;
}
</script>

<template>
	<div class="column w-full">
		<div class="row h-120">
			<div ref="monacoEditorElement" class="flex-1"></div>
			<div class='w-[2px] bg-black self-stretch'></div>
			<div
				ref="monacoDisplayElement"
				class="flex-1 monaco-editor-wrapper--cursor-hidden"
			></div>
		</div>

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
		class="border-2 border-black rounded-md"
		:width="windowWidth * 0.8"
		:height="windowHeight * 0.8"
	></iframe>
</template>

<style>
.monaco-editor-wrapper--cursor-hidden .monaco-editor .cursors-layer > .cursor {
	display: none !important;
}
</style>
