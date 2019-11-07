
import { loop } from './mvc'


// Rendering setup

const pageHeight = document.body.clientHeight;
const pageWidth = document.body.clientWidth;
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
ctx.canvas.height = pageHeight;
ctx.canvas.width = pageWidth;
blackCanvas()
ctx.lineWidth = 2;
ctx.strokeStyle = "white";

const bigDisc = new Image()
bigDisc.src = "bigDisc.png"

function render({ mouse: [x, y], hit, chasers, sections }) {
  blackCanvas();
  var xamount = Math.pow(x - pageWidth/2, 2)*2000/Math.pow(pageWidth,2);
  var yamount = Math.pow(y - pageHeight/2, 2)*2000/Math.pow(pageHeight,2);
  ctx.drawImage(bigDisc, -1*xamount/2, -1*yamount/2, pageWidth + xamount, pageHeight + yamount);

  for(var i = 0; i < sections; i++)
  {
    var angle = i*Math.PI*2/sections;
    linedLeaf((pageWidth/2+200), pageHeight/2, 700 * Math.cos(angle) + (pageWidth/2+200) + (x-(pageWidth/2+200))/Math.sqrt(Math.pow(x-(pageWidth/2+200),2)+Math.pow(y - pageHeight/2,2))*150, 700 * Math.sin(angle) + pageHeight/2 + (y-pageHeight/2)/Math.sqrt(Math.pow(x-(pageWidth/2+200),2)+Math.pow(y - pageHeight/2,2))*150, sections);
    linedLeaf((pageWidth/2-200), pageHeight/2, 700 * Math.cos(angle) + (pageWidth/2-200) + (x-(pageWidth/2-200))/Math.sqrt(Math.pow(x-(pageWidth/2-200),2)+Math.pow(y - pageHeight/2,2))*150, 700 * Math.sin(angle) + pageHeight/2 + (y-pageHeight/2)/Math.sqrt(Math.pow(x-(pageWidth/2-200),2)+Math.pow(y - pageHeight/2,2))*150, sections);
    linedLeaf(pageWidth/2, pageHeight/2, 700 * Math.cos(angle) + pageWidth/2 + (x-pageWidth/2)/Math.sqrt(Math.pow(x-pageWidth/2,2)+Math.pow(y - pageHeight/2,2))*150, 700 * Math.sin(angle) + pageHeight/2 + (y-pageHeight/2)/Math.sqrt(Math.pow(x-pageWidth/2,2)+Math.pow(y - pageHeight/2,2))*150, sections);
  }

  chasers.forEach(drawChaser)

  if(hit) {
    ctx.strokeStyle = "black";
    ctx.font = "100px Courier New";
    ctx.strokeText("KEEP MOVING",200,200);
    ctx.strokeStyle = "white";
  }

}

const drawChaser = ({ x, y }) => {
  ctx.beginPath();
  ctx.arc(x, y, 20, 0, Math.PI*2);
  ctx.fill();
}

const state = {
  mouse: [0, 0],
  stopped: false,
  amount: 0,
  sections: 7,
  chasers: [
    { x: 1, y: 1, speed: 5 },
    { x: 0, y: pageHeight, speed: 5 },
    { x: pageWidth, y: 0, speed: 5 },
    { x: pageWidth, y: pageHeight, speed: 5 }
  ],
  hit: false
}

const actions = {
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
          x: Math.round(Math.random() * pageWidth),
          y: Math.round(Math.random() * pageHeight),
          speed: Math.round(Math.random() * 10)
        }
      ]
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
}

function linedLeaf(x, y, x0, y0, sections) {
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

const [t, start] = loop(state, actions, render, 10, 'move')
start()

function keyBooleans() {
  if(t && event.type === "mousemove") {
    t.mousemove([event.x, event.y])
  }
}
