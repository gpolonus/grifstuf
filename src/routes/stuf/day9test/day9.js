
// This Import doesn't exist
import { contents } from './data.js'

const log = console.log

export function partTwo(contents) {
  const tileIds = contents.split('\n')
  const tiles = tileIds.map(l => l.split(',').map(n => parseInt(n)))
  // const sortedTiles =  tiles.slice().sort(([a], [b]) => a - b)
  // const sortedIdsMap = sortedTiles.reduce((ac, tile, i) => (ac[tile.join(',')] = i, ac), {})
  let largestArea = 0, area;

  // const rectInTiles = rectInTilesGenetor(contents)
  const drawPartialMap = drawMap(contents)
  const rectInside = checkInsideGenerator(contents)

  for (let i = 0, [ix, iy] = tiles[i]; i < tiles.length; [ix, iy] = tiles[++i] || []) {
    for (let j = i + 1, [jx, jy] = tiles[j] || []; j < tiles.length; [jx, jy] = tiles[++j] || []) {

      area = (Math.abs(ix - jx) + 1) * (Math.abs(iy - jy) + 1)
      if (area > largestArea && rectInside(tiles[i], tiles[j])) {
        log({ area, ix, iy, jx, jy })
        largestArea = area
      }
    }
  }

  return largestArea
}

export function checkInsideGenerator(contents) {
  const tileIds = contents.split('\n')
  let tiles = tileIds.map(t => t.split(',').map(n => parseInt(n)))
  const [xs, ys] = tiles.reduce(([xs, ys], [x, y]) => [[...xs, x], [...ys, y]], [[], []])
  const minX = Math.min(...xs), minY = Math.min(...ys)
  tiles = tiles.map(([x, y]) => [x - minX, y - minY])

  let ySpots = []
  const setSpot = (y, x) => {
    if (!ySpots[y]) ySpots[y] = new Set()
    ySpots[y].add(x)
  }

  const hasSpot = (y, x, spots = ySpots) => spots[y] ? spots[y].has(x) : false

  // Collect all the lines between red tiles
  tiles.forEach(([x, y], i) => {
    setSpot(y, x)
    const [px, py] = tiles.at(i - 1)
    if (px === x) {
      for (let j = Math.min(y, py) + 1; j < Math.max(y, py); j++) {
        setSpot(j, x)
      }
    } else if (py === y) {
      const minX = Math.min(x, px), maxX = Math.max(x, px)
      for (let j = minX + 1; j < maxX; j++) {
        setSpot(y, j)
      }
    }
  })

  const xSpots = ySpots.reduce((ac, line, y) => {
    for (const x of line) {
      ac[x] ||= new Set
      ac[x].add(y)
    }
    return ac
  }, [])

  const spotInside = (x, y) => {
    if (hasSpot(y, x)) return true;
console.log('hit inside spot inside')
    let edgeHitCount = 0;
    for (let i = x - 1; i >= 0; i--) {
      const char = hasSpot(y, i) ? 'X' : '.'
      const nextChar = hasSpot(y, i - 1) ? 'X' : '.'
      const prevChar = hasSpot(y, i + 1) ? 'X' : '.'
      if (nextChar + char + prevChar === '.X.') {
        edgeHitCount++;
      }
    }
console.log({ edgeHitCount, x, y })
    return edgeHitCount % 2 === 1
  }

  const rectInsideEdgeCheck = ([ix, iy], [jx, jy]) => {
    log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')
    log({ ix, iy, jx, jy })
    const [y0, y1] = (iy < jy ? [iy, jy] : [jy, iy]).map(n => n - minY)
    const [x0, x1] = (ix < jx ? [ix, jx] : [jx, ix]).map(n => n - minX)
    log({ x0, x1, y0, y1 })
    // Check if there are any spots between the rect edges.
    // If we have spots between the rect edges, then we have outside tiles in the rect.
    const checkEdge = (spots, line, a, b) => {
      const min = Math.min(a, b), max = Math.max(a, b)
      for (let i = min + 1; i < max; i++) {
        if (hasSpot(line, i, spots)) {
          return true
        }
      }
    }

    // Check edges on the interior of the rect as to not touch potential overlapping polygon edges
    const edges = [
      [xSpots, x0 + 1, y0, y1],
      [xSpots, x1 - 1, y0, y1],
      [ySpots, y0 + 1, x0, x1],
      [ySpots, y1 - 1, x0, x1],
    ]
    if (edges.some(edge => checkEdge(...edge))) {
      return false
    }

    // If there are no through lines, check any spot inside the rect to see if we are inside the polygon or not.
    return spotInside(x0 + 1, y0 + 1)
  }

  const rectInsideCheckEverything = ([ix, iy], [jx, jy]) => {
    log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')
    log({ ix, iy, jx, jy })
    const [y0, y1] = [iy - minY, jy - minY].sort()
    const [x0, x1] = [ix - minX, jx - minX].sort()

    for (let i = x0 + 1; i < x1; i++) {
      for (let j = y0 + 1; j < y1; j++) {
        if (!spotInside(i, j)) return false
      }
    }

    return true
  }

  return rectInsideEdgeCheck
}