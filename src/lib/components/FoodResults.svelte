<script>
  export const onSelect = () => {};
  let terms = '';
  let results;

  const makeRequest = async (endPoint, data) => {

  }

  const fetchFoodResults = async () => {

  }

  const fetchFoodCarbs = async () => {

  }
</script>

<input value={terms} on:change={({ target: { value } }) => { terms = value }} />
<button on:click={fetchFoodResults}>Search</button>

{#if results}
  <ul>
    {#each results as { name }}
    <li>{name}</li>
    {/each}
  </ul>
{/if}