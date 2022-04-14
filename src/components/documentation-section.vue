<script setup lang="ts"></script>

<template>
	<div class="w-full">
		<h1 class="text-center font-bold text-4xl">Documentation</h1>
		<div class="column items-center markdown-body p-8">
			<h2>Tags</h2>
			<div class="grid grid-cols-[max-content,1fr] gap-x-2 gap-y-1">
				<code>&lt;?</code>
				<span>Scriptlet Opening tag, doesn't emit output.</span>
				<code>&lt;?_</code>
				<span
					>Whitespace-slurping opening tag, removes all whitespace before
					it.</span
				>
				<code>&lt;?=</code>
				<span>Output opening tag, Outputs value into template.</span>
				<code>?&gt;</code>
				<span>Ordinary closing tag</span>
				<code>_?&gt;</code>
				<span
					>Whitespace-slurping closing tag, removes all whitespace after
					it.</span
				>
				<code>&lt;?#</code>
				<span>Comment tag, not executed nor outputted.</span>
			</div>
		</div>
	</div>
</template>
