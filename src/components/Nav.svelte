<script>
	import { base } from '$app/paths';
	export let mobileMenuVisible = false;
</script>

<nav class="banner">
	<div class="banner-content">
		<a href="{base}/" class="title">
			<h1>Critter</h1>
		</a>

		<button
			on:click={() => (mobileMenuVisible = !mobileMenuVisible)}
			class={mobileMenuVisible ? 'mobile-dropdown mobile-menu' : 'mobile-menu'}
		>
			<svg width="32" height="24">
				<line id="top" x1="0" y1="2" x2="32" y2="2" />
				<line id="middle" x1="0" y1="12" x2="32" y2="12" />
				<line id="bottom" x1="0" y1="22" x2="32" y2="22" />
			</svg>
		</button>
		<div class="banner-menu">
			<h6 class="menu-item"><a href="{base}/about">about</a></h6>
		</div>
	</div>
</nav>

<style>
	.banner {
		background: paleturquoise;
		z-index: 9999999;
		box-shadow: 0px 6px 8px 0px #c7c19c69;
	}

	.banner-content {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1em;
	}

	.banner-menu {
		display: none;
	}
	.menu-item {
		margin-right: 1rem;
	}

	/* remove a href style */
	a {
		text-decoration: none;
		color: black;
	}

	/* remove button style */
	.mobile-menu {
		background: none;
		border: none;
		outline: none;
	}

	/* svg hamburger */
	svg {
		min-height: 24px;
		transition: transform 0.3s ease-in-out;
	}

	svg line {
		/* `currentColor` means inherit color from the text color */
		stroke: currentColor;
		stroke-width: 3;
		transition: transform 0.1s ease-in-out;
	}

	/* adjust the Z-index, so that the icon is on top of the sidebar */
	button {
		z-index: 20;
	}

	/* rotate the top line */
	.mobile-dropdown #top {
		transform: translate(6px, 0px) rotate(45deg);
	}

	/* hide the middle */
	.mobile-dropdown #middle {
		opacity: 0;
	}

	/* rotate the bottom line */
	.mobile-dropdown #bottom {
		transform: translate(-12px, 9px) rotate(-45deg);
	}

	/* when screen is over 600px (desktop)*/
	@media only screen and (min-width: 600px) {
		.banner-content {
			display: flex;
			margin: auto;
			max-width: 1000px;
			align-items: center;
			padding: 1em;
		}
		.mobile-menu {
			display: none;
		}

		.banner-menu {
			display: flex;
			justify-content: flex-end;
		}
	}
</style>
