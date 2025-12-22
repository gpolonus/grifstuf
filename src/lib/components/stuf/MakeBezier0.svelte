
<script>
  import { renderable } from '../Canvas/game.js';
  import Thinger from './Thinger.svelte'

  const steps = [
    () => {},
    ({ context }, mouse, start) => {
      context.beginPath()
      context.lineWidth = 4
      context.moveTo(...start)
      context.lineTo(...mouse)
      context.stroke()
    },
    ({ context }, mouse, start, end) => {
      context.beginPath()
      context.lineWidth = 4
      context.moveTo(...start)
      context.bezierCurveTo(...mouse, ...mouse, ...end)
      context.stroke()
    },
    ({ context }, mouse, start, end, cp1) => {
      context.beginPath()
      context.lineWidth = 4
      context.moveTo(...start)
      context.bezierCurveTo(...cp1, ...mouse, ...end)
      context.stroke()
    }
  ]

  const finishDrawing = (points) => {
    console.log(points)
    addLine(...points)
    setting = true
  }

  const lines = []

  const addLine = (start, end, cp1, cp2) => lines.push({ cp1, cp2, start, end })

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
  });

</script>

<Thinger steps={steps} bind:setting={setting} finishDrawing={finishDrawing}/>
