
import React, { useState, useEffect } from 'react'

const val = f => ({ target: { value: v } }) => f(v)

const rgbToString

export default ({ updateColor, initColor = '#000000' }) => {

  const [ color, setColor ] = useState(initColor)
  const [ colors, setColors ] = useState([])

  useEffect(() => {
    updateColor(color)
  }, [ color ])

  const fillColor = () => {

  }

  const fillNumbers = () => {

  }

  const storeMainColor = () => {

  }

  return (
    <div className="Color">
      <span>Color:</span>
      <span>{color}</span><br />
      <input type="text" onBlur={fillColor} onChange={storeMainColor} /><br />
      <input type="text" onBlur={fillNumbers} onChange={fillNumbers(),storeColor(get('color').value)} />
      <input type="text" onBlur={fillNumbers} onChange={fillNumbers(),storeColor(get('color').value)} />
      <input type="text" onBlur={fillNumbers} onChange={fillNumbers(),storeColor(get('color').value)} />
      <br />
      <p id="colors"></p><br />
    </div>
  )
}
