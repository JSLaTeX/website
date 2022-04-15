<script setup lang="ts">
import { onMounted, onUpdated } from 'vue';

import EmbedJavascriptInLatex from '~/components/jslatex-demo/embed-javascript-in-latex.vue';
import GetRegularLatexOut from '~/components/jslatex-demo/get-regular-latex-out.vue';
import { useEditor } from '~/utils/editor.js';

const { display, editor, monacoDisplayElement, monacoEditorElement } = $(
	useEditor()
);

const resizeObserver = new ResizeObserver(() => {
	display?.layout();
	editor?.layout();
});

function updateEditors() {
	console.log('i');
	const editorElement = document.querySelector('#editor')!;
	editorElement.insertBefore(monacoEditorElement, null);
	resizeObserver.observe(editorElement);

	const displayElement = document.querySelector('#display')!;
	displayElement.insertBefore(monacoDisplayElement, null);
	resizeObserver.observe(displayElement);
}

onMounted(updateEditors);
onUpdated(updateEditors);
</script>

<template>
	<div v-if="$q.screen.lt.md" class="mx-8 border-2 border-black">
		<EmbedJavascriptInLatex />
		<div class="overflow-hidden h-full h-60">
			<div id="editor" class="h-full"></div>
		</div>
		<GetRegularLatexOut />
		<div class="overflow-hidden h-full h-60">
			<div id="display" class="h-full"></div>
		</div>
	</div>
	<div v-else class="mx-8 border-2 border-black column h-120">
		<div class="row">
			<div class="flex-1">
				<EmbedJavascriptInLatex />
			</div>
			<div class="flex-1">
				<GetRegularLatexOut />
			</div>
		</div>
		<div class="grid grid-cols-2 flex-1">
			<div class="w-full">
				<div class="overflow-hidden h-full">
					<div id="editor" class="h-full"></div>
				</div>
			</div>
			<div class="w-full">
				<div class="overflow-hidden h-full">
					<div id="display" class="h-full"></div>
				</div>
			</div>
		</div>
	</div>
</template>
