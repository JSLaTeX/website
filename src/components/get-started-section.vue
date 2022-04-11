<script setup lang="ts">
import 'github-markdown-css';
import { outdent } from 'outdent';

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
	<div>
		<h1 class="font-bold text-5xl text-center">Get Started</h1>
		<div class="markdown-body m-8">
			<h2>Installation</h2>
			<pre>npm install --global jslatex</pre>

			<h2>Command-line Usage</h2>
			<div>
				Create a file called <code>myfile.tex</code> in the current directory:
			</div>

			<pre>{{ myFileTex }}</pre>

			<div>Run the following code:</div>
			<pre>jslatex myfile.tex -o mycompiledfile.tex</pre>

			<h2>Programmatic Usage</h2>
			<div>JSLaTeX can also be called from JavaScript:</div>
			<pre>{{ calledFromJsExample }}</pre>
		</div>
	</div>
</template>
