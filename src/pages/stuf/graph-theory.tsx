
import React from 'react'
import CanvasStuf from '../../components/CanvasStuf'
import { run as mvc } from '../../utils/stuf/mvc'
import { CompactPicker } from 'react-color'

type Triggers = {
  [key: string]: (data: any) => void
}

type Cleanup = () => void

type Attributes = {
  title: string
  path: string
}

type Run = (canvas: Element, pw: number, ph: number) => [Triggers, Cleanup]
const run: Run = (ctx, pw, ph) => {

  const p = (f, ...s) => f(pw, ph, ...s)
  const [ triggers, start ] = mvc(
    p(state),
    p(actions),
    p(render, ctx)
  )

  start()

  const cleanup = () => {
  }

  return [ triggers, cleanup ]
}

const state = (pw, ph) => ({

})

const actions = (pw, ph) => ({
  add: () => ({ graph }) => {
    graph.add(200,100)
    graph.draw()
  },
  connectMarked: () => ({ graph }) => {
    graph.connectMarked()
  },
  removeEdgesOfMarked: () => ({ graph }) => {
    graph.removeEdgesOfMarked()
  },
  removeMarked: () => ({ graph }) => {
    graph.removeMarked()
  },
  removeAll: () => ({ graph }) => {
    graph = new Graph()
    graph.draw()
  },
  circleUp: () => (s) => {
    circleUp()
  },
  complete: () => ({ graph }) => {
    graph.complete()
  },
  selectAll: () => ({ graph }) => {
    graph.selectAll()
  }
})

const render = (pw, ph, ctx) => (s) => {

}

const Controls = ({ triggers }) => (
  <div className="controls">
    <div id="div">
      <button onClick={() => }>Add</button><br />
      {/* <!-- Create Edge<input type="checkbox" id="connecting" />
      <br />Remove Edge<input type="checkbox" id="removingEdge" /><br /> --> */}
      <button id="connectMarked" onClick={() => }>Connect Marked</button><br />
      <button id="removeEdgesOfMarked" onClick={() => }>Remove Edges of Marked</button><br />
      <button id="removeMarked" onClick={() => }>Remove Marked</button><br />
      <input type="button" id="removing" value="Remove Vertex" onClick={() => graph.remove(coloring)} /><br />
      <button onClick={() => }>Remove All</button><br />
      <button onClick={() => }>Circle Up</button><br />
      <button onClick={() => }>Complete</button><br />
      <button onClick={() => }>Select All</button><br />
      <input type="checkbox" id="digraph" />Digraph?<br />

      <CompactPicker onChange={} />
      {/* <!-- <span id="firstConnect"></span><br />
      <span id="leftButton"></span><br />
      <span id="shiftKey"></span> --> */}
    </div>
  </div>
)

const attributes: Attributes = {
  title: 'Graph Theory Tester',
  path: 'graph-theory'
}

const component = CanvasStuf(run, attributes, Controls)

component.attributes = attributes

export default component
