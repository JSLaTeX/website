<script setup lang="ts">
import { mdiGithub, mdiHeart,mdiLanguageJavascript } from '@mdi/js';

const jsIconHover = $ref(false);
</script>

<template>
	<div class="column items-center p-4 bg-js">
		<div class="gap-1 row items-center">
			<span>Made with </span>
			<div @mouseenter="jsIconHover = true" @mouseleave="jsIconHover = false">
				<v-icon v-if="!jsIconHover" :icon="mdiLanguageJavascript"></v-icon>
				<a v-else href="https://github.com/sorrycc/awesome-javascript">
					<v-icon :icon="mdiHeart" />
				</a>
			</div>
			<span>
				by
				<a
					class="underline text-blue-500 hover:text-blue-700"
					href="https://github.com/leonzalion"
				>
					Leon Si
				</a>
			</span>
		</div>
		<div class="row mt-2">
			<a
				class="hover:scale-105 transform transition-transform"
				href="https://github.com/JSLaTeX/website"
			>
				<v-icon :icon="mdiGithub"></v-icon>
			</a>
		</div>
	</div>
</template>
