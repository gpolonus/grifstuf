<script>
  let { children } = $props();
</script>

<style>
main {
  padding: 20px;
}

footer {
  padding: 20px;
  color: black;
  font-size: 0.75em;
  background-color: white;
}
</style>


<main>
  {@render children?.()}
</main>
<footer>
  © Griffin Polonus 2026. All Rights Reserved.
</footer>