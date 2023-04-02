
<script>
  import { siteTitle } from "$lib/stores";

  siteTitle.set('about grif')
</script>

<style>
  .content {
    background-color: white;
    padding: 2rem;
    border-radius: 4rem;
  }

  i {
    display: block;
    position: relative;
    width: 80vw;
    margin: 0;
  }

  @media (min-width: 1024px) {
    i {
      width: 50vw;
    }
  }

</style>

<div class='content'>

  <h1>About Grif</h1>

  <p>Hi, I'm Grif. This site is for my stuf. I like building things and annoying my friends.</p>

  <i>
    "If by chance some day you're not feeling well and you should remember some silly thing I've said or done and it brings back a smile to your face or a chuckle to your heart, then my purpose as your clown has been fulfilled."
  </i>
  <p>- Red Skelton</p>

  <h2>Contact Grif</h2>

  <ul>
    <li><a href='https://www.linkedin.com/in/griffin-polonus/'>LinkedIn</a></li>
    <li><a href='https://github.com/gpolonus'>GitHub</a></li>
  </ul>
</div>