<script lang="ts">
  import { height, renderable, width } from '../Canvas/game.ts';

  type Point = [number, number]

  let hideControls = false
  let numberOfRefPoints = 3
  let midPointFraction = 2
  let currentPoint: number[];
  let willClear = false;

  $: halfHeight = $height / 2;
  $: halfWidth = $width / 2;

  $: refs = Array(numberOfRefPoints).fill(0).map((_, i) => {
    const angle = Math.PI * 2 * i / numberOfRefPoints - Math.PI / 2
    const radius = $height < $width ? halfHeight : halfWidth;
    return [ Math.cos(angle) * radius, Math.sin(angle) * radius ]
  })

  const handleMouseUp = ({ clientX, clientY }: MouseEvent) => {
    if (!currentPoint) {
      currentPoint = [ clientX - halfWidth, clientY - halfHeight ]
    }
  }

  const c = ([ x, y ]: Point) => [ x + halfWidth, y + halfHeight ]

  const drawPoint = (context, [x, y]: Point, color = 'white', size = 2) => {
    context.save();
    context.fillStyle = color;
    context.beginPath()
    context.rect(x - size / 2, y - size / 2, size, size)
    context.fill()
    context.restore();
  }

  const nextPoint = ([x, y]: Point, [xx, yy]: Point) => {
    const newX = (x + xx) / midPointFraction
    const newY = (y + yy) / midPointFraction
    return [ newX, newY ]
  }

  type Props = { context, width: number, height: number }
  renderable((props: Props) => {
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
  on:mouseup={handleMouseUp}
/>

<div class:hideControls>
  <p>Click to start!</p>
  <p>
    Number of Points to move between:
    <button on:click={() => numberOfRefPoints--}>-</button>
    {numberOfRefPoints}
    <button on:click={() => numberOfRefPoints++}>+</button>
  </p>
  <p>
    Fraction for calculating the next point
    <button on:click={() => midPointFraction--}>-</button>
    1/{midPointFraction}
    <button on:click={() => midPointFraction++}>+</button>
  </p>
  <p>
    <button on:click={() => willClear = true}>Clear</button>
  </p>
</div>

{#if hideControls}
<p on:click={() => hideControls = false}>&gt;Show&gt;</p>
{:else}
<p on:click={() => hideControls = true}>&lt;Hide&lt;</p>
{/if}
