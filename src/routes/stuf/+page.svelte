
<script>
  let stufs = [
    { name: 'Triangles', path: 'triangles' },
    { name: 'Compound Interest Calculator', path: 'compound' },
    { name: 'Conway\'s Game of Life', path: 'https://conway.grifstuf.com', external: true },
    { name: 'Binaural Sound Maker', path: 'https://binaural.grifstuf.com/', external: true },
    { name: 'GrifText', path: 'https://text.grifstuf.com/', external: true },
    { name: 'Recursive Triangles', path: 'triangle-boxes' },

    // { name: 'Diabetes Carb Point Calculator', path: 'carb-points' },
    // { name: 'mirrormouse3', path: 'iframe/mirrormouse3' },
    // { name: 'Face with Eyes', path: 'face' }
  ]
</script>

<style>
  .wrapper {
    text-align: center;
  }

  .content {
    background-color: white;
    display: inline-block;
    padding: 2rem;
    border-radius: 4rem;
  }
</style>

<div class='wrapper'>
  <div class='content'>
    <h2>
      Stuf
    </h2>

    <p>Things that I made</p>

    {#each stufs as { name, path, external }}
      {#if external}
        <p><a href='{path}'>{name}</a></p>
      {:else}
        <p><a href='stuf/{path}'>{name}</a></p>
      {/if}
    {/each}
  </div>
</div>