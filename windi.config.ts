import { defineConfig } from 'windicss/helpers';

export default defineConfig({
	shortcuts: {
		row: 'flex flex-row',
		column: 'flex flex-col',
		'absolute-center':
			'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2',
	},
});
