<script setup lang="ts">
import jslatexDemo from './jslatex-demo.vue';
import "@fontsource/inter";
</script>

<template>
	<div class="bg-blue-200 self-stretch column items-center">
		<h1 class="font-bold text-3xl">JSLaTeX</h1>
		<p class="inter">Supercharge your LaTeX with JavaScript!</p>
		<jslatex-demo />
	</div>
</template>

<style scoped>
.inter {
	font-family: "Inter";
}
</style>
