const path = require('path');
const { defineConfig } = require('eslint-define-config');

module.exports = defineConfig({
	extends: require.resolve('@leonzalion/configs/eslint.cjs'),
	parserOptions: {
		project: path.resolve(__dirname, 'tsconfig.eslint.json'),
		extraFileExtensions: ['vue'],
	},
	rules: {
		'vue/no-v-html': 'off',
		// See https://github.com/johnsoncodehk/volar/issues/604
		'@typescript-eslint/no-unused-vars': 'off',
	},
});
