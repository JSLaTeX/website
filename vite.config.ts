import * as fs from 'node:fs';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import windiCss from 'vite-plugin-windicss';
import { quasar, transformAssetUrls } from '@quasar/vite-plugin';
import type { Plugin } from 'rollup';
import alias from '@rollup/plugin-alias';
import { join, dirname } from 'desm';

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
	resolve: {
		alias: {
			'~': join(import.meta.url, 'src'),
			'~root': dirname(import.meta.url),
		},
	},
	plugins: [
		alias({
			entries: [
				{
					find: /^([.~].*)\.js$/,
					replacement: '$1',
				},
			],
		}),
		vue({
			reactivityTransform: true,
			template: {
				transformAssetUrls,
			},
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
