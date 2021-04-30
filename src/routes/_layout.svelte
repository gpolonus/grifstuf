<script>
	import Nav from '../components/Nav.svelte';
	import Canvas from '../components/Canvas/Canvas.svelte'
	import Background from '../components/Canvas/Background.svelte'
	import Circles from '../components/Canvas/Circles.svelte'
	import { stores } from '@sapper/app';
	const { page } = stores();

	export let segment;
</script>

<style>
	main {
		padding: 2em;
		margin: 0 auto;
		box-sizing: border-box;
	}

  @media only screen and (max-width: 550px) {
    main {
      padding: 2rem 0;
    }
  }

	main.home {
		position: relative;
		height: 90vh;
		padding: 0;
		margin: 0;
	}

  footer {
    position: fixed!important;
    bottom: 0;
    left: 1rem;
		color: black;
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
	<slot></slot>
  <footer>
		© Griffin Polonus 2021. All Rights Reserved.
  </footer>
</main>

