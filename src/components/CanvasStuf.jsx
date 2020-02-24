
import React, { useEffect } from 'react'

export const CanvasStuf = (run, attributes) => () => {

  let cleanup
  useEffect(() => () => cleanup())

  const startRun = ref => {
    if(!ref) {
      return
    }

    const {
      offsetWidth: pw,
      offsetHeight: ph
    } = document.querySelector('.main')
    // the 25 is a bit arbitrary
    cleanup = run(ref, pw, ph - 25)
  }

  return (
    <canvas ref={startRun} />
  )
}

export default CanvasStuf
