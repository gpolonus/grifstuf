<script>
	import Nav from '../components/Nav.svelte';
	import Canvas from '../components/Canvas/Canvas.svelte'
	import Background from '../components/Canvas/Background.svelte'
	import Circles from '../components/Canvas/Circles.svelte'

	export let segment;
</script>

<style>
	main {
		padding: 2em;
		margin: 0 auto;
		box-sizing: border-box;
	}

	main.home {
		position: relative;
		height: 90vh;
		padding: 0;
		margin: 0;
	}

  footer {
		position: relative;
		text-align: center;
		color: white;
    font-size: 0.75em;
  }
</style>

<svelte:head>
  <link href="https://fonts.googleapis.com/css2?family=Anonymous+Pro:wght@400;700&display=swap" rel="stylesheet"/>
</svelte:head>

{#if segment !== undefined}
  <Nav {segment}/>
{/if}
<main class={segment === undefined ? 'home' : ''}>
	<Canvas>
		<Background color='hsl(0, 0%, 10%)' />
		<Circles />
	</Canvas>
	<slot></slot>
  <footer>
    © Griffin Polonus 2020. All Rights Reserved.
  </footer>
</main>

