<script>
  import Canvas from "$lib/components/Canvas.svelte";
  import { siteTitle } from "$lib/stores";
  import { contents } from "./data";
  import { checkInsideGenerator } from './day9'

  const tileIds = contents.split('\n')
  // Had to divide everything by 10 bc the canvas has a shitass "mAx SiZe"
  let tiles = tileIds.map(t => t.split(',').map(n => parseInt(n) / 10))
  const [xs, ys] = tiles.reduce(([xs, ys], [x, y]) => [[...xs, x], [...ys, y]], [[], []])
  const minX = Math.min(...xs), minY = Math.min(...ys)
  tiles = tiles.map(([x, y]) => [x - minX, y - minY])
  const [xss, yss] = tiles.reduce(([xs, ys], [x, y]) => [[...xs, x], [...ys, y]], [[], []])
  const maxX = Math.max(...xss), maxY = Math.max(...yss)

  const square = { ix: 4318, iy: 65238, jx: 94987, jy: 50332 }

  let { ix, iy, jx, jy } = square
  console.log(checkInsideGenerator(contents)([ix, iy], [jx, jy]))

  const render = (c, context, S, C, T, R) => t => {
    context.clearRect(0, 0, c.width, c.height)
    // console.log('run render')
    context.beginPath()
    context.lineWidth = 20
    context.moveTo(tiles[0][0], tiles[0][1])
    tiles.slice(1).forEach(([x0, y0]) => {
      context.lineTo(x0, y0)
    })
    context.closePath()
    context.stroke()

    ix = ix/10
    iy = iy/10
    jx = jx/10
    jy = jy/10

    const [y1, y0] = [iy - minY, jy - minY].sort()
    const [x1, x0] = [ix - minX, jx - minX].sort()
    context.strokeRect(x0, y0, x1 - x0, y1 - y0)

    // console.log('finish render')
  }

  siteTitle.set('stuf: Day 9 Test')
</script>

<!-- <Canvas {render} steppable={0.01} /> -->
<Canvas {render} steppable={0.01} width={maxX} height={maxY} />
<!-- <Canvas {render} width={maxX} height={maxY} zoomable={true} /> -->
<!-- <Canvas {render} stoppable={true} /> -->
<!-- <Canvas {render} /> -->
