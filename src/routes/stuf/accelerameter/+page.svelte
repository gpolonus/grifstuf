<script lang="ts">
  // @ts-nocheck
  import Canvas from "$lib/components/Canvas.svelte";
  import { onMount } from "svelte";
  import { siteTitle } from "$lib/stores";

  let metrics = {}

  onMount(() => {
    const acl = new Accelerometer({ frequency: 60 });
    acl.addEventListener("reading", () => {
      metrics = {
        x: acl.x,
        y: acl.y,
        z: acl.z
      }
    });

    acl.start();
  })

  siteTitle.set('stuf: Spiral')
</script>

<h1> Accelerameter Metrics </h1>

<h3>Will probably only work on Chrome</h3>

<h6>X: {metrics.x}</h6>
<h6>Y: {metrics.y}</h6>
<h6>Z: {metrics.z}</h6>
