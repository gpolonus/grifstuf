<script>
  const pointsScale = [
    [6, 10],
    [11, 20],
    [21, 25],
    [26, 35],
    [36, 40],
    [41, 50],
    [51, 55],
    [56, 65],
    [66, 70],
    [71, 80]
  ].map(([min, max], i) => ({ min, max, points: i/2 }))

  let items = []

  let name = '', carbs = '';

  const addItem = () => {
    items = [...items, { name, carbs }]
    name = ''
    carbs = ''
  }

  $: total = items.reduce((ac, item) => ac + item.carbs, 0)
  $: points = (pointsScale.find(({ min, max }) => min <= total && total <= max) || {}).points || 0
</script>

<svelte:head>
  <title>GrifStuf: Points Calculator</title>
</svelte:head>

<h2>Quick Reference</h2>
<ul>
  {#each pointsScale as { min, max, points }}
  <li>[{min.toString().padStart(2)} - {max}]: {points}</li>
  {/each}
</ul>

<h2>Add an Item</h2>
<div>
  <label for='name-input'>Name</label>
  <input id='name-input' value={name} on:change={({ target: { value } }) => { name = value; }} />
</div>
<div>
  <label for='carb-input'>Carbs</label>
  <input id='carb-input' value={carbs} on:change={({ target: { value } }) => { carbs = parseFloat(value); }} />
</div>
<div>
  <label for='search'>Search</label>

</div>
<button on:click={addItem}>Add Items</button>


<ul>
  {#each items as { name, carbs }}
  <li>{name}: {carbs} carbs</li>
  {/each}
</ul>

<div>
  Total: {total}
</div>
<div>
  Points: {points}
</div>