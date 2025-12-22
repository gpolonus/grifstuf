
<script>
  import { siteTitle } from "$lib/stores";
  let { children } = $props();

  siteTitle.set("grif's doodles")
</script>

{@render children?.()}