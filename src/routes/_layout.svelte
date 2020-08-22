<script>
	import Nav from '../components/Nav.svelte';

	export let segment;
</script>

<style>
	main {
		position: relative;
		background-color: white;
		padding: 2em;
		margin: 0 auto;
		box-sizing: border-box;
	}

  footer {
    font-size: 0.75em;
  }
</style>

<svelte:head>
  <link href="https://fonts.googleapis.com/css2?family=Anonymous+Pro:wght@400;700&display=swap" rel="stylesheet"/>
</svelte:head>

<Nav {segment}/>
<main>
	<slot></slot>
  <footer>
    © Griffin Polonus 2020. All Rights Reserved.
  </footer>
</main>

