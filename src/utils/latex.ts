import esbuildWasm from 'esbuild-wasm';
import * as jsLatex from 'jslatex';
import onetime from 'onetime';

const getEsbuild = onetime(async () => {
	await esbuildWasm.initialize({
		wasmURL: import.meta.env.PROD
			? './esbuild.wasm'
			: './node_modules/esbuild-wasm/esbuild.wasm',
	});
	return esbuildWasm;
});

void getEsbuild();

export async function compileJsLatex(latex: string) {
	return jsLatex.compileJsLatex({
		latex,
		etsOptions: {
			async transform(source: string) {
				const esbuild = await getEsbuild();
				const { code } = await esbuild.transform(source);
				return code;
			},
		},
	});
}
