<script>
  import Nav from '$lib/components/Nav.svelte';

  import { page } from '$app/state';
  import { siteTitle } from '$lib/stores';
  let { children } = $props();

  let segment = $derived(page.route.id?.split('/')[1]);
  let blogPost = $derived(page.route.id === '/blog/[slug]')

</script>

<svelte:head>
  <title>{$siteTitle}</title>
</svelte:head>

<style>

  :global(body) {
    font-size: 16px;
    font-family: Courier Prime, monospace;
  }

  :global(a) {
    color: inherit;
  }

  main {
    padding-top: 2.25rem;
    min-height: calc(100vh - 2.5rem);
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
    padding-top: 1rem;
    color: black;
    font-size: 0.75em;
    background-color: white;
  }

</style>

{#if segment}
  <Nav {segment}/>
{/if}
<main class:home={!segment} class={segment} class:blog-post={blogPost}>
  {@render children?.()}
</main>
<footer>
  © Griffin Polonus 2025. All Rights Reserved.
</footer>

