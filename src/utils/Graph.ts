
const drawVertex = (ctx, vertex, digraph = false) => {
  const color = vertex.color
  if(this.marked)
  {
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.arc(this.x,this.y,34,0,Math.PI*2);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(this.x,this.y,32,0,Math.PI*2);
    ctx.closePath();
    ctx.fill();
  }
  ctx.strokeStyle = "black";
  // ctx.fillStyle = this.marked ? "black" : lighterColor(color,30);
  ctx.fillStyle = lighterColor(color,30);
  ctx.beginPath();
  ctx.arc(this.x,this.y,30,0,Math.PI*2);
  ctx.closePath();
  ctx.fill();
  ctx.lineWidth = 1;
  // for(i=0;i<this.edges.length;i++)
  ctx.fillStyle = "black";
  for(i in this.edges)
  {
    ctx.beginPath();
    ctx.moveTo(this.x,this.y);
    ctx.lineTo(this.edges[i].x,this.edges[i].y);
    ctx.closePath();
    ctx.stroke();
    ctx.beginPath();
    if(digraph)
    {
      let slopeAng = Math.atan((this.y-this.edges[i].y)/(this.x-this.edges[i].x));
      if(this.x <= this.edges[i].x)
        slopeAng+=Math.PI;
      const perpAng = slopeAng+Math.PI/2;
      const midX = (this.x+this.edges[i].x)/2;
      const midY = (this.y+this.edges[i].y)/2;
      ctx.moveTo(midX-20*Math.cos(slopeAng),midY-20*Math.sin(slopeAng));
      ctx.lineTo(midX-10*Math.cos(perpAng), midY-10*Math.sin(perpAng));
      ctx.lineTo(midX+10*Math.cos(perpAng), midY+10*Math.sin(perpAng));
      ctx.closePath();
      ctx.fill();
    }
  }
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(this.x,this.y,20,0,Math.PI*2);
  ctx.closePath();
  ctx.fill();
}

class Vertex {

  public x = 0
  public y = 0
  public id = 0;
  public edges = [];
  public Name = "Vertex";
  public color
  public marked = false;
  public label = '';
  public parent = undefined;


  constructor(x, y, color) {
    this.x = x || 0
    this.y = y || 0
    this.color = color || '#000'
  }

  public connect = function(vert) {
    switch(typeof(vert))
    {
      case 'number':
        if(this.parent == undefined)
          return;
        else
          vert = this.parent.verts[vert];
      break;
      case 'undefined':
        return;
      break;
    }
    if(vert.id == this.id)
      return;
    if(this.edges[vert.id] != undefined)
      return;
    this.edges[vert.id] = vert;
    vert.edges[this.id] = this;
  };

  public drawTop = function() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x,this.y,20,0,Math.PI*2);
    ctx.closePath();
    ctx.fill();
  }

  public remove = function() {
    for(vert in this.edges)
    {
      delete this.edges[vert].edges[this.id];
    }
  }
}

function Graph(verts)
{
  this.verts = verts == undefined ? new Array() : verts;
  this.count = 0;
  this.marked = new Array();

  public createBoard = function(){ board = [];
    for(var i in this.verts){
      var vert = this.verts[i];
      var newSpace = {
        type: vert.color,
        id: vert.id,
        x: vert.x,
        y: vert.y,
        nbs: []
      };
      board.push(newSpace);
      for(var j in vert.edges){
        var edgeVert = vert.edges[j];
        newSpace.nbs.push(edgeVert.id);
      }
    }
    return JSON.stringify(board);
  }

  public add = function(x,y) {
    x = x == undefined ? 0 : x;
    y = y == undefined ? 0 : y;
    this.verts.push(new Vertex(x,y));
    this.verts[this.verts.length-1].label = this.verts.length-1;
    this.verts[this.verts.length-1].id = this.verts.length-1;
    this.verts[this.verts.length-1].parent = this;
    this.count++;
  }

  public connect = function(one,two) {
    if(one == two)
      return;
    if(this.verts.length < 2)
      return false;
    this.verts[one].connect(this.verts[two]);
  }

  public draw = function() {
    ctx.clearRect(0,0,pageWidth,pageHeight);
    // for(ops = 0; ops < this.verts.length; ops++)
    for(ops in this.verts)
      this.verts[ops].draw();
    // for(ops = 0; ops < this.verts.length; ops++)
    for(ops in this.verts)
      this.verts[ops].drawTop();
  }

  public whichVertex = function(x,y) {
    // for(erf = 0; erf < graph.verts.length; erf++)
    for(erf in graph.verts)
    {
      if(Math.sqrt(Math.pow(graph.verts[erf].x-x,2)+Math.pow(graph.verts[erf].y-y,2))<20)
      {
        return erf;
      }
    }
    return -1;
  }

  public get = function(num) {
    return this.verts[num];
  }

  public remove = function(id) {
    graph.verts[id].remove();
    delete graph.verts[id];
    graph.draw();
    this.count--;
  }

  public removeEdge = function(one, two) {
    delete graph.verts[one].edges[two];
    delete graph.verts[two].edges[one];
  };

  public complete = function() {
    for(blip in this.verts)
      for(blop in this.verts)
        this.verts[blip].connect(this.verts[blop]);
    graph.draw();
  };

  public unmarkAll = function() {
    for(urf in this.verts)
    {
      this.verts[urf].marked = false;
    }
    this.marked = new Array();
  };

  public unmark = function(num) {
    this.verts[num].marked = false;
    this.marked.splice(this.marked.indexOf(num),1);
  };

  public mark = function(num) {
    this.verts[num].marked = true;
    if(this.marked.indexOf(num) == -1)
      this.marked.push(num);
  };

  public removeEdgesOfMarked = function() {
    for(blip in this.marked)
      for(blop in this.marked)
        this.removeEdge(this.marked[blip],this.marked[blop]);
    graph.draw();
  };

  public connectMarked = function() {
    for(blip in this.marked)
      for(blop in this.marked)
        this.connect(this.marked[blip],this.marked[blop]);
    graph.draw();
  }

  public removeMarked = function() {
    for(blop in this.marked)
      this.remove(this.marked[blop]);
    graph.draw();
  }

  public changeColor = function(color) {
    for(blip in this.marked)
      this.verts[this.marked[blip]].color = color;
  }

  public selectAll = function() {
    for(balls in this.verts)
      this.mark(balls);
    graph.draw();
  }

  public countEdges = function() {
    num = 0;
    for(balls in this.verts)
    {
      for(dicks in this.verts[balls].edges)
        if(this.verts[balls].edges[dicks])
          num++;
      console.log(num);
    }
    return num/2;
  }

  public areConnected = function(one,two) {
    // return this.get(one).edges.indexOf(graph.get(two).id) != -1 || this.get(two).edges.indexOf(graph.get(one).id) != -1;
    first = false;
    secon = false;
    for(var blip in this.get(two).edges)
      if(this.get(two).edges[blip].id == one)
        first = true;
    for(var blip in this.get(one).edges)
      if(this.get(one).edges[blip].id == two)
        secon = true;
    return first || secon;
  }

  public adjacencyMatrix = function() {
    adj = [];
    for(var i = 0; i < this.verts.length; i++)
    {
      adj[i] = [];
      for(var j = 0; j < this.verts.length; j++)
        adj[i].push(0);
    }

    for(var i = 0; i < this.verts.length; i++)
    {
      for(var j = 0; j < this.verts[i].edges.length; j++)
        if(this.verts[i].edges[j] != undefined)
          adj[i][j] = 1;
    }

    return adj;
  }
}
