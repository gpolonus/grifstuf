<script lang="ts">
  // @ts-nocheck

  import Canvas from "$lib/components/Canvas.svelte";

  const layerMax = 12

  /**
   * This implementation relies on:
   * JS resolving all expressions passed to a function before calling said function
   * JS evaluating the default parameter for a function even when `undefined` is explicitly passed as a value
   * JS returning the assigned value from the assignment operator
   */
  const renderOriginal = (c, x, S, C, T, R) => t =>{
    T([0, 0, c.width |= (
        T=(A,i=0,z,p=S(t++)/3+.5) =>
          i++ > layerMax
            ? x.strokeRect(...A)
            : T(
              (A=[...A]),
              i,
              z = (A[2 + i%2] *= p),
              T(A,i),
              A[i %= 2] += z,
              A[2 + i] = z/p - z
            )
      )
      ,1080
    ])
  }

  const renderNew = (c, x, S, C, T, R) => t => {
    // Clears the canvas
    c.width|=0

    /**
     * Recursively alternates in splitting an area, first by height then by width etc.
     * The splitting line is places based on a sine-based proportion calculation given by `p`
     *
     * @param boundingCoords
     * @param layerNum
     */
    const rec = (boundingCoords: Array<number>, layerNum = 0) => {
      // Ensures that every section has a unique splitting line
      // Every splitting line will be t1 - t0 away from its respective previous line, while still being seperate from all other lines
      // CHAOS REIGNS
      // the .5 starts the line in the middle of the section
      // the /3 controls what portion of the section the line moves through,
      // for /2 it takes the whole section
      // for /3 it takes the middle 2/3 of the section bc the full distance between the bottom and top of sine is 200%
      const p = S(t++)/3+.5

      // Escape case
      if (layerNum > layerMax) {
        return x.strokeRect(...boundingCoords)
      }

      layerNum++

      // Reset the coords ref
      const newCoords = [...boundingCoords]

      // Take the existing width or height and proportion and save it
      const nwh = newCoords[2 + layerNum%2] * p
      newCoords[2 + layerNum%2] = nwh

      // left half of the tree
      // run with the same x and y, but a proportioned height or width
      rec(newCoords, layerNum)

      const ni = layerNum % 2
      // Add the new width or height to the x or y
      // if the width changed before, change the x
      // if the height changed before, change the y
      newCoords[ni] += nwh

      const oldwh = nwh/p
      // give the left side box of this tree the *rest* of the width/height available
      newCoords[2 + ni] = oldwh - nwh

      // Right half of the tree
      // split the rest of the bounded area
      rec(newCoords, layerNum)
    }

    rec([0, 0, 1920, 1080])
  }

  const render = renderNew
  // const render = renderOriginal

</script>

<!-- <Canvas {render} steppable={0.01} /> -->
<!-- <Canvas {render} stoppable={true} /> -->
<Canvas {render} />