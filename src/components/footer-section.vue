<script setup lang="ts">
import { mdiGithub } from '@mdi/js';
</script>

<template>
	<div>
		<div>Copyright {{ new Date().getFullYear() }} Leon Si</div>
		<v-icon :icon="mdiGithub"></v-icon>
	</div>
</template>
