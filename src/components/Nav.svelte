<script>
	export let segment;
</script>

<style>
	nav {
		border-bottom: 1px solid black;
		font-weight: 300;
		padding: 0 1em;
	}

	ul {
		margin: 0;
		padding: 0;
	}

	li {
		display: inline-block;
		font-size: 1.3rem;
	}

	.selected {
    text-decoration: underline;
	}

	a {
		text-decoration: none;
	}

  a:hover {
    text-decoration: underline;
  }
</style>

<nav>
	<ul>
		<li><a class:selected='{segment === undefined}' href='.'>home</a></li>
		<li><a class:selected='{segment === "doodles"}' href='doodles'>doodles</a></li>
		<li><a class:selected='{segment === "about"}' href='about'>about</a></li>
    <!-- <li><a class:selected='{segment === "stuf"}' href='stuf'>stuf</a></li> -->
    <!-- <li><a class:selected='{segment === "blog"}' href='blog'>blog</a></li> -->
	</ul>
</nav>
