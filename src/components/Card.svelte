<script>
	import { fade, slide } from 'svelte/transition';
	import { caughtCritters, time } from '../store.js';

	import { onDestroy } from 'svelte';
	export let data;
	export let type;
	let special = 'cj';
	if (type === 'fish') special = 'cj';
	else special = 'flick';

	//Common -> ★☆☆☆, looks better
	const rarityToStar = (str) => {
		switch (str) {
			case 'Common':
				return '★☆☆☆';
			case 'Uncommon':
				return '★★☆☆';
			case 'Rare':
				return '★★★☆';
			case 'Ultra-rare':
				return '★★★★';
		}
	};

	//if this card is caught(hidden)
	let caught = false;
	const toggleCaught = () => {
		let critName = data.name['name-USen'];
		//if critter not in store: add, else: remove
		if (!$caughtCritters.includes(critName))
			caughtCritters.update((critters) => [critName, ...critters]);
		else caughtCritters.set([...$caughtCritters.filter((e) => e !== critName)]);
		caught = !caught;
	};

	//run every second by passing $time
	const calcTime = (curTime) => {
		let d = new Date(curTime);
		let currentHour = d.getHours();
		let lastTime = data.availability['time-array'].slice(-1)[0] + 1;
		let hoursleft = (lastTime - currentHour + 24) % 24;

		//set expiry date to HH:00:00
		d.setHours(d.getHours() + hoursleft);
		d.setMinutes(0);
		d.setSeconds(0);
		d.setMilliseconds(0);

		let countdownTime = d;
		let now = new Date().getTime();
		let duration = countdownTime.getTime() - now;
		if (duration > 0) {
			let days = Math.floor(duration / (1000 * 60 * 60 * 24));
			let hours = Math.floor((duration % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
			let minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
			let seconds = Math.floor((duration % (1000 * 60)) / 1000);
			return days + 'd ' + hours + 'h ' + minutes + 'm ' + seconds + 's ';
		} else {
			//delete
		}
	};

	$: timeleft = calcTime($time);
	//if(data.name['name-USen'] === "dace")

	//toggles arrow img
	export let showMoreInfo = false;
	const toggleMoreInfo = () => {
		showMoreInfo = !showMoreInfo;
	};

	//load && init saved caught critters
	if ($caughtCritters.includes(data.name['name-USen'])) {
		caught = true;
	}
</script>

<div class="card" transition:fade>
	{#if caught}
		<!-- if caught but not hiding, show caughticon in full color (bad?) -->
		<div class="catch-container">
			<div class="catch">
				{#if type === 'fish'}
					<img
						src="https://acnhcdn.com/latest/MenuIcon/GFishingrodCropped.png"
						alt="caught"
						on:click={() => toggleCaught()}
					/>
				{:else if type === 'bugs'}
					<img
						src="https://acnhcdn.com/latest/MenuIcon/NetCropped.png"
						alt=""
						on:click={() => toggleCaught()}
					/>
				{:else}
					<img
						src="https://acnhcdn.com/2.0/MenuIcon/WetSuitCropped.png"
						alt=""
						on:click={() => toggleCaught()}
					/>
				{/if}
			</div>
		</div>
	{:else}
		<!-- else show it greyed out -->
		<div class="catch-container" style="filter:grayscale(1)">
			<div class="catch">
				{#if type === 'fish'}
					<img
						src="https://acnhcdn.com/latest/MenuIcon/GFishingrodCropped.png"
						alt=""
						on:click={() => toggleCaught()}
					/>
				{:else if type === 'bugs'}
					<img
						src="https://acnhcdn.com/latest/MenuIcon/NetCropped.png"
						alt=""
						on:click={() => toggleCaught()}
					/>
				{:else}
					<img
						src="https://acnhcdn.com/2.0/MenuIcon/WetSuitCropped.png"
						alt=""
						on:click={() => toggleCaught()}
					/>
				{/if}
			</div>
		</div>
	{/if}

	<div class="name">
		{data.name['name-USen']}
	</div>

	<div class="icon">
		<img src={data['icon_uri']} alt="critter" />
	</div>

	<div class="timeleft">
		<span>{data.availability.isAllDay ? 'all day' : timeleft ?? '0d 0h 0m 00s'} left!</span>
	</div>

	{#if showMoreInfo}
		<div class="additional-info" transition:slide={{ y: 200, duration: 200 }}>
			<!-- sea critters have no special price -->
			{#if type !== 'sea'}
				{#if type === 'bugs'}
					<div class="special-price">
						<img src="https://acnhcdn.com/latest/NpcIcon/chy.png" alt={`${special} price`} />
						<span>{data[`price-${special}`]} </span>
					</div>
				{:else}
					<div class="special-price">
						<img src="https://acnhcdn.com/latest/NpcIcon/bey.png" alt={`${special} price`} />
						<span>{data[`price-${special}`]} </span>
					</div>
				{/if}
			{/if}

			<div class="nook-price">
				<img src="https://acnhcdn.com/latest/NpcIcon/rcm.png" alt="price" />
				<span> {data['price']} </span>
			</div>

			<!-- bugs have no shadow -->
			{#if type !== 'bugs'}
				<div class="shadow">
					<span>Shadow:</span> <span>{data.shadow}</span>
				</div>
			{/if}

			<!-- sea critters have no location or rarity, they have speed -->
			{#if type !== 'sea'}
				<div class="location">
					<span>Location:</span> <span>{data.availability.location}</span>
				</div>

				<div class="rarity">
					<span>Rarity:</span>
					<span class="rarity-stars">{rarityToStar(data.availability.rarity)}</span>
				</div>
			{:else}
				<div class="rarity">
					<span>Speed:</span>
					<span>{data.speed}</span>
				</div>
			{/if}
		</div>
	{/if}

	<div class="more-info-arrow" on:click={() => toggleMoreInfo()}>
		<img src="/arrow.png" alt="more info" class:showMoreInfo />
	</div>
</div>

<style>
	.card {
		width: 180px;
		background: #b56b6b;
		border-radius: 20px;
		overflow: hidden;
		box-shadow: 3px 5px 9px 0px #88888893;
		text-align: center;
		height: fit-content;
		margin: 0.2em;
		margin-top: 1rem;
	}
	.card:hover {
		box-shadow: 3px 5px 9px 0px #888888;
	}
	.name {
		width: 100%;
		background: #acd3b5;
		padding: 0.5rem;
	}
	.icon {
		background-color: #acd3b5;
		padding: 0.5rem;
		background: #f1dbd6;
		padding-bottom: 0.5rem;
	}
	.icon img {
		max-width: 128px;
	}
	.timeleft {
		background: rgb(228, 153, 153);

		padding: 1rem;
	}

	.special-price,
	.nook-price,
	.location,
	.rarity,
	.shadow {
		display: flex;
		align-items: center;
		justify-content: space-around;
		margin-top: 0.5rem;
		padding: 1px;
		min-height: 50px;
	}
	.special-price img,
	.nook-price img {
		max-width: 50px;
	}
	.rarity-stars {
		color: gold;
	}
	.catch-container {
		position: absolute;
	}
	.catch {
		cursor: pointer;
		position: relative;
		left: 160px;
		top: -5px;
	}
	.catch img {
		width: 30px;
		position: absolute;
	}

	.additional-info {
		margin-bottom: 0.5rem;
	}
	.more-info-arrow {
		padding-top: 3px;
	}
	.more-info-arrow img {
		width: 20px;
	}
	.showMoreInfo {
		transform: rotate(180deg);
	}
</style>
