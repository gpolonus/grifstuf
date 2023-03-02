<script lang="ts">
  import { marked } from 'marked'

  export let data: { attributes: string, body: string }
  $: content = data.body
</script>

<style>
  :global(p) {
    line-height: 1.35;
  }

</style>

<div>
  {@html marked.parse(content)}
</div>