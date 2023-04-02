
<script>
  import { siteTitle } from "$lib/stores";

  siteTitle.set("grif's blog")
</script>

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

</style>

<div class='wrapper'>
  <div class='content'>
    <slot />
  </div>
</div>
