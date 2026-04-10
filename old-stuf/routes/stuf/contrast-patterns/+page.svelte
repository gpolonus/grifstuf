<script>


  import Canvas from "$lib/components/Canvas.svelte";
  import { siteTitle } from "$lib/stores";

  // const startingColorAngle = 1;
  let angleOffset = 10
  let xAngleOffset = angleOffset
  let yAngleOffset = 50
  const squareSize = 100;

  // t is a number of seconds
  const renderV1 = (c, x, S, C, T, R) => t => {
    const startingSquare = [0, 0]
    const loopTime = 5
    const startingColorA = t / loopTime * 360
    const startingColorB = startingColorA + 180

    const drawSquare = (i, j, colorA, colorB) => {
      // TODO: add tap/click and drag functionality to move around the canvas
      x.transform(1, 0, 0, 1, startingSquare[0] + i * squareSize, startingSquare[1] + j * squareSize);
      randomPattern(colorA, colorB)
      x.resetTransform();
    }

    const randomPattern = (colorA, colorB) => {
      x.fillStyle = `hsl(${colorA} 100% 50%)`
      x.fillRect(0, 0, squareSize, squareSize);
      x.fillStyle = `hsl(${colorB} 100% 50%)`
      x.beginPath();
      x.arc(squareSize / 2, squareSize / 2, squareSize * .3, 0, Math.PI * 2);
      x.fill();
    }

    const xAxisLength = Math.ceil(c.width / squareSize)
    const yAxisLength = Math.ceil(c.height / squareSize)
    let colColor = startingColorA
    let rowColor = startingColorB
    let tempColor, colorA, colorB;
    const colorGrid = Array(xAxisLength).fill().map(_ => [])

    for(let i = 0; i < xAxisLength; i++) {
      colorA = rowColor
      colorB = colColor
      for(let j = 0; j < yAxisLength; j++) {
        drawSquare(i, j, colorA, colorB)
        tempColor = colorA
        colorA = (colorB + 90 - angleOffset) % 360
        colorB = tempColor
      }

      tempColor = rowColor
      rowColor = (colColor + 90 + angleOffset) % 360
      colColor = tempColor
    }
  }

  const render = (c, x, S, C, T, R) => t => {
    const startingSquare = [0, 0]
    const loopTime = 5
    const startingColorA = t / loopTime * 360
    const startingColorB = startingColorA + 180

    angleOffset = t / (loopTime * 2) * 360
    xAngleOffset = angleOffset
    yAngleOffset = -angleOffset / 2

    const drawSquare = (i, j, colorA, colorB) => {
      // TODO: add tap/click and drag functionality to move around the canvas
      x.transform(1, 0, 0, 1, startingSquare[0] + i * squareSize, startingSquare[1] + j * squareSize);
      randomPattern(colorA, colorB, i, j)
      x.resetTransform();
    }

    const randomPattern = (colorA, colorB, i, j) => {
      x.fillStyle = `hsl(${colorA}deg 100% 50%)`
      x.fillRect(0, 0, squareSize, squareSize);

      x.fillStyle = `hsl(${colorB}deg 100% 50%)`
      x.beginPath();

      // Cirlce
      // x.arc(squareSize / 2, squareSize / 2, squareSize * .3, 0, Math.PI * 2);
      // x.fill();

      const angleOffsetRads = angleOffset * Math.PI / 180 + (i + j) / 10
      const center = squareSize / 2
      const sideNum = 4
      let shapeAngle = Math.PI * 2 / sideNum
      x.moveTo(center * (1 + Math.cos(angleOffsetRads) * .75), center * (1 + Math.sin(angleOffsetRads) * .75));
      for(let side = 1; side < sideNum; side++)
        x.lineTo(center * (1 + Math.cos(angleOffsetRads + shapeAngle * side) * .75), center * (1 + Math.sin(angleOffsetRads + shapeAngle * side) * .75));
      x.closePath();
      x.fill()
      x.strokeStyle = 'black'
      x.lineWidth = 2
      x.stroke()
    }

    const xAxisLength = Math.ceil(c.width / squareSize)
    const yAxisLength = Math.ceil(c.height / squareSize)
    let rowColor = startingColorA
    let colColor = startingColorA
    let colorA, colorB;
    const colorGrid = Array(xAxisLength).fill().map(_ => [])

    for(let i = 0; i < xAxisLength; i++) {
      colorA = rowColor
      colorB = colColor
      for(let j = 0; j < yAxisLength; j++) {
        drawSquare(i, j, colorA, colorB)
        colorB = colorA
        colorA = (colorB + 180 + yAngleOffset) % 360
      }

      colColor = rowColor
      rowColor = (colColor + 180 + xAngleOffset) % 360
    }
  }

  siteTitle.set('stuf: Contrast Patterns')
</script>

<!-- <Canvas {render} steppable={0.01} /> -->
<!-- <Canvas {render} stoppable={true} /> -->
<Canvas {render} />