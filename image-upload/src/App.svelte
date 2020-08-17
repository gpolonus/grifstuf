<script>
  import axios from 'axios'

  let formEl

  const handleSubmit = (event) => {
    console.log(event)
    const fd = new FormData(formEl)
    axios.post('upload', fd, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }
</script>

<main>
	<h1>Doodle Uploader</h1>
  <form
    on:submit|preventDefault={handleSubmit}
    enctype="multipart/form-data"
    bind:this={formEl}
  >
    <input name="name" type="text" />
    <input name="image" type="file" accept="image/*" />
    <input type="submit" value="Submit">
  </form>
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
