import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/kit/vite';
import 'isomorphic-fetch'

const url = process.env.NODE_ENV === 'production'
  ? 'https://box.grifstuf.com'
  : 'http://localhost:3000'

const numberOfDoodles = await fetch(`${url}/api/doodles?limit=1`)
  .then((response) => {
    if (response.status >= 400) {
        throw new Error("Bad response from server");
    }
    return response.json();
  })
  .then(data => data.totalDocs)

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://kit.svelte.dev/docs/integrations#preprocessors
  // for more information about preprocessors
  preprocess: vitePreprocess(),

  kit: {
    // adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
    // If your environment is not supported or you settled on a specific environment, switch out the adapter.
    // See https://kit.svelte.dev/docs/adapters for more information about adapters.
    adapter: adapter(),
    prerender: {
      entries: [
        ...(Array(numberOfDoodles).fill().map((_, i) => `/doodles/${i}`)),
        '/stuf/triangle-boxes',
        '/stuf/square-spiral',
        '/stuf/spiral',
      ]
    }
  }
};

export default config;
