<script>
  import Nav from '$lib/components/Nav.svelte';

  import { page } from '$app/stores';

  $:segment = $page.route.id?.split('/')[1];

</script>

<style>

  :global(body) {
    font-size: 16px;
    font-family: Courier Prime, monospace;
  }

  :global(a) {
    color: inherit;
  }

  main {
    /* padding: 2em; */
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
    position: relative !important;
    width: 100%;
    bottom: 0;
    padding-top: 1rem;
    left: 1rem;
    color: black;
    font-size: 0.75em;
    background-color: white;
  }

</style>

{#if segment}
  <Nav {segment}/>
{/if}
<main class={!segment ? 'home' : ''}>
  <slot></slot>
  <footer>
    © Griffin Polonus 2021. All Rights Reserved.
  </footer>
</main>

