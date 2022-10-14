<script>
	import Card from './Card.svelte';
	import {
		fishdata,
		filteredFishdata,
		bugsdata,
		filteredBugsdata,
		seadata,
		filteredSeadata,
		caughtCritters,
		hideallday,
		hidecaught,
		expandall,
		time,
		hemisphere
	} from '../store.js';



	let type = 'fish';
	const toggleType = (newType) => {
		type = newType;
	};

	let showMoreInfo = false;
	const toggleMoreInfo = () => {
		showMoreInfo = !showMoreInfo;
	};

	const toggleAllDay = () => {
		$hideallday = !$hideallday;
	};

	const toggleCaught = () => {
		$hidecaught = !$hidecaught;
	};

	let selected;
</script>

<div class="menu-container">
	<div class="menu-title">
		<h3>showing critters available right now</h3>
		{new Date($time).toLocaleString('en-us', {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
			second: '2-digit'
		})}		
	</div>

	<div class="filter-content">
		<h6>Filters</h6>

		<div class="filter">
			<label for="hemisphere">Hemisphere</label>
			<select
				name="hemisphere"
				bind:value={selected}
				on:change={() => ($hemisphere = selected)}
				class="hemisphere"
			>
				<option selected value="northern">north</option>
				<option value="southern">south</option>
			</select>
		</div>

		<div class="filter">
			<label for="all day">hide all day</label>
			<input
				bind:checked={$hideallday}
				type="checkbox"
				name="all day"
				on:click={() => {
					toggleAllDay();
				}}
			/>
		</div>

		<div class="filter">
			<label for="hide caught">hide caught</label>
			<input
				bind:checked={$hidecaught}
				type="checkbox"
				name="hide caught"
				on:click={() => {
					toggleCaught();
				}}
			/>
		</div>

		<div class="filter">
			<label for="more info">Expand all</label>
			<input
				type="checkbox"
				name="more info"
				on:click={() => {
					toggleMoreInfo();
				}}
			/>
		</div>
	</div>
</div>

<div class="type-btns">
	<svg
		viewBox="0 0 32 32"
		xmlns="http://www.w3.org/2000/svg"
		class="button"
		on:click={() => toggleType('bugs')}
		><path
			class:active={type === 'bugs'}
			d="M13.434 9.958c-1.109-1.33-4.968-4.636-9.939-2.987-7.28 4.32-1.71 11.92 3.35 15.003-5.112 8.796 5.812 9.728 8.527 3.101.147-.227.396-.602.562-.598.17.005.506.45.601.598 1.374 2.938 7.347 6.832 9.632 2.286.8-1.592-.29-3.931-.716-5.774 4.569-1.983 9.862-11.186 3.869-14.22-3.706-1.875-7.448.735-10.459 2.59.176-1.71.866-3.252 2.343-4.33 1.995-1.457 3.175-.177 3.319-1.718.187-2.013-3.474-1.314-4.493-.82-2.493 1.205-3.356 3.966-3.882 6.481-.873-2.276-1.565-5.2-3.894-6.466-.918-.5-4.8-1.082-4.803.736-.004 1.545 2.07.587 3.61 1.904 1.353.92 1.872 2.743 2.373 4.214"
			fill="#897C66"
		/></svg
	>
	<svg
		viewBox="0 0 32 32"
		xmlns="http://www.w3.org/2000/svg"
		class="button"
		on:click={() => toggleType('fish')}
		><path
			class:active={type === 'fish'}
			d="M12.383 7.426C6.82 7.532 1.119 8.788.018 14.16c.018.267-.071.98.034 1.43 2.56 10.978 20.443 11.743 25.295 3.155l-.005.024c1.324 2.772 3.72 3.674 6.179 4.33.358.106.417-.182.297-.36-.687-1.129-2.174-3.886-2.293-6.778-.125-3.05 1.677-5.842 2.37-6.798.119-.21.209-.361-.15-.439-.507-.045-1.515.028-3.24.761-1.995.849-2.83 3.15-2.83 3.15-2.012-3.357-7.73-5.315-13.292-5.209zm-6.731 3.63c2.646-.094 2.984 5.104-.064 5.105-2.933.001-3.002-4.996.064-5.105z"
			fill="#897C66"
		/></svg
	>
	<svg
		viewBox="0 0 32 32"
		xmlns="http://www.w3.org/2000/svg"
		class="button"
		on:click={() => toggleType('sea')}
		><path
			class:active={type === 'sea'}
			d="M16 .003c-2.924 0-5.064.483-8.282 2.896C4.5 5.313 4.34 8.53 4.34 9.817s.16 4.827 2.252 7.24c1.587 1.801 3.516 2.203 1.288 2.736-2.252.321-3.54 2.09-3.54 2.09s-.724 1.047-.724 3.782c0 2.735 3.298 4.585 3.298 4.585s1.127 0 .966-1.125c-.16-1.127-.965-1.449.483-3.701 1.046-1.368 1.608-.965 1.608-.965s.483.482.322 1.286c-.563 1.046-.321 4.104 2.736 6.035 1.69.483 2.091.24 1.447-1.369-.16-1.77-.482-5.309 1.525-5.309 2.007 0 1.684 3.54 1.523 5.31-.643 1.608-.24 1.85 1.45 1.368 3.056-1.93 3.297-4.989 2.734-6.035-.161-.804.321-1.286.321-1.286s.563-.403 1.609.965c1.448 2.252.645 2.574.484 3.7-.161 1.127.965 1.126.965 1.126s3.297-1.85 3.297-4.585-.723-3.781-.723-3.781-1.287-1.77-3.54-2.091c-2.227-.533-.3-.935 1.288-2.736 2.091-2.414 2.252-5.953 2.252-7.24S27.5 5.313 24.282 2.9C21.064.486 18.924.003 16 .003zm-4.088 17.164a1.807 1.807 0 01.002 0 1.807 1.807 0 011.807 1.807 1.807 1.807 0 01-1.807 1.807 1.807 1.807 0 01-1.807-1.807 1.807 1.807 0 011.805-1.807zm8.035 0a1.807 1.807 0 01.002 0 1.807 1.807 0 011.807 1.807 1.807 1.807 0 01-1.807 1.807 1.807 1.807 0 01-1.806-1.807 1.807 1.807 0 011.804-1.807z"
			fill="#897C66"
		/></svg
	>
