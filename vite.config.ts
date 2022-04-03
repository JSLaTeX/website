import * as fs from 'node:fs';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import windiCss from 'vite-plugin-windicss';
import { quasar, transformAssetUrls } from '@quasar/vite-plugin';
import type { Plugin } from 'rollup';

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

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue({
			template: { transformAssetUrls },
		}),
		windiCss(),
		quasar(),
		copyWasm(),
	],
	build: {
		target: 'esnext',
		rollupOptions: {
			external: [/node:.*/],
		},
	},
});
