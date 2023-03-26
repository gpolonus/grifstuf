<script>
  import { height, renderable, width } from '../Canvas/game.ts';

  renderable(props => {
    const { context, width, height } = props;

    context.clearRect(0, 0, width, height)

    const eyeWidth = width / 5
    // const eyeHeight = height /


    context.ellipse(width / 4, height / 3, width / 4, height / 6, 0, 0, Math.PI * 2)
    context.ellipse(width / 4, height / 3, width / 4, height / 6, 0, 0, Math.PI * 2)
    context.stroke()
  });

</script>
