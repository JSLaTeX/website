<script setup lang="ts">
import 'github-markdown-css';
import 'highlight.js/styles/github.css';

import hljs from 'highlight.js';
import { outdent } from 'outdent';
import { onMounted } from 'vue';

const getStartedElement = $ref<HTMLDivElement>();
onMounted(() => {
	for (const el of getStartedElement.querySelectorAll('pre')) {
		hljs.highlightElement(el);
	}
});

const calledFromJsExample = outdent`
	import { compileJsLatex, compileJsLatexFile } from 'jslatex';

	const result = await compileJsLatex(String.raw\`
		\\documentclass{article}
		<?= "Hello from EJS!" ?>
	\`);

	console.log(result);
	/*
		Outputs:

		\\documentclass{article}
		Hello from EJS!
	*/

	// In order for dynamic \`import()\`s to work, you need to pass projectBaseUrl:
	console.log(
		await compileJsLatexFile({
			filePath: 'cow.tex',
			projectBaseUrl: import.meta.url,
		})
	);
`;

const myFileTex = outdent`
	\\documentclass{article}
	\\begin{document}
		<?= "hello".toUpperCase() ?>
	\\end{document}
`;
</script>

<template>
	<div ref="getStartedElement" class="tab-2 px-8">
		<h1 class="font-bold text-5xl text-center">Get Started</h1>
		<div class="markdown-body m-8">
			<h2>Installation</h2>
			<pre class="language-bash">npm install --global jslatex</pre>

			<h2>Command-line Usage</h2>
			<p>
				Create a file called <code>myfile.tex</code> in the current directory:
			</p>

			<pre class="language-latex">{{ myFileTex }}</pre>

			<p>Run the following code:</p>
			<pre class="language-bash">jslatex myfile.tex -o mycompiledfile.tex</pre>

			<h2>Programmatic Usage</h2>
			<p>JSLaTeX can also be called from JavaScript:</p>
			<pre class="language-typescript">{{ calledFromJsExample }}</pre>
		</div>
	</div>
</template>
