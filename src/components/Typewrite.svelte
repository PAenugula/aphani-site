<script>
    let {text, interval = 50} = $props();
    let display_text = $state('');
    let x = 0;

    $effect(() => {
		setInterval(() => {
            display_text = text.substring(0, x);
            x = Math.min(x + 1, text.length);
            if(x == text.length) {

            }
		}, interval)

            return () => {
                  x = 0;
                  clearInterval();
            }
	});


</script>


{@html display_text}



