<script>
	/** @type {{ data: import('./$types').PageData }} */
	let { data } = $props();

	const { apod } = data;
</script>

<svelte:head>
	<title>{apod.title} · Stars</title>
	<meta name="description" content="NASA Astronomy Picture of the Day" />
</svelte:head>

<article class="stars">
	<header class="stars-header">
		<p class="eyebrow">NASA · Astronomy Picture of the Day</p>
		<h1>{apod.title}</h1>
		<p class="date">{apod.date}</p>
	</header>

	{#if apod.media_type === 'image'}
		<figure class="apod-figure">
			<a href={apod.hdurl || apod.url} target="_blank" rel="noopener noreferrer">
				<img src={apod.url} alt={apod.title} />
			</a>
			{#if apod.copyright}
				<figcaption class="credit">© {apod.copyright}</figcaption>
			{/if}
		</figure>
	{:else if apod.media_type === 'video'}
		<div class="apod-video">
			<iframe
				src={apod.url}
				title={apod.title}
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
				allowfullscreen
			></iframe>
			{#if apod.copyright}
				<p class="credit">© {apod.copyright}</p>
			{/if}
		</div>
	{:else}
		<p class="fallback">
			Today's media isn't an image.
			<a href={apod.url} target="_blank" rel="noopener noreferrer">Open it on NASA</a>
		</p>
	{/if}

	<p class="explanation">{apod.explanation}</p>

	{#if apod.link}
		<p class="source">
			<a href={apod.link} target="_blank" rel="noopener noreferrer">View on NASA</a>
		</p>
	{/if}
</article>

<style>
	.stars {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		width: 100%;
		max-width: 48rem;
		margin: 0 auto;
		padding: 1rem 0 3rem;
	}

	.stars-header {
		text-align: center;
	}

	.eyebrow {
		margin: 0 0 0.5rem;
		font-size: 0.75rem;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--color-theme-2);
	}

	h1 {
		margin: 0;
		font-size: clamp(1.5rem, 4vw, 2.2rem);
		line-height: 1.25;
		color: var(--color-theme-1);
	}

	.date {
		margin: 0.75rem 0 0;
		font-size: 0.9rem;
		color: var(--color-text);
		opacity: 0.75;
	}

	.apod-figure {
		margin: 0;
	}

	.apod-figure img {
		display: block;
		width: 100%;
		height: auto;
		border-radius: 6px;
		border: 1px solid var(--color-theme-2);
		background: var(--color-bg-2);
	}

	.apod-video {
		position: relative;
		width: 100%;
		aspect-ratio: 16 / 9;
	}

	.apod-video iframe {
		width: 100%;
		height: 100%;
		border: 1px solid var(--color-theme-2);
		border-radius: 6px;
	}

	.credit {
		margin: 0.5rem 0 0;
		font-size: 0.8rem;
		text-align: right;
		opacity: 0.7;
	}

	.explanation {
		margin: 0;
		font-size: 1rem;
		line-height: 1.65;
		color: var(--color-text);
	}

	.fallback {
		margin: 0;
		text-align: center;
	}

	.source {
		margin: 0;
		font-size: 0.85rem;
		opacity: 0.8;
	}
</style>
