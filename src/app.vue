<script setup lang="ts">
import { onMounted } from 'vue';

import DocumentationSection from '~/components/documentation-section.vue';
import FeaturesSection from '~/components/features-section.vue';
import FooterSection from '~/components/footer-section.vue';
import GetStartedSection from '~/components/get-started-section.vue';
import LandingBanner from '~/components/landing-banner.vue';

onMounted(() => {
	// Make all links open in a new tab
	for (const link of document.links) {
		link.target = '_blank';
	}
});
</script>

<template>
	<div class="column items-center h-full gap-8">
		<landing-banner />
		<div class="column gap-8 max-w-6xl">
			<features-section />
			<get-started-section />
			<documentation-section />
		</div>
		<footer-section class="self-stretch mt-auto" />
	</div>
</template>

<style>
body,
html,
#app {
	height: 100%;
}
</style>
