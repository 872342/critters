//import adapter from '@sveltejs/adapter-auto';

import adapter from '@sveltejs/adapter-static';

const dev = "production" === "development";


/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		prerender:{
			default:true
		},
		adapter: adapter({
			pages: 'docs',
            assets: 'docs',
            fallback: null
		}),
		paths: {
            base: "/critters",
        },
	}
};

export default config;
