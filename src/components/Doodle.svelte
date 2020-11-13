<script>
  import doodles from './doodles.yaml'

  export let num = doodles.length - 1
  let rotate = 0;
  $: doodle = doodles[num]
  $: date = doodle.date && new Date(doodle.date).toLocaleString()
  $: fullUrl = `/converts/output-1000/${doodle.url}`
  $: url = `/converts/output-300/${doodle.url}`
  $: title = doodle.title
  $: alt = doodle.alt
</script>

<style>
  .doodle {
    text-align: center;
  }
  
  h1 {
    text-align: center;
  }

  h2 {
    display: inline-block;
    text-decoration: underline;
    cursor: pointer;
  }

  h2.dead {
    cursor: initial;
    text-decoration: line-through;
  }
  
  .controls a h2 {
    text-decoration: underline;
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
    {:else}
      <h2 class='dead'>
        Prev
      </h2>
    {/if}
    {#if num < doodles.length - 1}
      <a href='/doodles/{num + 1}'>
        <h2 class='link'>
          Next
        </h2>
      </a>
    {:else}
      <h2 class='dead'>
        Next
      </h2>
    {/if}
    <h2 on:click={() => rotate -= 90}> 
      Rotate
    </h2>
    <a href={fullUrl} target='_blank'>
      <h2>
        Full
      </h2>
    </a>
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

