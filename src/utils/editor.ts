import type * as monaco from 'monaco-editor';
import onetime from 'onetime';
import type { Ref } from 'vue';
import { markRaw, onMounted, ref } from 'vue';

import { createMonacoEditor } from '~/utils/monaco/create.js';

const editor: Ref<monaco.editor.IStandaloneCodeEditor | undefined> = ref();
const display: Ref<monaco.editor.IStandaloneCodeEditor | undefined> = ref();

const monacoEditorElement = document.createElement('div');
monacoEditorElement.style.height = '100%';
const monacoDisplayElement = document.createElement('div');
monacoDisplayElement.style.height = '100%';

const createEditors = onetime(async () => {
	editor.value = markRaw(await createMonacoEditor(monacoEditorElement));
	display.value = markRaw(
		await createMonacoEditor(monacoDisplayElement, {
			readonly: true,
		})
	);
});

export function useEditor() {
	onMounted(async () => {
		await createEditors();
	});

	return {
		editor,
		display,
		monacoEditorElement,
		monacoDisplayElement,
	};
}
