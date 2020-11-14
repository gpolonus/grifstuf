<script>
	import { getDistractionsPost } from '../../data';

	export let segment = '';
	$: blogPost = getDistractionsPost(segment)
	$: title = blogPost.title
  $: date = blogPost.date && new Date(blogPost.date).toLocaleString()
</script>

<style>
	* {
		text-align: center;
	}

	.content {
		display: inline-block;
		text-align: left;
		width: 50%;
	}
</style>
<!--
<svelte:title>
	{title} - Distractions
</svelte:title>
-->
<h1>{title}</h1>
{#if date}
	<h3>Created: {date}</h3>
{/if}	
<div class='content-section'>
	<div class='content'>
		<slot />
	</div>
</div>

