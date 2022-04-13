import { quasar, transformAssetUrls } from '@quasar/vite-plugin';
import vue from '@vitejs/plugin-vue';
import { join } from 'desm';
import * as fs from 'node:fs';
import type { Plugin } from 'rollup';
import { defineConfig } from 'vite';
import jsImports from 'vite-plugin-js-imports';
import windiCss from 'vite-plugin-windicss';

function copyWasm(): Plugin {
	return {
		name: 'copy-wasm',
		generateBundle() {
			fs.copyFileSync(
				'./node_modules/esbuild-wasm/esbuild.wasm',
				'./dist/esbuild.wasm'
			);
			fs.copyFileSync(
				'./node_modules/vscode-oniguruma/release/onig.wasm',
				'./dist/onig.wasm'
			);
		},
	};
}

export default defineConfig({
	resolve: {
		alias: {
			'~': join(import.meta.url, 'src'),
		},
	},
	plugins: [
		vue({
			reactivityTransform: true,
			template: {
				transformAssetUrls,
			},
		}),
		windiCss(),
		quasar(),
		copyWasm(),
		jsImports(),
	]
});
