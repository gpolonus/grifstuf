
<style>
  .wrapper {
    text-align: center;
  }

  .content {
    display: inline-block;
    padding: 2rem 6rem;
    background-color: white;
    border-radius: 4rem;
    max-width: 50vw;
    text-align: left;
  }

  @media only screen and (max-width: 550px) {
    .content {
      padding: 2rem 1rem;
    }
  }

  @media only screen and (max-width: 800px) {
    .content {
      max-width: 90vw;
    }
  }

  @media only screen and (max-height: 800px) {
    .wrapper {
      height: 80vh;
    }
  }
</style>

<svelte:head>
  <title>GrifBlog</title>
</svelte:head>

<div class='wrapper'>
  <div class='content'>
    <slot />
  </div>
</div>
