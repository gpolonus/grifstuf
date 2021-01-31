<script>
  import { height, renderable, width } from '../Canvas/game.js';

  $: refs = [[ $width / 2, 0 ],[ 0, $height ],[$width, $height ]]
  let currentPoint;

  const handleMouseUp = ({ clientX, clientY }) => {
    currentPoint = [ clientX, clientY ]
  }

  const drawPoint = (context, [x, y]) => {
    context.save();
    context.fillStyle = 'white';
    context.beginPath()
    context.arc(x, y, 3, 0, Math.PI * 2)
    context.fill()
    context.restore();
  }

  const midPoint = ([x, y], [xx, yy]) => [ (x + xx) / 2, (y + yy) / 2 ]

  renderable(props => {
    if (!currentPoint) return

    const { context } = props;

    const refPoint = refs[Math.floor(Math.random() * 3)]
    drawPoint(context, currentPoint)
    currentPoint = midPoint(currentPoint, refPoint)
  });
</script>

<style>
  :global(canvas) {
    background-color: hsl(0, 0%, 10%);
  }

  p {
    color: white;
  }
</style>

<svelte:window
  on:mouseup={handleMouseUp}
/>

<p>Click to start!</p>
