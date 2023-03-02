<script>
  import { height, renderable, width } from './game.js';

  const color = 'hsl(0, 0%, 90%)';
  const pointSize = 30;
  const divisions = Math.floor(($width > $height ? $width : $height) / pointSize) || 1;
  let zooming = 0

  const degToRad = Math.PI / 180;

  const makeArc = () => ({
    theta: Math.round(Math.random() * 360) * degToRad,
    speed: ((2 * Math.round(Math.random()) - 1) * degToRad) || degToRad,
    lineWidth: Math.round(Math.random() * 3) + 1
  })

  let arcs = Array(divisions).fill().map(makeArc)

  $: {
    if (zooming === pointSize) {
      arcs = [makeArc(), ...arcs.slice(0, arcs.length - 1)];
      zooming = 0;
    }
  }

  renderable(props => {
    const { context, width, height } = props;
    const halfWidth = width / 2, halfHeight = height / 2;

    context.save();
    context.strokeStyle = color;
    context.lineCap = 'round';
    arcs.forEach((_, i) => {
      const arc = arcs[i]
      const { theta, speed, lineWidth } = arc
      arc.theta += speed;
      context.beginPath();
      context.arc(halfWidth, halfHeight, pointSize * (i) + zooming, theta, Math.PI + theta);
      context.lineWidth = lineWidth;
      context.stroke();
    })
    zooming += 0.5;
    context.restore();
  });
</script>
