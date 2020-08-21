
<script>
  import doodles from './doodles.yaml'

  const fixedDateDoodles = doodles.map(d => ({
    ...d,
    date: new Date(d.date).toLocaleString()
  }))
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
</style>

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
