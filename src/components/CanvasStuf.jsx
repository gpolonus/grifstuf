
import React, { useEffect } from 'react'

export const CanvasStuf = (run, attributes = { title: 'STUF' }, Controls = null) => () => {

  let cleanup
  useEffect(() => () => cleanup())

  let triggers
  const getTriggers = () => triggers
f
  const startRun = canvas => {
    if(!canvas) {
      return
    }

    const {
      offsetWidth: pw,
      offsetHeight: ph
    } = document.querySelector('.main')

    // setting up the canvas
    const ctx = canvas.getContext("2d");
    ctx.canvas.height = ph;
    ctx.canvas.width = pw;

    // the 25 is a bit arbitrary
    [ triggers, cleanup ] = run(ctx, pw, ph - 25)
  }

  return (
    <>
      <title>{ attributes.title } | GRIFSTUF</title>
      {
        Controls ?
          <Controls triggers={getTriggers} /> :
          null
      }
      <canvas ref={startRun} />
    </>
  )
}

export default CanvasStuf
