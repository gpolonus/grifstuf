<script>
  import { renderable } from '../Canvas/game.js';

  export let steps
  export let finishDrawing
  export let setting = false

  let currentPoints = []
  const allPoints = []

  const addPoint = (point) => allPoints.push(point)

  let settingStep = 0

  let mouse = [0, 0]

  const inDistance = (d, [x0, y0], [x1, y1]) => (((x0 - x1) ** 2) + ((y0 - y1) ** 2)) < (d ** 2)

  const handleMouseUp = () => {
    if (!setting) return

    addPoint(mouse)
    currentPoints.push(mouse)
    settingStep++

    if (!steps[settingStep]) {
      settingStep = 0
      setting = false
      finishDrawing(currentPoints)
      currentPoints = []
    }
  }

  const snapDistance = 10
  const handleMouseMove = ({ clientX, clientY }) => {
    if (!setting) return;

    const point = [ clientX, clientY ]
    const snapPoint = allPoints.find(p => inDistance(snapDistance, point, p))
    if (snapPoint) {
      mouse = snapPoint
    } else {
      mouse = point
    }
  }

  renderable(props => {
    if (!setting) return

    steps[settingStep](props, mouse, ...currentPoints)
  });
</script>

<svelte:window
  on:mouseup={handleMouseUp}
  on:mousemove={handleMouseMove}
/>
