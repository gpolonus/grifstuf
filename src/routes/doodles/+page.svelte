<script>
  import Doodle from '$lib/components/Doodle.svelte'

  let { data = {
    title: 'No Doodle Here',
    alt: 'No Doodle Here either',
    url: '/icon-192.png',
    publishedDate: new Date(),
    index: 0,
    last: false
  } } = $props();
</script>

<Doodle doodle={data} />
