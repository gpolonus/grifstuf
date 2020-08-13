<script>
  const onchange = (e) => {
    console.log(e.target.files)
  }
</script>

<main>
	<h1>Doodle Uploader</h1>
	<input type="file" accept="image/*" on:change={onchange} />
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
