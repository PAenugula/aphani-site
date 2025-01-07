<script>
	import Counter from './Counter.svelte';
	import welcome from '$lib/images/svelte-welcome.webp';
	import welcomeFallback from '$lib/images/svelte-welcome.png';
	import phaniPFP from '$lib/images/phani_pfp.jpg';
	import Typewrite from '../components/Typewrite.svelte';
	import { json, text } from '@sveltejs/kit';

	let promise = $state();
	let pressed = $state(false);
	let question = $state("");
	let key = $state();
	let recentQuestion = $state();
	let empty_question = $state(false);

	async function updateWithQuestion() {
		pressed = true;
		if (question.length == 0) {
			question = '';
			empty_question = true;
			return;
		} else {
			empty_question = false;
			console.log(question);
		}
		promise = await fetch('/ask_phani', {
			method: 'POST',
			body: JSON.stringify({ question }),
			headers: { 'Content-Type': 'application/json' }
		}).then((response) => {
			response.json().then((json) => {
				recentQuestion = question;
				question = '';
				key = json.key;
			});
		});
	}
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
	<br />

	<h1 class="font-digi">
		<Typewrite text="Hi, i'm Phani" />
	</h1>
	<br />

	<Typewrite interval="20" text="Ask me a question below..." />

	<div class="place-items-center space-y-4">
		<div class="col-span-full">
			<label for="about" class="block text-sm/6 font-medium text-gray-900"
				>About

				<div class="mt-2">
					<textarea
						bind:value={question}
						placeholder="Your question..."
						name="about"
						id="about"
						rows="3"
						class="block w-full rounded-md bg-gray-800 px-3 py-1.5 text-base text-gray-200 outline outline-1 -outline-offset-1 outline-gray-900 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-sky-900 sm:text-sm/6"
					></textarea>
				</div>
			</label>
		</div>

		<button
			onclick={updateWithQuestion}
			type="submit"
			class="justify-center rounded-md bg-sky-900 px-6 py-3"
		>
			Ask
		</button>
	</div>

	<br />
	{#if pressed}
		{#if empty_question}
		<div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
			<span class="block sm:inline">Enter a question please</span>
		</div>
		{:else}
		{#await promise}
			<p>Loading...</p>
		{:then number}
			<p class="text-sky-700 text-sm/6"><em>you asked</em>: <strong>{recentQuestion}</strong></p>
			<br/>
			{#key key}
			<div class="gem-response">
				<Typewrite interval="20" text={"<strong>Phani</strong>: " + key}/>
			</div>
			{/key}
		{/await}
		{/if}
	{/if}
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

	textarea {
		width: 50vh;
		height: 10vh;
	}
	
	.gem-response {
		width: 70%;
	}
</style>
