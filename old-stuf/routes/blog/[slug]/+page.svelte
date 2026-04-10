<script>
  import { marked } from 'marked'

  let { data } = $props();
  let content = $derived(data.body)
</script>

<style>
  :global(p) {
    line-height: 1.35;
  }

</style>

<div>
  {@html marked.parse(content)}
</div>