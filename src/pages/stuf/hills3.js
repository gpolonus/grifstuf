
import { loop } from '../../utils/stuf/mvc'
import { blackCanvas } from '../../utils/stuf/canvas'
import CanvasStuf from '../../components/CanvasStuf'

// Rendering setup
const run = (canvas, pw, ph) => {
  const ctx = canvas.getContext("2d");
  ctx.canvas.height = ph;
  ctx.canvas.width = pw;
  blackCanvas(ctx)
  ctx.lineWidth = 2;
  ctx.strokeStyle = "white";
  const maxNumberChasers = 300
  const chaserSpeed = 5

  const bigDisc = new Image()
  bigDisc.src = "/images/bigDisc.png"

  const [t, start, stop] = loop(
    state(pw, ph, chaserSpeed),
    actions(pw, ph, maxNumberChasers),
    render(ctx, pw, ph, bigDisc),
    10,
    'move'
  )

  const handler = keyBooleans(t)

  ctx.canvas.addEventListener('mousemove', handler)

  start()

  return () => {
    stop()
    ctx.canvas.removeEventListener('mousemove', handler)
  }
}

const render = (ctx, pw, ph, bigDisc) => ({ mouse: [x, y], hit, chasers, sections }) => {
  blackCanvas(ctx);
  var xamount = Math.pow(x - pw/2, 2)*2000/Math.pow(pw,2);
  var yamount = Math.pow(y - ph/2, 2)*2000/Math.pow(ph,2);
  ctx.drawImage(bigDisc, -1*xamount/2, -1*yamount/2, pw + xamount, ph + yamount);

  for(var i = 0; i < sections; i++)
  {
    var angle = i*Math.PI*2/sections;
    linedLeaf(ctx, (pw/2+200), ph/2, 700 * Math.cos(angle) + (pw/2+200) + (x-(pw/2+200))/Math.sqrt(Math.pow(x-(pw/2+200),2)+Math.pow(y - ph/2,2))*150, 700 * Math.sin(angle) + ph/2 + (y-ph/2)/Math.sqrt(Math.pow(x-(pw/2+200),2)+Math.pow(y - ph/2,2))*150, sections);
    linedLeaf(ctx, (pw/2-200), ph/2, 700 * Math.cos(angle) + (pw/2-200) + (x-(pw/2-200))/Math.sqrt(Math.pow(x-(pw/2-200),2)+Math.pow(y - ph/2,2))*150, 700 * Math.sin(angle) + ph/2 + (y-ph/2)/Math.sqrt(Math.pow(x-(pw/2-200),2)+Math.pow(y - ph/2,2))*150, sections);
    linedLeaf(ctx, pw/2, ph/2, 700 * Math.cos(angle) + pw/2 + (x-pw/2)/Math.sqrt(Math.pow(x-pw/2,2)+Math.pow(y - ph/2,2))*150, 700 * Math.sin(angle) + ph/2 + (y-ph/2)/Math.sqrt(Math.pow(x-pw/2,2)+Math.pow(y - ph/2,2))*150, sections);
  }

  chasers.forEach(drawChaser(ctx))

  if(hit) {
    ctx.strokeStyle = "black";
    ctx.font = "100px Courier New";
    ctx.strokeText("KEEP MOVING",200,200);
    ctx.strokeStyle = "white";
  }

}

const drawChaser = (ctx) => ({ x, y }) => {
  ctx.beginPath();
  ctx.arc(x, y, 20, 0, Math.PI*2);
  ctx.fill();
}

const state = (pw, ph, speed = 2) => ({
  mouse: [pw / 2, ph / 2],
  maxSpeed: speed,
  stopped: false,
  amount: 0,
  sections: 7,
  chasers: [
    { x: 1, y: 1, speed },
    { x: 1, y: ph, speed },
    { x: pw, y: 1, speed },
    { x: pw, y: ph, speed }
  ],
  hit: false
})

