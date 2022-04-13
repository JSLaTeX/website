<script setup lang="ts">
import {
	mdiHeart,
	mdiLanguageJavascript,
	mdiPuzzle,
	mdiSpeedometer,
	mdiWeb,
	mdiWrench,
} from '@mdi/js';

type Feature = {
	name: string;
	description: string;
	icon: string;
};

const features: Feature[] = [
	{
		name: 'Plain JavaScript',
		description:
			"In JSLaTeX, you're writing plain JavaScript; no need to learn specialized syntax that you won't be using anywhere else.",
		icon: mdiLanguageJavascript,
	},
	{
		name: 'Compatibility',
		description:
			'By compiling to plain LaTeX, JSLaTeX is compatible with existing LaTeX tools, like <a href="https://app.uio.no/ifi/texcount/">TeXcount</a> and <a href="http://www.luatex.org">LuaTeX</a>.',
		icon: mdiPuzzle,
	},
	{
		name: 'Speed',
		description:
			'JSLaTeX is <em>fast</em>, allowing you to easily debug and iterate on your code.',
		icon: mdiSpeedometer,
	},
	{
		name: 'Tooling',
		description:
			'JSLaTeX comes with a <a href="https://marketplace.visualstudio.com/items?itemName=leonzalion.jslatex">custom VSCode extension</a> that supports syntax highlighting.',
		icon: mdiWrench,
	},
	{
		name: 'Ecosystem',
		description:
			'Through JavaScript, JSLaTeX unlocks access to the its massive ecosystem, including <a href="https://www.npmjs.com">1,000,000+ npm packages!</a>',
		icon: mdiWeb,
	},
	{
		name: 'Open Source',
		description:
			'JSLaTeX is <a href="https://github.com/JSLaTeX">open source</a>, MIT-licensed, actively maintained, and accepting contributions from the community!',
		icon: mdiHeart,
	},
];
</script>

<template>
	<div class="column items-center m-4">
		<h1 class="text-bold text-5xl">Features</h1>
		<div class="grid grid-cols-3 grid-rows-2 gap-4 py-8">
			<div
				v-for="feature of features"
				:key="feature.name"
				class="column items-center"
			>
				<v-icon :icon="feature.icon" size="40" />
				<h2 class="text-center font-bold text-xl" v-html="feature.name"></h2>
				<p
					class="text-center feature-description"
					v-html="feature.description"
				></p>
			</div>
		</div>
	</div>
</template>

<style scoped lang="postcss">
.feature-description ::v-deep(a) {
	@apply hover:text-blue-500 text-blue-400 underline;
}
</style>
