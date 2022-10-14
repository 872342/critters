<script>
	import '../global.css';
	import Nav from '../components/Nav.svelte';
	import { slide } from 'svelte/transition';
	//import { page } from '$app/stores';
	let open = false; //mobile sidebar
	import { base } from '$app/paths';
</script>

<main class="container">
	<Nav bind:mobileMenuVisible={open} />
	{#if open}
		<div class="sidebar" transition:slide>
			<div class="sidebar-items">
				<a
					href="{base}/about"
					class="item"
					on:click={() =>
						setTimeout(() => {
							open = false;
						}, 300)}
				>
					about
					<img
						src="https://acnhcdn.com/latest/ManpuIcon/QuestionMark.png"
						alt="icon"
						class="sidebar-item-icon"
					/>
				</a>
			</div>
		</div>
	{/if}

	<article class="content">
		<slot />
	</article>
</main>

<style>
	.container {
		font-family: 'Roboto Slab', serif;
	}
	.content {
		margin-top: 1rem;
		margin-left: 1rem;
		margin-right: 1rem;
		margin-bottom: 1rem;
	}

	.sidebar {
		right: 0;
		transition: right 0.2s ease-in-out;
		position: absolute;
		height: 100%;
		width: 100%;
		background: rgb(119, 184, 184);
		z-index: 12;
	}
	.sidebar-items {
		display: flex;
		text-align: left;
		margin-top: 2em;
		font-size: x-large;
		flex-direction: column;
		margin-left: 1em;
	}
	.item {
		align-items: center;
		display: flex;
	}
	.sidebar-item-icon {
		max-width: 40px;
	}
</style>
