<script>

  import Canvas from "$lib/components/Canvas.svelte";
  import { siteTitle } from "$lib/stores";

  const render = (c, x, S, C, T, R) => {
    let d = 1;
    const switchD = () => (d *= -1)
    let axis = 'x'
    const switchAxis = () => (axis = axis === 'y' ? 'x' : 'y')
    let n = 1;

    // let clickNum = 6
    // let clicked = false
    // c.addEventListener('click', () => {
    //   clickNum++
    //   clicked = true
    // })

    return (t) => {
      // if (!clicked) return
      // clicked = false
      // t = clickNum
      t *= 10
      let l = n**2 + (axis === 'y' ? n : 0)
      if (t > l) {
        t = l
        switchAxis()

        if (axis === 'x') {
          switchD()
          n++
        }
      }

      l = n**2 + (axis === 'y' ? n : 0)

      let xx, yy

      if (axis === 'x') {
        if (d > 0) {
          yy = (1 - n) / 2
          xx = t - (l - n - yy)
        } else {
          yy = n / 2
          xx = l - yy - t
        }
      } else {
        if (d > 0) {
          xx = (n + 1) / 2
          yy = t - (l - xx)
        } else {
          xx = n / -2
          yy = (l + xx) - t
        }
      }

      xx *= 50
      yy *= 50
      x.fillStyle = R(
        255 - ((xx + 960) / 1920 * 255),
        (xx + 960) / 1920 * 255,
        (yy + 540) / 1080 * 100 + 155
      )
      x.fillRect(xx + 960, yy + 540, 50, 50)
    }
  }

  siteTitle.set('stuf: Spiral')
</script>

<Canvas {render} />
