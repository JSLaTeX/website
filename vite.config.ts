import * as fs from 'node:fs';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import windiCss from 'vite-plugin-windicss';
import { quasar, transformAssetUrls } from '@quasar/vite-plugin';
import type { Plugin } from 'rollup';
import { join } from 'desm';

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
		alias: [
			{
				find: '~',
				replacement: join(import.meta.url, 'src'),
				customResolver(source) {
					return {
						external: true,
						id: source.replace(/\.js$/, ''),
					};
				},
			},
		],
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
	],
	build: {
		target: 'esnext',
		rollupOptions: {
			external: [/node:.*/],
		},
	},
});
