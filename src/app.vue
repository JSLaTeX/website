<script setup lang="ts">
import { onMounted } from 'vue';
import LandingBanner from './components/landing-banner.vue';
import FeaturesSection from './components/features-section.vue';
import FooterSection from '~/components/footer-section.vue';

onMounted(() => {
	// Make all links open in a new tab
	for (const link of document.links) {
		link.target = '_blank';
	}
});
</script>

<template>
	<div class="column">
		<landing-banner />
		<features-section />
		<footer-section />
	</div>
</template>
