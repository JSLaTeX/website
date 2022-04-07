<script setup lang="ts">
import jslatexDemo from './jslatex-demo.vue';
import '@fontsource/inter';
import '@fontsource/inter/variable.css';
</script>

<template>
	<div class="bg-js self-stretch column items-center">
		<div class="p-8">
			<h1 class="text-center font-extrabold text-6xl inter">JSLaTeX</h1>
			<p class="inter">Supercharge your LaTeX with JavaScript!</p>
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
