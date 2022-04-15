<script setup lang="ts">
import { onMounted, ref } from 'vue';

console.log('created');

const monacoDisplayElementContainer = ref<HTMLElement>();

defineExpose({
	container: monacoDisplayElementContainer,
});
</script>

<template>
	<div class="overflow-hidden h-full">
		<div ref="monacoDisplayElementContainer" class="h-full"></div>
	</div>
</template>
