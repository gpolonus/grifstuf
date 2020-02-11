<style>

</style>
<div onkeydown="keyBooleans()" onkeyup="keyBooleans()" onmousedown="keyBooleans()" onmousemove="keyBooleans()">
<canvas id="canvas"></canvas>
<script src="canvasLibrary.js"></script>
<script src="colorFuns.js"></script>
<script>

function loop(state, actions, render, time, every) {
  let s = state
  const a = Object.entries(actions).reduce((ac, [name, action]) => ({
    ...ac,
    [name]: (data) => {
      s = action(data)(s)
    }
  }), {})

  return [a, () => {
    every = (every && a[every]) || (() => {})
    const fun = () => {
      every(s)
      render(s)
      setTimeout(fun, time)
    }
    setTimeout(fun, time)
  }]
}


</script>
</body>
</html>