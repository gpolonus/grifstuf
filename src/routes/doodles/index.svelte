
<script>
  import doodles from './doodles.yaml'
  import Doodle from '../../components/Doodle.svelte'

  export let doodle = doodles[doodles.length - 1];

  $: date = new Date(doodle.date).toLocaleString()
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
  <Doodle
    title={doodle.title}
    alt={doodle.alt}
    url={doodle.url}
    date={date}
  />
<!-- </div> -->
