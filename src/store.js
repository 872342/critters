import { get, readable, writable, derived } from 'svelte/store';

import { browser } from '$app/env';

//search filters
export const hemisphere = writable(
	(browser && JSON.parse(localStorage.getItem('hemisphere'))) || 'northern'
);
hemisphere.subscribe((value) => {
	if (browser) localStorage.setItem('hemisphere', JSON.stringify(value));
});

export const hideallday = writable(
	(browser && JSON.parse(localStorage.getItem('hideallday'))) || false
);
hideallday.subscribe((value) => {
	if (browser) localStorage.setItem('hideallday', JSON.stringify(value));
});

export const hidecaught = writable(
	(browser && JSON.parse(localStorage.getItem('hidecaught'))) || false
);
hidecaught.subscribe((value) => {
	if (browser) localStorage.setItem('hidecaught', JSON.stringify(value));
});

export const expandall = writable(false);

//timedate data
export const currentMonth = writable(new Date().getMonth() + 1);
export const currentHour = writable(new Date().getHours());

//time store
export const time = readable(new Date(), function start(set) {
	const interval = setInterval(() => {
		set(new Date());
		currentMonth.set(new Date().getMonth() + 1);
		currentHour.set(new Date().getHours());
	}, 1000);
	return function stop() {
		clearInterval(interval);
	};
});

//ones user has already caught
export const caughtCritters = writable(
	(browser && JSON.parse(localStorage.getItem('caughtritters'))) || []
);
caughtCritters.subscribe((value) => {
	if (browser) localStorage.setItem('caughtritters', JSON.stringify(value));
});

//fetch fish
const fetchCritter = async (type) => {
	if (browser && JSON.parse(localStorage.getItem(`${type}data`))) {
		console.log('using localstorage');
		return;
	} else {
		const url = `https://acnhapi.com/v1a/${type}/`;
		const res = await fetch(url);
		const data = await res.json();
		console.log(`fetched ${type}`);

		if (type === 'fish') fishdata.set(data);
		else if (type === 'bugs') bugsdata.set(data);
		else seadata.set(data);

		if (browser) localStorage.setItem(`${type}data`, JSON.stringify(data));
	}
};

//fish
export const fishdata = writable(
	(browser && JSON.parse(localStorage.getItem('fishdata'))) || fetchCritter('fish')
);
fishdata.subscribe((value) => {
	if (browser) localStorage.setItem('fishdata', JSON.stringify(value));
});

//bugs
export const bugsdata = writable(
	(browser && JSON.parse(localStorage.getItem('bugsdata'))) || fetchCritter('bugs')
);
bugsdata.subscribe((value) => {
	if (browser) localStorage.setItem('bugsdata', JSON.stringify(value));
});

//sea
export const seadata = writable(
	(browser && JSON.parse(localStorage.getItem('seadata'))) || fetchCritter('sea')
);
seadata.subscribe((value) => {
	if (browser) localStorage.setItem('seadata', JSON.stringify(value));
});

const critterFilter = (critter) => {
	if (
		//if true, return crits not allday && available now, else return available now
		(get(hideallday)
			? !critter.availability.isAllDay &&
			  critter.availability['time-array'].includes(get(currentHour))
			: critter.availability['time-array'].includes(get(currentHour))) &&
		//if true, return if critter isnt caught, else return all
		(get(hidecaught) ? !get(caughtCritters).includes(critter.name['name-USen']) : true) &&
		//available this month
		critter.availability[`month-array-${get(hemisphere)}`].includes(get(currentMonth))
	)
		return true;
	else return false;
};

//filtered fish
export const filteredFishdata = derived(
	//if any of these change: re-filter
	[fishdata, hideallday, hidecaught, caughtCritters, currentHour, currentMonth, time],
	//must be [array]
	([$fishdata]) => {
		if ($fishdata.length > 0) return $fishdata.filter((fish) => critterFilter(fish));
	}
);

//filtered bugs
export const filteredBugsdata = derived(
	[bugsdata, hideallday, hidecaught, caughtCritters, currentHour, currentMonth, time],
	([$bugsdata]) => {
		if ($bugsdata.length > 0) return $bugsdata.filter((bug) => critterFilter(bug));
	}
);

//filtered sea
export const filteredSeadata = derived(
	[seadata, hideallday, hidecaught, caughtCritters, currentHour, currentMonth, time],
	([$seadata]) => {
		if ($seadata.length > 0) return $seadata.filter((sea) => critterFilter(sea));
	}
);
