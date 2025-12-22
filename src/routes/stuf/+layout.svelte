
<script>
  import { siteTitle } from "$lib/stores"
  let { children } = $props();
  siteTitle.set('stuf')
</script>

{@render children?.()}
