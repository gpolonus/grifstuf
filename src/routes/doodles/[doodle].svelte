
<script context='module'>
  import doodles from './doodles.yaml'
  import Doodle from '../../components/Doodle.svelte'

  export function preload(page) {
    const { doodle } = page.params;
    return {
      doodle: doodles[doodles.length - doodle - 1],
      doodleNum: Number(doodle)
    }
  }
</script>

<script>
  export let doodle = {};
  export let doodleNum = 0;

  $: date = doodle.date && new Date(doodle.date).toLocaleString()
</script>

<style>
  .doodle-list {
    text-align: center;
  }

  .doodle {
    display: inline-block;
    padding: 10px;
    text-align: center;
  }

  h1 {
    text-align: center;
  }
</style>

<svelte:head>
  <title>Grif's Doodles</title>
</svelte:head>

<h1>Grif's Doodles</h1>
<!-- <div class='doodle-list'> -->
  <a href='/doodles/{doodleNum - 1}'>
    <h2>
      Prev
    </h2>
  </a>
  <Doodle
    title={doodle.title}
    alt={doodle.alt}
    url={doodle.url}
    date={date}
  />
  <a href='/doodles/{doodleNum + 1}'>
    <h2>
      Next
    </h2>
  </a>

<!-- </div> -->
