<script>
  // doodles/[slug]
  import Doodle from '$lib/components/Doodle.svelte'
  /** @type {import('$lib/doodles-data').Doodle} */
  export let data = {
    title: 'No Doodle Here',
    alt: 'No Doodle Here either',
    url: '/icon-192.png',
    publishedDate: new Date(),
    index: 0,
    last: false
  };
</script>

<Doodle doodle={data} />
