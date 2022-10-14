//import adapter from '@sveltejs/adapter-auto';

import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		prerender:{
			default:true
		},
		adapter: adapter({
			pages: 'build',
            assets: 'build',
            fallback: null
		})
	}
};

export default config;
