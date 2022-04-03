import * as fs from "node:fs";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import windiCss from "vite-plugin-windicss";
import { quasar, transformAssetUrls } from "@quasar/vite-plugin";
import type { Plugin } from "rollup";

function loadEsbuild(): Plugin {
	return {
		name: "load-esbuild",
		buildEnd() {
			fs.copyFileSync(
				"./node_modules/esbuild-wasm/esbuild.wasm",
				"./dist/esbuild.wasm"
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
		loadEsbuild(),
	],
	build: {
		target: "esnext",
		rollupOptions: {
			external: [/node:.*/],
		},
	},
});
