<script lang="ts">
  // @ts-nocheck
  import { onDestroy, onMount } from "svelte";

  export let render;
  export let stoppable = false
  export let steppable = false

  // u(t) is called 60 times per second.
  // t: elapsed time in seconds.
  // c: A 1920x1080 canvas.
  // x: A 2D context for that canvas.
  // S: Math.sin
  // C: Math.cos
  // T: Math.tan
  // R: Generates rgba-strings, ex.: R(255, 255, 255, 0.5)
  const S = v => Math.sin(v)
  const C = v =>Math.cos(v)
  const T = v => Math.tan(v)
  const R = (r,g,b,a) => {
    a = a === undefined ? 1 : a;
    return "rgba("+(r|0)+","+(g|0)+","+(b|0)+","+a+")";
  };

  let running = true;
  let start = () => {}

  const stop = () => {
    running = false
  }

  onMount(() => {
    const c = (document.getElementById('canvas') as HTMLCanvasElement)
    c.width = 1920
    c.height = 1080
    const x = c.getContext('2d')
    const u = render(c, x, S, C, T, R)

    if (steppable) {
      let t = 0
      c.onclick = () => {
        u(t)
        t += steppable
      }

      return
    }

    start = () => {
      setTimeout(() => {
        running = true
        console.log('started')
        let lastTime = Date.now()
        let elapsed = 0

        function loop() {
          if (!running) return;
          elapsed += Date.now() - lastTime
          lastTime = Date.now()
          requestAnimationFrame(loop)
          u(elapsed / 1000)
        }

        loop()
      })
    }

    if (stoppable) {
      running = false
      c.onclick = () => {
        running ? stop() : start()
      }

      return
    }

    start()
  })

  onDestroy(() => {
    stop()
  })

</script>

<style>
  canvas {
    display: block;
    margin: auto;
    padding: 1rem;
    max-width: calc(100vw - 2rem);
    max-height: calc(100vh - 7rem);
  }
</style>

<canvas id="canvas" />
