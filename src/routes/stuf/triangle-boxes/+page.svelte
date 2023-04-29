<script lang="ts">
  // @ts-nocheck

  import Canvas from "$lib/components/Canvas.svelte";
  import { siteTitle } from "$lib/stores";

  const layerMax = 10

  const renderSplitCanvas = (c, x, S, C, T, R) => t => {
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
      // const p = 0.3=

      // Escape case
      if (layerNum > layerMax) {
        return
      }

      layerNum++

      // Reset the coords ref
      const newCoords = [...boundingCoords]

      // Find the next front point which is the proportion point on the opposite line
      const newPoint = [(newCoords[2] - newCoords[4]) * p + newCoords[4], (newCoords[3] - newCoords[5]) * p + newCoords[5]]

      const oldPoint = newCoords.slice(0,2)

      // Draw the line between the old point and the new point
      x.stroke(new Path2D(`M ${newCoords[0]} ${newCoords[1]} L ${newPoint[0]} ${newPoint[1]}`))

      rec([...newPoint, ...oldPoint, newCoords[2], newCoords[3]], layerNum)
      rec([...newPoint, ...oldPoint, newCoords[4], newCoords[5]], layerNum)
    }

    // draw the first line through the middle
    x.stroke(new Path2D(`M 0 1080 L 1920 0`))

    // Start with the two right triangles that make up the canvas as two sides of the tree
    rec([0, 0, 1920, 0, 0, 1080])
    rec([1920, 1080, 1920, 0, 0, 1080])
  }


  const renderBigTriangle = (c, x, S, C, T, R) => t => {
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
      // const p = S(t++)/3+.5
      const p=S(t)/4+.25

      // Escape case
      if (layerNum > layerMax) {
        return
      }

      layerNum++

      // Reset the coords ref
      const newCoords = [...boundingCoords]

      // Find the next front point which is the proportion point on the opposite line
      const newPoint = [(newCoords[2] - newCoords[4]) * p + newCoords[4], (newCoords[3] - newCoords[5]) * p + newCoords[5]]

      const oldPoint = newCoords.slice(0,2)

      // Draw the line between the old point and the new point
      x.stroke(new Path2D(`M ${newCoords[0]} ${newCoords[1]} L ${newPoint[0]} ${newPoint[1]}`))

      rec([...newPoint, ...oldPoint, newCoords[2], newCoords[3]], layerNum)
      rec([...newPoint, ...oldPoint, newCoords[4], newCoords[5]], layerNum)
    }

    // Start with one giant triangle that covers the rectangle
    rec([1920/2, 0, 0, 1080, 1920, 1080])
  }

  const renderReducedWorking = (c, x, S, C, T, R) => t => {
    T([1920/2,0,0,1080,c.width|=T=(A,i=0,z,p=S(t++)/3+.5)=>{i++>9||T([...(z=[(A[2]-A[4])*p+A[4],(A[3]-A[5])*p+A[5],A[0],A[1]]),A[2],A[3]],i,x.stroke(new Path2D(`M ${A[0]} ${A[1]} L ${z[0]} ${z[1]}`)),T([...z,A[4],A[5]],i))},1080])
  }

  const renderReduced = (c, x, S, C, T, R) => t => {
    T(960,0,0,C=1080,c.width|=T=(z,o,w,h,f,v,i=0,n,p=S(t)/4+.25)=>i++>9||T(...n=[(w-f)*p+f,(h-v)*p+v,z,o],w,h,i,T(...n,f,v,i),x.stroke(new Path2D(`M ${z} ${o} L ${n[0]} ${n[1]}`))),C)
  }

  // const render = renderSplitCanvas
  const render = renderBigTriangle
  // const render = renderReduced

  siteTitle.set('stuf: Recursive Triangles')
</script>

<!-- <Canvas {render} steppable={0.01} /> -->
<!-- <Canvas {render} stoppable={true} /> -->
<Canvas {render} />