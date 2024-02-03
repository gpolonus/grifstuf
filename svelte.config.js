// import adapter from '@sveltejs/adapter-static';
import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import 'isomorphic-fetch'

const url = process.env.NODE_ENV === 'production'
  ? 'https://box.grifstuf.com'
  : 'http://localhost:3000'

// const numberOfDoodles = await fetch(`${url}/api/doodles?limit=1`)
//   .then((response) => {
//     if (response.status >= 400) {
//         throw new Error("Bad response from server");
//     }
//     return response.json();
//   })
//   .then(data => data.totalDocs)

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://kit.svelte.dev/docs/integrations#preprocessors
  // for more information about preprocessors
  preprocess: vitePreprocess(),

  kit: {
    adapter: adapter({
      // pages: 'build',
			// assets: 'build',
			// fallback: undefined,
			// precompress: false,
			// strict: true
    }),
    // prerender: {
    //   entries: [
    //     ...(Array(numberOfDoodles).fill().map((_, i) => `/doodles/${i}`)),
    //     '/stuf/triangle-boxes',
    //     '/stuf/square-spiral',
    //     '/stuf/spiral',
    //   ]
    // }
  }
};

export default config;
