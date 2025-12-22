<script>
  import { siteTitle } from '$lib/stores';

  let { doodle } = $props();
  let rotate = $state(0);
  let date = $derived(doodle.publishedDate && new Date(doodle.publishedDate).toLocaleString())
  let url = $derived(doodle.url)
  let title = $derived(doodle.title)
  let alt = $derived(doodle.alt)
  let num = $derived(doodle.index)

  siteTitle.set(`grif's doodles: ${title}`)

</script>

<style>
  .doodle {
    text-align: center;
  }

  .content {
    display: inline-block;
    padding: 2rem 6rem;
    background-color: white;
    border-radius: 4rem;
  }

  @media only screen and (max-width: 550px) {
    .content {
      padding: 2rem 1rem;
    }
  }

  h1 {
    text-align: center;
  }

  h2, .h2 {
    display: inline-block;
    text-decoration: underline;
    cursor: pointer;
    -webkit-touch-callout: none; /* iOS Safari */
      -webkit-user-select: none; /* Safari */
      -khtml-user-select: none; /* Konqueror HTML */
        -moz-user-select: none; /* Old versions of Firefox */
          -ms-user-select: none; /* Internet Explorer/Edge */
              user-select: none; /* Non-prefixed version, currently
                                    supported by Chrome, Edge, Opera and Firefox */
  }

  h2.dead {
    cursor: initial;
    text-decoration: line-through;
  }

  .controls a h2 {
    text-decoration: underline;
  }
</style>

<div class='doodle'>
  <div class='content'>
    <h1>Grif's Doodles</h1>
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
      {#if !doodle.last}
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
      <button class="h2" onclick={() => rotate -= 90}>
        Rotate
      </button>
      <!-- <a href={fullUrl} target='_blank'>
        <h2>
          Full
        </h2>
      </a> -->
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
</div>

