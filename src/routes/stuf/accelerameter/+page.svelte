<script lang="ts">
  // @ts-nocheck
  import { onMount } from "svelte";
  import { siteTitle } from "$lib/stores";

  let metrics = {}

  function handlePermission(f) {
    navigator.permissions.query({ name: "accelerameter" }).then((result) => {
      console(`State: ${result.state}`);

      if (result.state === "granted") {
        f()
      } else if (result.state === "prompt") {
        f()
      } else if (result.state === "denied") {
      }
    });
  }

  const aclInit = () => {
    const acl = new Accelerometer({ frequency: 60 });
    acl.addEventListener("reading", () => {
      metrics = {
        x: acl.x,
        y: acl.y,
        z: acl.z
      }
    });

    acl.start();
  }

  onMount(() => {
    handlePermission(aclInit)
  })

  siteTitle.set('stuf: Spiral')
</script>

<h1> Accelerameter Metrics </h1>

<h3>Will probably only work on Chrome</h3>

<h6>X: {metrics.x}</h6>
<h6>Y: {metrics.y}</h6>
<h6>Z: {metrics.z}</h6>
