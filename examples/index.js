var animate = require('../src/animate.js')
var data = require('../fixtures/topology_small.json')
var topology = require('../src/topology.js')
var d3 = require('d3')

function node_color(node) {
  if (node.requests.length > 0) {
    return 'blue'
  } else {
    return 'red'
  }
}

function node_size(node) {
  if (node.requests.length > 0)
    return '15'
  else
    return '10'
}

var net = topology(data.nodes, data.edges)
var id = Math.floor(Math.random()*100)

var width = 900
var height = 500

var canvas = d3.select('body').append('svg')
  .attr('width', width)
  .attr('height', height)
  
canvas.append('text').attr('class', 'next')
  .attr('x', 200)
  .attr('y', 200)
  .text('next')
  .style('font-style', 'courier')
  .style('font-size', '45px')
  .on('click', update)
  .on('mouseover', function () {
    d3.select(this).style('fill', '#111')
  })
  .on('mouseout', function () {
    d3.select(this).style('fill', '#000')
  })

var force = d3.layout.force()
    .charge(-200)
    .linkDistance(100)
    .size([width, height])
    
var edges = canvas.selectAll('.edge')
  .data(net.edges)
  .enter()
  .append('line')
  .attr('class', 'edge')
  .style('stroke-width', '2px')
  .call(force.drag)
  
var nodes = canvas.selectAll('.node')
  .data(net.nodes)
  .enter()
  .append('circle')
  .attr('class', 'node')
  .attr('id', function (d) { return 'i' + d.name })
  .attr('r', node_size)
  .style('fill', node_color)
  .call(force.drag)

force
  .nodes(net.nodes)
  .links(net.edges)
  .start()
  
force.on('tick', tick)

function tick() {
  edges.attr('x1', function(d) { return d.source.x })
      .attr('y1', function(d) { return d.source.y })
      .attr('x2', function(d) { return d.target.x })
      .attr('y2', function(d) { return d.target.y })

  nodes.attr('cx', function(d) { return d.x })
      .attr('cy', function(d) { return d.y })
}

function update_network(ev) {

  /* update data */
  net.update(ev)
 
  /* update screen */ 
  rerender()
}

function rerender() {
  
  force
    .nodes(net.nodes)
    .charge(-200)
    .links(net.edges)
    .start()
    
  nodes = canvas.selectAll('circle.node')
    .data(net.nodes, function (d) { return d.name })
    .style('fill', node_color)
    
  nodes
    .transition()
    .duration(100)
    .attr('r', node_size)
 
  nodes.exit().remove() 
}

var evs = [
  {
    type: 'request'
  , data_ID: id
  , node: net.nodes[0].name 
  }
  ,{
    type: 'request_hop'
  , data_ID: id
  , to_node: data.nodes[1].name 
  , from_node: data.nodes[0].name 
  },
  ,{
    type: 'request_hop'
  , data_ID: id
  , to_node: data.nodes[2].name 
  , from_node: data.nodes[1].name 
  }
].reverse()

function update () {
  var ev = evs.pop()
  if (!ev) return
  update_network(ev)
}
