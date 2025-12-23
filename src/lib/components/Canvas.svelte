<script>
  import { onDestroy, onMount } from "svelte";

  let { render,
    stoppable = false,
    steppable = false,
    zoomable = false,
    width = 1920,
    height = 1080
  } = $props();

  // u(t) is called 60 times per second.
  // t: elapsed time in seconds.
  // c: A 1920x1080 canvas.
  // x: A 2D context for that canvas.
  // S: Math.sin
  // C: Math.cos
  // T: Math.tan
  // R: Generates rgba-strings, ex.: R(255, 255, 255, 0.5)
  const S = v => Math.sin(v)
  const C = v => Math.cos(v)
  const T = v => Math.tan(v)
  const R = (r,g,b,a) => {
    a = a === undefined ? 1 : a;
    return `rgba(${r|0}, ${g|0}, ${b|0}, ${a})`;
  };

  let running = true;
  let start = () => {}

  const stop = () => {
    running = false
  }

  onMount(() => {
    const c = (document.getElementById('canvas'))
    c.width = width
    c.height = height
    const x = c.getContext('2d')
    const u = render(c, x, S, C, T, R) || (() => {})

    window.drawSpot = (x0, y0, r = 100) => {
      x.fillStyle= 'red'
      x.beginPath()
      x.arc(x0, y0, r, 0, Math.PI * 2)
      x.fill()
    }

    if (steppable) {
      let t = 0
      c.onclick = () => {
        t += steppable
        u(t)
      }

      u(t)

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

    if (zoomable) {
      console.log('zoomable');
      (() => {
        let mousePosition;
        c.addEventListener('mousedown', (e) => {
          console.log('mousedown', e)
          mousePosition = [e.offsetX, e.offsetY]
          c.addEventListener('mousemove', onMouseMove)
        })

        const onMouseMove = (e) => {
          console.log('mousemove', e.offsetX, mousePosition[0], e.offsetY, mousePosition[1])
          x.setTransform({
            e: (e.offsetX - mousePosition[0]) / e.target.clientWidth * width,
            f: (e.offsetY - mousePosition[1]) / e.target.clientHeight * height
          })
        }

        c.addEventListener('mouseup', () => {
          console.log('mouseup')
          mousePosition = 0
          c.removeEventListener('mousemove', onMouseMove)
        })

        c.addEventListener('scroll', (e) => {
          console.log(e)
        })
      })()
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
    /* padding: 1rem; */
    border: 1px black solid;
    max-width: calc(100vw - 2rem);
    max-height: calc(100vh - 7rem);
  }
</style>

<canvas id="canvas"></canvas>
