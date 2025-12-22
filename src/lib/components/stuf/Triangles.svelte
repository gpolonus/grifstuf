<script>
  import { height, renderable, width } from '../Canvas/game.js';

  let hideControls = $state(false)
  let numberOfRefPoints = $state(3)
  let midPointFraction = $state(2)
  let currentPoint;
  let willClear = $state(false);

  let halfHeight = $derived($height / 2);
  let halfWidth = $derived($width / 2);

  let refs = $derived(Array(numberOfRefPoints).fill(0).map((_, i) => {
    const angle = Math.PI * 2 * i / numberOfRefPoints - Math.PI / 2
    const radius = $height < $width ? halfHeight : halfWidth;
    return [ Math.cos(angle) * radius, Math.sin(angle) * radius ]
  }))

  const handleMouseUp = ({ clientX, clientY }) => {
    if (!currentPoint) {
      currentPoint = [ clientX - halfWidth, clientY - halfHeight ]
    }
  }

  const c = ([ x, y ]) => [ x + halfWidth, y + halfHeight ]

  const drawPoint = (context, [x, y], color = 'white', size = 2) => {
    context.save();
    context.fillStyle = color;
    context.beginPath()
    context.rect(x - size / 2, y - size / 2, size, size)
    context.fill()
    context.restore();
  }

  const nextPoint = ([x, y], [xx, yy]) => {
    const newX = (x + xx) / midPointFraction
    const newY = (y + yy) / midPointFraction
    return [ newX, newY ]
  }

  renderable((props) => {
    if (!currentPoint) return

    const { context, width, height } = props;

    if (willClear) {
      context.clearRect(0, 0, width, height)
      currentPoint = false
      willClear = false
      return
    }

    refs.forEach(ref => drawPoint(context, c(ref), 'red', 4))

    const refPoint = refs[Math.floor(Math.random() * numberOfRefPoints)]
    const [ x, y ] = currentPoint
    drawPoint(context, c([(midPointFraction - 1) * x, (midPointFraction - 1) * y]))
    currentPoint = nextPoint(refPoint, currentPoint)
  });
</script>

<style>
  :global(canvas) {
    background-color: hsl(0, 0%, 10%);
  }

  p {
    color: white;
  }

  .hideControls {
    display: none;
  }
</style>

<svelte:window
  onmouseup={handleMouseUp}
/>

<div class:hideControls>
  <p>Click to start!</p>
  <p>
    Number of Points to move between:
    <button onclick={() => numberOfRefPoints--}>-</button>
    {numberOfRefPoints}
    <button onclick={() => numberOfRefPoints++}>+</button>
  </p>
  <p>
    Fraction for calculating the next point
    <button onclick={() => midPointFraction--}>-</button>
    1/{midPointFraction}
    <button onclick={() => midPointFraction++}>+</button>
  </p>
  <p>
    <button onclick={() => willClear = true}>Clear</button>
  </p>
</div>

{#if hideControls}
<p onclick={() => hideControls = false}>&gt;Show&gt;</p>
{:else}
<p onclick={() => hideControls = true}>&lt;Hide&lt;</p>
{/if}
