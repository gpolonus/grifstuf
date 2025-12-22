
<script>
  let { src } = $props();
</script>

<style>
  iframe {
    height: calc(100vh - 7em);
  }
</style>

<iframe title='asdf' width='100%' height='100%' frameborder='0' src={src}></iframe>
