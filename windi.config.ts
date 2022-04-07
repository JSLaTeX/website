/* eslint-disable import/extensions, node/file-extension-in-import */

import { defineConfig } from 'windicss/helpers';
import typography from 'windicss/plugin/typography';

export default defineConfig({
	shortcuts: {
		row: 'flex flex-row',
		column: 'flex flex-col',
		'absolute-center':
			'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2',
	},
	plugins: [typography()],
});