const actions = (pw, ph, maxNumberChasers) => ({
  move: () => (s) => {
    let hit = false
    const { mouse: [mx, my] } = s
    let chasers = s.chasers.map(({ x, y, speed}) => {
      const dist = Math.sqrt((x - mx) ** 2 + (y - my) ** 2)
      if(dist < 10) {
        hit = true
        return {x: mx, y: my, speed }
      } else if(dist < 20) {
        hit = true
      }
      return {
        x: x + (mx - x)/dist * speed,
        y: y + (my - y)/dist * speed,
        speed
      }
    })
    if(hit) {
      chasers = [
        ...chasers,
        {
          x: Math.round(Math.random() * pw),
          y: Math.round(Math.random() * ph),
          speed: Math.random() * s.maxSpeed
        }
      ]
      if(chasers.length > maxNumberChasers) {
        chasers = chasers.slice(1)
      }
    }
    return {
      ...s,
      chasers,
      hit
    }
  },
  mousemove: (mouse) => s => ({
    ...s,
    mouse
  })
})

function linedLeaf(ctx, x, y, x0, y0, sections) {
  ctx.lineWidth = 2;
  var centerAngle = Math.PI*2/sections;
  var vecDist = Math.sqrt(Math.pow(x - x0, 2) + Math.pow(y - y0, 2));
  var perpVecDist = Math.tan(centerAngle/2)*vecDist/2;
  var perpVec = {
    x:  (x+x0)/2,
    y:  (y+y0)/2,
    x0: -1*(y0 - y)*perpVecDist/vecDist + (x+x0)/2,
    y0: (x0 - x)*perpVecDist/vecDist + (y+y0)/2
  };
  var old = ctx.fillStyle;
  ctx.fillStyle = "black";
  ctx.beginPath();
  ctx.moveTo(x,y);
  ctx.lineTo(perpVec.x0, perpVec.y0);
  ctx.lineTo(x0, y0);
  ctx.lineTo(2*perpVec.x - perpVec.x0, perpVec.y*2 - perpVec.y0);
  ctx.fill();
  ctx.fillStyle = old;
  var sideDist = Math.sqrt(Math.pow(x - perpVec.x0,2) + Math.pow(y - perpVec.y0,2));
  var times = Math.floor(Math.tan(centerAngle/2)*vecDist/4/ctx.lineWidth);
  for(var i = 0; i < times; i++) {
    ctx.beginPath();
    ctx.moveTo((perpVec.x0 - x)/sideDist*(sideDist * (1-i/times)) + x, (perpVec.y0 - y)/sideDist*(sideDist * (1-i/times)) + y);
    ctx.lineTo((perpVec.x0 - x0)/sideDist*(sideDist * (1-i/times)) + x0, (perpVec.y0 - y0)/sideDist*(sideDist * (1-i/times)) + y0);
    ctx.stroke();
  }

  for(var i = 0; i < times; i++) {
    ctx.beginPath();
    ctx.moveTo(((2*perpVec.x - perpVec.x0) - x)/sideDist*(sideDist * (1-i/times)) + x, ((2*perpVec.y - perpVec.y0) - y)/sideDist*(sideDist * (1-i/times)) + y);
    ctx.lineTo(((2*perpVec.x - perpVec.x0) - x0)/sideDist*(sideDist * (1-i/times)) + x0, ((2*perpVec.y - perpVec.y0) - y0)/sideDist*(sideDist * (1-i/times)) + y0);
    ctx.stroke();
  }

  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x0, y0);
  ctx.stroke();
}

const keyBooleans = (t) => () => {
  if(t && event.type === "mousemove") {
    t.mousemove([event.offsetX, event.offsetY])
  }
}

const attributes = {
  title: 'hills3',
  path: 'hills3',
}

const component = CanvasStuf(run, attributes)

component.attributes = attributes

export default component
