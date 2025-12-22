<script>
  let { segment } = $props();
</script>

<style>
  nav {
    position: fixed;
    width: 100%;
    z-index: 1;
    top: 0;
    left: 0;
    padding: 0 1rem;
    background-color: white;
    border-bottom: 1px solid black;
    font-weight: 300;
  }

  ul {
    margin: 0;
    padding: 0;
    padding-top: 0.25rem;
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
    <li><a class:selected='{!segment}' href='/'>home</a></li>
    <li><a class:selected='{segment === "doodles"}' href='/doodles'>doodles</a></li>
    <li><a class:selected='{segment === "blog"}' href='/blog'>blog</a></li>
    <li><a class:selected='{segment === "stuf"}' href='/stuf'>stuf</a></li>
    <li><a class:selected='{segment === "about"}' href='/about'>about</a></li>
    <!-- <li><a class:selected='{segment === "distractions"}' href='distractions'>distractions</a></li> -->
  </ul>
</nav>
