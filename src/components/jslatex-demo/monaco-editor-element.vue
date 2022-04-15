<script setup lang="ts">
import { ref } from 'vue';

const monacoEditorElementContainer = ref<HTMLElement>();

defineExpose({
	container: monacoEditorElementContainer,
});
</script>

<template>
	<div class="overflow-hidden h-full">
		<div ref="monacoEditorElementContainer" class="h-full"></div>
	</div>
</template>
