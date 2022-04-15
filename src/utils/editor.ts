import type * as monaco from 'monaco-editor';
import onetime from 'onetime';
import { onMounted } from 'vue';

import { createMonacoEditor } from '~/utils/monaco/create.js';

type Editors = {
	editor: monaco.editor.IStandaloneCodeEditor | undefined;
	display: monaco.editor.IStandaloneCodeEditor | undefined;
};
const editors: Editors = {
	editor: undefined,
	display: undefined,
};
const monacoEditorElement = document.createElement('div');
monacoEditorElement.style.height = '100%';
const monacoDisplayElement = document.createElement('div');
monacoDisplayElement.style.height = '100%';

const createEditors = onetime(async () => {
	editors.editor = await createMonacoEditor(monacoEditorElement);
	editors.display = await createMonacoEditor(monacoDisplayElement, {
		readonly: true,
	});
});

export function useEditor() {
	onMounted(async () => {
		await createEditors();
	});

	return {
		editors,
		monacoEditorElement,
		monacoDisplayElement,
	};
}
