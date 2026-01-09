<script>
	let answer = '';
	let isCorrect = false;
	let guessedIncorrectly = 0;
	const real_answer = 'echo'

	const checkAnswer = () => {
		if (answer.toLowerCase() === real_answer) {
			isCorrect = true;
		} else {
			guessedIncorrectly += 1;
		}
	};
</script>

<svelte:head>
	<title>Chaos</title>
	<meta name="description" content="Randomness" />
</svelte:head>

<div class="container">
	{#if !isCorrect}
		<div class="text-column">
			<form on:submit|preventDefault={checkAnswer}>
				<label for="riddle" class="riddle"
					>I speak without a mouth and hear without ears. I have no body, but I come alive with the
					wind. What am I?</label
				>
				<input id="riddle" type="text" bind:value={answer} placeholder="Your answer" required />
				<button type="submit">Submit</button>
			</form>
			{#if guessedIncorrectly > 0}
				<div class="error-message text-column" style="color: red; margin-top: 1rem;">
					Incorrect answer. Please try again.
				</div>
				{#if guessedIncorrectly > 3}
					<div class="hint-message text-column" style="color: gray33; margin-top: 1rem;">
						Hint: You can ask me...
					</div>
				{/if}
			{/if}
		</div>
	{:else}
		<div class="grid">
			<div class="success-message text-column">Yay! now you can look around...</div>
			<div class="grid-item">
				<img src="/images/image1.jpg" alt="Image 1" />
				<p>Image 1 Description</p>
			</div>
			<div class="grid-item">
				<img src="/images/image2.jpg" alt="Image 2" />
				<p>Image 2 Description</p>
			</div>
			<div class="grid-item">
				<img src="/images/image3.jpg" alt="Image 3" />
				<p>Image 3 Description</p>
			</div>
			<div class="grid-item">
				<img src="/images/image4.jpg" alt="Image 4" />
				<p>Image 4 Description</p>
			</div>
		</div>

		<style>
			.grid {
				display: grid;
				grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
				gap: 1rem;
				margin-top: 2rem;
			}

			.grid-item {
				text-align: center;
				border: 1px solid #ccc;
				border-radius: 8px;
				padding: 1rem;
				background-color: #f9f9f9;
			}

			.grid-item img {
				max-width: 100%;
				border-radius: 4px;
			}

			.grid-item p {
				margin-top: 0.5rem;
				font-size: 1rem;
				color: #333;
			}
		</style>
	{/if}
</div>

<style>
	.container {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100vh;
	}

	.riddle {
		color: var(--color-accent);
	}

	label {
		display: block;
		margin-bottom: 1rem;
		font-size: 1.2rem;
		color: #333;
	}

	input {
		width: 100%;
		padding: 0.5rem;
		margin-bottom: 1rem;
		border: 1px solid #ccc;
		border-radius: 4px;
		font-size: 1rem;
		color: var(--color-bg-2);
	}

	button {
		padding: 0.5rem 1rem;
		font-size: 1rem;
		color: #fff;
		background-color: var(--color-bg-2);
		border: none;
		border-radius: 4px;
		cursor: pointer;
	}

	button:hover {
		background-color: #0056b3;
	}

	.success-message {
		text-align: center;
		font-size: 1.5rem;
		color: #8cf4a4;
	}
</style>
