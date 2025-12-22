<script>

  import Canvas from "$lib/components/Canvas.svelte";

  const render = (c, x, S, C, T, R) => {
    const m = [920,540]

    return (t) => {
      const r=t*3
      x.fillStyle=R((m[0]+=r*S(r)/3)*.13,(m[1]+=r*C(r)/3)/4.23,150)
      x.fillRect(...m,50,50)
    }
  }
</script>

<Canvas {render} />
