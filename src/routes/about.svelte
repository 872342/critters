<script>
	import { fade } from 'svelte/transition';
</script>

<div class="container">
	<p class="text" transition:fade={{ duration: 100 }}>
		yet another ACNH critter app using <a href="https://acnhapi.com">acnhapi</a> and
		<a href="https://acnhcdn.com/">acnhcdn</a>
	</p>

	<p class="text">data is initially fetched from acnhapi and stored in localstorage</p>
</div>

<style>
	.container {
		display: grid;
		justify-content: center;
		margin-top: 3em;
	}
	.text {
		margin-top: 1em;
		text-align: left;
	}
</style>
