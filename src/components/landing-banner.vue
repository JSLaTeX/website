<script setup lang="ts">
import '@fontsource/inter';
import '@fontsource/inter/variable.css';

import jslatexDemo from './jslatex-demo/jslatex-demo.vue';
</script>

<template>
	<div class="bg-js self-stretch column items-center">
		<div class="p-8 inter">
			<div class="row items-center gap-3 font-extrabold">
				<span class="text-xl animate-animated animate-slide-in-left"
					>&lt;?</span
				>
				<h1 class="text-center font-extrabold text-6xl inter">JSLaTeX</h1>
				<span class="text-xl animate-animated animate-slide-in-right"
					>?&gt;</span
				>
			</div>
			<p class="text-center">Supercharge your LaTeX with JavaScript!</p>
		</div>
		<jslatex-demo />
	</div>
</template>

<style scoped>
.inter {
	font-family: 'Inter', sans-serif;
}

@supports (font-variation-settings: normal) {
	.inter {
		font-family: 'InterVariable';
		font-variation-settings: 'wght' 400 900;
	}
}
</style>
