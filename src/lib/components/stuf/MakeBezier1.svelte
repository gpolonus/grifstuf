
<script>
  import { renderable } from '../Canvas/game.ts';
  import Thinger from './Thinger.svelte'

  const steps = [
    () => {},
    ({ context }, mouse, start) => {
      context.beginPath()
      context.lineWidth = 4
      context.moveTo(...start)
      context.lineTo(...mouse)
      context.stroke()
    }
  ]

  let hoverDots = []

  const finishDrawing = (points) => {
    addLine(...points)
    // setting = true
  }

  const lines = []
  let dotCheckers = []
  let dotCheckerId = 0
  const highlightDistance = 10
  const pointCheck = (coords, index, type) => ({
    run: point => inDistance(highlightDistance, coords, point),
    id: dotCheckerId++,
    coords,
    index,
    type
  })
  const addPointCheck = (coords, index, type) => dotCheckers.push(pointCheck(coords, index, type))
  const removePointCheck = (i) => dotCheckers = dotCheckers.filter(({ id }) => id !== i)

  const midPoint = ([cx, cy], [x, y], frac = 2) => [(x - cx) / frac + cx, (y - cy) / frac + cy]

  const inDistance = (d, [x0, y0], [x1, y1]) => (((x0 - x1) ** 2) + ((y0 - y1) ** 2)) < (d ** 2)

  const addLine = (start, end) => {
    const line = {
      cp1: midPoint(start, end, 3),
      cp2: midPoint(start, end, 3/2),
      start,
      end
    }
    const index = lines.push(line) - 1

    addPointCheck(start, index, 'start')
    addPointCheck(end, index, 'end')
    addPointCheck(line.cp1, index, 'cp1')
    addPointCheck(line.cp2, index, 'cp2')
  }

  let setting = true;

  const startLine = () => {
    setting = true
  }

  const drawDotMaker = (rad, color) => (ctx, [x, y]) => {
    ctx.beginPath()
    ctx.fillStyle = color
    ctx.arc(x, y, rad, 0, Math.PI * 2)
    ctx.fill()
  }

  const drawCircleMaker = (rad, color) => (ctx, [x, y]) => {
    ctx.beginPath()
    ctx.strokeStyle = color
    ctx.arc(x, y, rad, 0, Math.PI * 2)
    ctx.stroke()
  }

  const drawRed = drawDotMaker(5, 'red')
  const drawBlue = drawDotMaker(5, 'blue')
  const drawHover = drawCircleMaker(10, 'black')

  renderable(props => {
    const { context, width, height } = props;

    context.clearRect(0, 0, width, height)

    context.beginPath()
    context.lineWidth = 2

    lines.forEach((line) => {
      const {
        start, end, cp1, cp2
      } = line

      context.moveTo(...start)
      context.bezierCurveTo(...cp1, ...cp2, ...end)
    })

    context.stroke()

    lines.forEach(line => {
      const { start, end, cp1, cp2 } = line
      drawRed(context, start)
      drawRed(context, end)
      drawBlue(context, cp1)
      drawBlue(context, cp2)
    })

    hoverDots.forEach(dot => drawHover(context, dot.coords))
  });

  const handleMouseUp = ({ clientX, clientY }) => {
    const mouse = [ clientX, clientY ]
    mouseDown = false
    hoverDots.forEach(({ index, type, id }) => {
      removePointCheck(id)
      addPointCheck(mouse, index, type)
    })
  }

  let mouseDown = false
  const handleMouseDown = ({ clientX, clientY }) => {
    mouseDown = true
  }

  const handleMouseMove = ({ clientX, clientY }) => {
    if (setting) return

    const mouse = [ clientX, clientY ]

    if (mouseDown) {
      hoverDots.forEach((dc) => {
        lines[dc.index][dc.type] = mouse
        dc.coords = mouse
      })
    } else {
      hoverDots = dotCheckers.filter(dc => dc.run(mouse))
    }
  }

</script>

<button on:click={startLine} disabled={setting}>Add Line</button>
<Thinger steps={steps} bind:setting={setting} finishDrawing={finishDrawing}/>

<svelte:window
  on:mouseup={handleMouseUp}
  on:mousemove={handleMouseMove}
  on:mousedown={handleMouseDown}
/>