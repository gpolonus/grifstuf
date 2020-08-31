<script>
  import doodles from './doodles.yaml'

  export let num = 0
  let rotate = 0;
  $: doodle = doodles[doodles.length - 1 - num]
  $: date = doodle.date && new Date(doodle.date).toLocaleString()
  $: fullUrl = `/converts/output-1000/${doodle.url}`
  $: url = `/converts/output-300/${doodle.url}`
  $: title = doodle.title
  $: alt = doodle.alt
</script>

<style>
  h1 {
    text-align: center;
  }

  .doodle {
    text-align: center;
  }
  
  .doodle .controls h2 {
    display: inline-block;
    text-decoration: underline;
    cursor: pointer;
  }
</style>

<svelte:head>
  <title>Grif's Doodles</title>
</svelte:head>

<h1>Grif's Doodles</h1>
<div class='doodle'>
  <div class='controls'>
    {#if num > 0}
      <a href='/doodles/{num - 1}'>
        <h2>
          Prev
        </h2>
      </a>
    {/if}
    {#if num < doodles.length - 1}
      <a href='/doodles/{num + 1}'>
        <h2>
          Next
        </h2>
      </a>
    {/if}
    <h2 on:click={() => rotate -= 90}> 
      Rotate
    </h2>
    <h2> 
      <a href={fullUrl} target='_blank'>
        Full
      </a>
    </h2>
  </div>
  <h3>
    {title}
  </h3>
  <div class='doodle-date'>
    {date}
  </div>
  <img
    src={url}
    alt={alt}
    title={alt}
    style="transform: rotate({rotate}deg)"
  />
</div>

