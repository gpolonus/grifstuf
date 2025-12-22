<script>
  import { renderable } from '../Canvas/game.js';
  import Thinger from './Thinger.svelte'

  const drawBaseLines = ({ context }, mouse, ...points) => {
    context.beginPath()
    context.lineWidth = 4
    const [start, ...rest] = points
    context.moveTo(...start)
    rest.forEach(point => context.lineTo(...point))
    context.lineTo(...mouse)
    context.stroke()
  }

  const flipPoint = ([fx, fy], [cx, cy]) => [ cx - (fx - cx), cy - (fy - cy) ]


  let numberOfLines = $state(1)

  const finishDrawing = (points) => {
    console.log(points)
    addLine(...points)
    setting = true
  }

  const lines = []

  const addLine = (start, end, cp0, cp1) => lines.push({ cp0, cp1, start, end })

  let setting = $state(true);

  const startLine = () => {
    setting = true
  }

  const drawDotMaker = (rad, color) => (ctx, [x, y]) => {
    ctx.beginPath()
    ctx.fillStyle = color
    ctx.arc(x, y, rad, 0, Math.PI * 2)
    ctx.fill()
  }

  const drawRed = drawDotMaker(5, 'red')
  const drawBlue = drawDotMaker(5, 'blue')

  renderable(props => {
    const { context, width, height } = props;

    context.clearRect(0, 0, width, height)

    context.beginPath()
    context.lineWidth = 2

    lines.forEach((line) => {
      const {
        start, end, cp0, cp1
      } = line

      context.moveTo(...start)
      context.bezierCurveTo(...cp0, ...cp1, ...end)
    })

    context.stroke()

    lines.forEach(line => {
      const { start, end, cp0, cp1 } = line
      drawRed(context, start)
      drawRed(context, end)
      drawBlue(context, cp0)
      drawBlue(context, cp1)
    })
  });

  let steps = $derived([
    // start
    () => {},
    // ends
    ...Array(numberOfLines).fill(drawBaseLines),
    // cp0
    ({ context }, mouse, start, end0, ...ends) => {
      context.beginPath()
      context.lineWidth = 4
      context.moveTo(...start)
      context.bezierCurveTo(...mouse, ...mouse, ...end0)
      ends.forEach(end => context.lineTo(...end))
      context.stroke()
    },
    // end0 cp1
    ({ context }, mouse, start, ...points) => {
      const ends = points.slice(0, numberOfLines)
      const [ cp0 ] = points.slice(numberOfLines)
      context.beginPath()
      context.lineWidth = 4
      context.moveTo(...start)
      context.bezierCurveTo(...cp0, ...mouse, ...ends[0])
      const nextFlippedPoint = flipPoint(mouse, ends[0])
      context.bezierCurveTo(...nextFlippedPoint, ...nextFlippedPoint, ...ends[1])
      ends.slice(2).forEach(end => context.lineTo(...end))
      context.stroke()
    },
    // cps
    ...Array(numberOfLines - 2).fill(({ context }, mouse, start, ...points) => {
      const ends = points.slice(0, numberOfLines)
      const [ cp0, ...cpn ] = points.slice(numberOfLines)
      context.beginPath()
      context.lineWidth = 4
      context.moveTo(...start)
      context.bezierCurveTo(...cp0, ...cpn[0], ...ends[0])
      cps.slice(2).forEach((cp, i) => {
        context.bezierCurveTo(...flipPoint(cps[i + 1], ends[i]), ...cp, ...ends[i + 1])
      })
      context.bezierCurveTo(...flipPoint(cps[cps.length - 1], ends[cps.length - 1]), ...mouse, ...ends[cps.length])
      ends.slice(cps.length + 1).forEach(end => context.lineTo(...end))
      context.stroke()
    }),
    // cp2
    ({ context }, mouse, start, ...points) => {
      const ends = points.slice(0, numberOfLines)
      const cps = points.slice(numberOfLines)
      const cpPairs = [
        [cps[0], cps[1]],
        ...cps.slice(2).map((cp, i) => [flipPoint(cps[i + 1], ends[i - 2]), cp]),
        [flipPoint(cps[cps.length - 1], ends[ends.length - 2]), mouse]
      ]
      context.beginPath()
      context.lineWidth = 4
      context.moveTo(...start)
      ends.forEach((end, i) => {
        const [ cp0, cp1 ] = cpPairs[i]
        context.bezierCurveTo(...cp0, ...cp1, ...end)
      })
      context.stroke()
    }
  ])
</script>

<input type='number' bind:value={numberOfLines} min='1' disabled={setting} />
<button onclick={() => setting = true} disabled={setting}>Start</button>
<Thinger steps={steps} bind:setting={setting} finishDrawing={finishDrawing}/>