</div>

<!-- this forces whole component reload.. annoying 
	might work better to only load fish/bug/sea data (awaiting fetch)
-->
{#await Promise.all([$fishdata, $bugsdata, $seadata])}
	<div class="loading-container">
		<div class="loading-content">
			<img src="https://acnhcdn.com/latest/MenuIcon/Leaf.png" alt="icon" class="loading-icon" />
			<p>Loading critters..</p>
		</div>
	</div>
{:then}
	<div class="container">
		{#if type === 'fish'}
			{#if $filteredFishdata.length === 0}
				<p>no fish match this filter</p>
			{:else}
				{#each $filteredFishdata as fish (fish.id)}
					<Card data={fish} {type} {showMoreInfo} />
				{/each}
			{/if}
		{:else if type === 'bugs'}
			{#if $filteredBugsdata.length === 0}
				<p>no bugs match this filter</p>
			{:else}
				{#each $filteredBugsdata as bug (bug.id)}
					<Card data={bug} {type} {showMoreInfo} />
				{/each}
			{/if}
		{:else if $filteredSeadata.length === 0}
			<p>no sea creatures match this filter</p>
		{:else}
			{#each $filteredSeadata as sea (sea.id)}
				<Card data={sea} {type} {showMoreInfo} />
			{/each}
		{/if}
	</div>
{/await}

<style>
	.container {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
	}
	.loading-container {
		display: flex;
		justify-content: center;
	}
	.loading-content {
		background: #f5f7e1;
		padding: 1em 2em 2em 2em;
		margin: 2em;

		border-radius: 25px;
		text-align: center;
	}
	.loading-icon {
		max-width: 70px;
		animation: spin 1.5s ease-in-out infinite;
	}

	@keyframes spin {
		100% {
			transform: rotate(720deg);
		}
	}

	.menu-container {
		display: grid;
		align-items: normal;
		justify-content: center;
		grid-template-columns: 1fr 0fr;
		grid-template-rows: 1fr;
		gap: 0px 0px;
		grid-template-areas: 'menu-title filter-content';
		height: 100px;
		min-width: fit-content;
	}
	.menu-title {
		grid-area: menu-title;
		min-width: 200px;
	}
	.filter-content {
		grid-area: filter-content;
		min-width: 200px;
		/* min-width: 200px; */
		background: #f5f7e1;
		padding: 0.2em 0.8em 0.8em 0.8em;
		border-radius: 25px;
		justify-self: flex-end;
		height: fit-content;
	}
	.filter-content h6 {
		font-weight: 700;
		text-align: center;
	}
	.filter {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.hemisphere {
		padding-left: 5px;
		padding-right: 5px;
		border-radius: 25px;
		outline: none;
	}
	.hemisphere option {
		border-radius: 25px;
		background-color: #f5f7e1;
	}

	.type-btns {
		display: flex;
		/* justify-content: center; */
		margin-top: -2em;
	}

	/* when screen is over 600px (desktop)*/
	@media only screen and (min-width: 650px) {
		.container {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-around;
			margin: auto;
			max-width: 1000px;
			padding: 1em;
		}
		.menu-container {
			display: grid;
			grid-template-columns: 1fr 0fr;
			grid-template-rows: 1fr;
			gap: 0px 0px;
			grid-template-areas: 'menu-title filter-content';
			height: 70px;
			margin: auto;
			min-width: fit-content;
			max-width: 1000px;
			align-items: normal;
			padding: 1em;
		}
		.type-btns {
			display: flex;
			justify-content: center;
			margin-top: 0em;
		}
	}

	.button {
		margin-right: 1em;
		width: 50px;
		/* filter: brightness(0.0); */
		background: #f5f7e1;
		padding: 5px;
		border-radius: 25%;
	}
	.active {
		fill: #f7cc64;
	}
</style>
