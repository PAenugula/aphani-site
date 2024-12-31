<script>
    let {text} = $props();


    let display_text = $state('');
    let x = 0;
    let interval = 50;

    $effect(() => {
		setInterval(() => {
            display_text = text.substring(0, x);
            x = Math.min(x + 1, text.length);
		}, interval)
	});


</script>


{@html display_text}



