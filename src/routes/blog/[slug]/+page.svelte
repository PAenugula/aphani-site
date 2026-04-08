<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>{data.meta.title}</title>
	<meta property="og:type" content="article" />
	<meta property="og:title" content={data.meta.title} />
</svelte:head>

<article class="text-column">
	<h1>{data.meta.title}</h1>
	<p class="date">Published on {new Date(data.meta.date).toLocaleDateString()}</p>

	<div class="content">
		<svelte:component this={data.content} />
	</div>
</article>

<style>
	.date {
		color: #666;
		margin-bottom: 2rem;
	}

	.content :global(h2) {
		margin-top: 2rem;
	}

	.content :global(p) {
		margin-bottom: 1rem;
		line-height: 1.6;
	}

	.content :global(ul) {
		margin-bottom: 1rem;
		padding-left: 1.5rem;
	}

	.content :global(li) {
		margin-bottom: 0.5rem;
	}
</style>
