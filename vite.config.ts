import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import windiCss from 'vite-plugin-windicss';
import { quasar, transformAssetUrls } from '@quasar/vite-plugin';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue({
			template: { transformAssetUrls },
		}),
		windiCss(),
		quasar(),
	],
	build: {
		minify: false,
		rollupOptions: {
			external: [/node:.*/],
		},
	},
});
