<script>
	import distractions from '../data/distractions.yaml';
	let posts = $derived(distractions.slice(1))
</script>

<ul>
	{#each posts as post}
		<li>
			<a href='/distractions/{post.url}'>
				{post.title}
			</a>
		</li>
	{/each}
</ul>

