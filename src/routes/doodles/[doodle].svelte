
<script context='module'>
  export function preload(page) {
    const { doodle } = page.params;
    return {
      doodleNum: Number(doodle)
    }
  }
</script>

<script>
  import Doodle from '../../components/Doodle.svelte'
  export let doodleNum = 0;
</script>

<Doodle num={doodleNum} />

