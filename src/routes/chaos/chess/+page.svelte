<script>
    let answer = '';
    let isCorrect = false;
    let guessedIncorrectly = false;

    const checkAnswer = () => {
        if (answer.toLowerCase() === 'booie') {
            isCorrect = true;
        } else {
            guessedIncorrectly = true;
        }
    };
</script>

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

<div class="container">
    {#if !isCorrect}
        <div class="text-column">
            <form on:submit|preventDefault={checkAnswer}>
                <label for="riddle" class="riddle">I speak without a mouth and hear without ears. I have no body, but I come alive with the wind. What am I?</label>
                <input
                    id="riddle"
                    type="text"
                    bind:value={answer}
                    placeholder="Your answer"
                    required
                />
                <button type="submit">Submit</button>
            </form>
        </div>
        {#if guessedIncorrectly}
            <div class="error-message text-column" style="color: red; margin-top: 1rem;">Incorrect answer. Please try again.</div>
        {/if}
    {:else}
        <div class="success-message text-column">Congratulations! You got it right!</div>
    {/if}
</div>