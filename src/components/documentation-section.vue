<script setup lang="ts"></script>

<template>
	<div class="w-full">
		<h1 class="text-center font-bold text-4xl">Documentation</h1>
		<div class="column items-center markdown-body p-8">
			<h2>Tags</h2>
			<div class="grid grid-cols-[max-content,1fr] gap-x-2 gap-y-1">
				<code>&lt;?</code>
				<span>Opening JavaScript tag; doesn't emit output.</span>
				<code>&lt;?_</code>
				<span>Opening JavaScript tag; removes all whitespace before it.</span>
				<code>&lt;?=</code>
				<span>Outputs value into template.</span>
				<code>_?&gt;</code>
				<span>Closing tag; all whitespace after it.</span>
				<code>&lt;?#</code>
				<span>Comment tag; not executed nor outputted.</span>
			</div>
		</div>
	</div>
</template>
