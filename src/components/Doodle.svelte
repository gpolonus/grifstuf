<script>
  let rotate = 0;
  export let title = '';
  export let alt = '';
  export let date = '';
  export let url = '';
</script>

<style>

  .doodle {
    display: inline-block;
    padding: 10px;
    text-align: center;
    cursor: pointer;
  }
</style>

<div class='doodle'>
  <h3>
    {title}
  </h3>
  <div class='doodle-date'>
    {date}
  </div>
  <img
    src='/converts/output-300/{url}'
    alt={alt}
    title={alt}
    on:click={() => rotate += 90}
    style="transform: rotate({rotate}deg)"
  />
</div>

