<script>

  import Canvas from "$lib/components/Canvas.svelte";
  import { siteTitle } from "$lib/stores";

  // t is time in seconds
  const render = (c, x, S, C, T, R) => t => {
  }

  siteTitle.set('stuf: Template')
</script>

<!-- <Canvas {render} steppable={0.01} /> -->
<!-- <Canvas {render} stoppable={true} /> -->
<Canvas {render} />