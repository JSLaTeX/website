<script setup lang="ts"></script>

<template>
	<div class="prose max-w-full m-8">
		<h1 class="font-bold text-lg text-center">Get Started</h1>
		<h2>Installation</h2>
		<pre>npm install --global jslatex</pre>

		<h2>Command-line Usage</h2>
		<div>
			Create a file called <code>myfile.tex</code> in the current directory:
		</div>

		<pre>
			\documentclass{article}
			\begin{document}
				&lt;?= "hello".toUpperCase() ?&gt;
			\end{document}
		</pre
		>

		<div>Run the following code:</div>
		<pre>jslatex myfile.tex -o mycompiledfile.tex</pre>

		<h2>Programmatic Usage</h2>
		<div>JSLaTeX can also be called from JavaScript:</div>
		<pre>
			import { compileJsLatex, compileJsLatexFile } from 'jslatex';

const result = await compileJsLatex(String.raw`
\documentclass{article}
&lt;?= "Hello from EJS!" ?&gt;
`);

console.log(result);
// Outputs:
/*
\documentclass{article}
Hello from EJS!
*/

// In order for dynamic `import()`s to work, you need to pass projectBaseUrl:
console.log(
  await compileJsLatexFile({
    filePath: 'cow.tex',
    projectBaseUrl: import.meta.url,
  })
);
		</pre
		>
		<blockquote>
			<strong>Note:</strong> The
			<code>jslatex</code>
			package is ESM-only, meaning it can't be used from CommonJS. Please see
			<a
				href="https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c"
				>this gist</a
			>
			for more details.
		</blockquote>
	</div>
</template>
