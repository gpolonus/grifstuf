
<script>
  let stufs = [
    { name: 'Triangles', path: 'triangles' },
    { name: 'Compound Interest Calculator', path: 'compound' },
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

    {#each stufs as { name, path }}
      <p><a href='stuf/{path}'>{name}</a></p>
    {/each}
  </div>
</div>