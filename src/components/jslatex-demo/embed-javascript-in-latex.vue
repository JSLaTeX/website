<script setup lang="ts">
import { useQuasar } from 'quasar';

const $q = useQuasar();
</script>

<template>
	<div class="column m-2">
		<div class="font-bold text-center text-xl">
			Embed JavaScript in LaTeX...
		</div>
		<div class="text-sm text-center">
			Edit the code below to change the compiled output
			<span>{{ $q.screen.lt.md ? 'below!' : 'on the right!' }}</span>
		</div>
	</div>
</template>
