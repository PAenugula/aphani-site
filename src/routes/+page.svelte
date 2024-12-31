<script>
	import Counter from './Counter.svelte';
	import welcome from '$lib/images/svelte-welcome.webp';
	import welcomeFallback from '$lib/images/svelte-welcome.png';
	import phaniPFP from '$lib/images/phani_pfp.jpg';
	import Typewrite from '../components/Typewrite.svelte';
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Phani's site" />
</svelte:head>

<section>

	<picture>
		<source srcset={phaniPFP} type="image/webp" />
		<img src={phaniPFP} alt="Welcome" />
	</picture>
	
	<h1 class="font-digi">
		<Typewrite text="Hi, I am Phani"/>
	</h1>

	<div class="font-typewrite invisible">
		<Typewrite text="Ask <em>me</em> a question below"/>
	</div>

</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	
	picture img {
		width: 50vh;
		border-radius: 20%;
	}

	h1 {
		padding: 0;
	}

	.me-pic {
		display: flex;
		position: relative;
		width: 100%;
		height: 100%;
		padding: 0 0 calc(100% * 495 / 2048) 0;
	}

	.me-pic img {
		position: absolute;
		width: 20%;
		height: 100%;
		justify-content: left;
		top: 0;
		display: block;
	}
</style>
