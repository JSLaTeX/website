<script setup lang="ts">
import { compileJsLatex } from "jslatex";
import { ref } from "vue";
import esbuildWasm from "esbuild-wasm";
import onetime from "onetime";
import ky from "ky";
import { outdent } from "outdent";

const getEsbuild = onetime(async () => {
	await esbuildWasm.initialize({
		wasmURL: "./node_modules/esbuild-wasm/esbuild.wasm",
	});
	return esbuildWasm;
});
getEsbuild();

const latexTextareaContent = ref(
	outdent
		.string(
			String.raw`
				\documentclass{article}

				\begin{document}
				<?
					const magicSquare = [
						[2, 7, 6],
						[9, 5, 1],
						[4, 3, 8]
					];
				?>
				\begin{tabular}{|c|c|c|c|}
					\\\hline
					<? for (let rowIndex = 0; rowIndex < 4; rowIndex += 1) { ?>
						<? for (let columnIndex = 0; columnIndex < 4; columnIndex += 1) { ?>
							<? if (rowIndex === 3 && columnIndex === 3) { ?>
								<?
									let total = 0;
									for (let i = 0; i < 3; i += 1) {
										total += magicSquare[i][i];
									}
								?>
								<?= total ?>
							<? } else if (columnIndex === 3) { ?>
								<?# Ramda.js is exposed in the top level for convenient utility functions! ?>
								<?= R.sum(row) ?>
							<? } else if (rowIndex === 3) { ?>
								<?= R.sum(magicSquare.map(row => row[columnIndex])) ?>
							<? } else { ?>
								<?= magicSquare[rowIndex][columnIndex] ?> &
							<? } ?>
						<? } ?>
						\\\hline
					<? } ?>
				\end{tabular}
				\end{document}
			`
		)
		.replaceAll("\t", "  ")
);
const compiledLatex = ref("");
const latexCompileError = ref("");

async function compileLatex(latex: string) {
	try {
		compiledLatex.value = await compileJsLatex({
			latex,
			etsOptions: {
				async transform(source: string) {
					const esbuild = await getEsbuild();
					const { code } = await esbuild.transform(source);
					return code;
				},
			},
		});
	} catch (error: unknown) {
		latexCompileError.value = (error as Error).message;
	}
}

void compileLatex(latexTextareaContent.value);

async function compileLatexPdf(latex: string) {
	ky.get(`https://latexonline.cc/compile`, {
		searchParams: {
			text: encodeURIComponent(compiledLatex.value),
		},
	});
}
</script>

<template>
	<div class="column w-full">
		<div class="row h-60">
			<textarea
				class="border-2 flex-1"
				v-model="latexTextareaContent"
				@change="compileLatex(latexTextareaContent)"
			>
			</textarea>

			<div class="flex-1">
				{{ compiledLatex }}
			</div>
		</div>

		<button @click="compileLatex(latexTextareaContent)">Compile</button>
	</div>
</template>
