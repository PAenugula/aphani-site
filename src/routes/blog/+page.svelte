<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>Blog</title>
	<meta name="description" content="My blog" />
</svelte:head>

<div class="text-column">
	<h1>Blog</h1>

	<div class="post-list">
		{#each data.posts as post}
			<article class="post-item">
				<a href="/blog/{post.slug}">
					<h2>{post.title}</h2>
				</a>
				<time datetime={post.date}>
					{new Date(post.date).toLocaleDateString()}
				</time>
				{#if post.description}
					<p>{post.description}</p>
				{/if}
			</article>
		{/each}
	</div>
</div>

<style>
	.post-list {
		display: flex;
		flex-direction: column;
		gap: 2rem;
		margin-top: 2rem;
	}

	.post-item {
		border-bottom: 1px solid #eee;
		padding-bottom: 2rem;
	}

	.post-item:last-child {
		border-bottom: none;
	}

	h2 {
		margin-bottom: 0.5rem;
	}

	time {
		font-size: 0.9rem;
		color: #666;
	}
</style>
