
<script>
  import doodles from './doodles.yaml'

  const fixedDateDoodles = doodles.map(d => ({
    ...d,
    date: new Date(d.date).toLocaleString()
  })).reverse();
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
<div class='doodle-list'>
  {#each fixedDateDoodles as doodle}
    <div class='doodle'>
      <h3>
        {doodle.title}
      </h3>
      <div class='doodle-date'>
        {doodle.date}
      </div>
      <img
        src='/converts/output-300/{doodle.url}'
        alt={doodle.alt}
        title={doodle.alt}
      />
    </div>
  {/each}
</div>
