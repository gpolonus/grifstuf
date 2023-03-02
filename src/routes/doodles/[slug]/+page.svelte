<script>
  // doodles/[slug]
  import Doodle from '$lib/components/Doodle.svelte'

  export let data = { doodleNum: 0 };
</script>

<Doodle num={data.doodleNum} />
