<script>
  export const onSelect = () => {};
  let terms = $state('');
  let results;

  const makeRequest = async (endPoint, data) => {

  }

  const fetchFoodResults = async () => {

  }

  const fetchFoodCarbs = async () => {

  }
</script>

<input value={terms} onchange={({ target: { value } }) => { terms = value }} />
<button onclick={fetchFoodResults}>Search</button>

{#if results}
  <ul>
    {#each results as { name }}
    <li>{name}</li>
    {/each}
  </ul>
{/if}