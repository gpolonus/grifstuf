import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/kit/vite';

import yaml from 'js-yaml';
import fs from 'fs';

const doodlePath = './src/lib/components/doodles.yaml'
const doodles = yaml.load(fs.readFileSync(doodlePath, 'utf8'));

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
        ...doodles.map((_, i) => `/doodles/${i}`),
        '/stuf/triangle-boxes',
        '/stuf/square-spiral',
        '/stuf/spiral',
      ]
    }
	}
};

export default config;
