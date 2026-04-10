
<script>
  let blogPosts = [
    { name: 'Why Doodles?', path: 'doodles' },
    { name: 'What is your favorite part of your Bash Aliases?', path: 'bash-aliases' },
    // { name: 'What is so great about ortholinear keyboards?', path: 'ortho-keebs' },
    { name: 'How do I get started on something?', path: 'potato-scripts' }
  ]
</script>

<style>
  .blog-index {
    text-align: center;
  }
</style>

<div class='blog-index'>
  <h2>
    Questions with Answers
  </h2>

  {#each blogPosts as { name, path }}
    <h3><a href='blog/{path}'>{name}</a></h3>
  {/each}
</div>
