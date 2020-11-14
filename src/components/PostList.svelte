<script>
	import distractions from '../data/distractions.yaml';
	$: posts = distractions.slice(1)
</script>

<ul>
	{#each posts as post}
		<li>
			<a href='{post.url}'>
				{post.title}
			</a>
		</li>
	{/each}
</ul>

