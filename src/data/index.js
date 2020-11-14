import distractions from './distractions.yaml';

export const getDistractionsPost = (url) => {
	url = url || 'index'
	return distractions.find(post => post.url === url)
}

