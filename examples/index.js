var animate = require('../src/animate.js')
var network = require('../src/network.js')
var data = require('../fixtures/topology.json')
var topology = require('../src/topology.js')
var d3 = require('d3')

function node_color(node) {
  if (node.requests.length > 0) {
    console.log(node)
    return 'blue'
  } else {
    return 'red'
  }
}

function node_size(node) {
  if (node.requests.length > 0)
    return '10'
  else
    return '5'
}

var net = topology(data.nodes, data.edges)
var id = Math.floor(Math.random()*100)
net.update({
  type: 'request'
, data_ID: id
, node: net.nodes[0].name 
})

var width = 900
var height = 500

var canvas = d3.select('body').append('svg')
  .attr('width', width)
  .attr('height', height)

var force = d3.layout.force()
    .charge(-200)
    .linkDistance(100)
    .size([width, height])
    
var nodes = canvas.selectAll('.node')
  .data(net.nodes)
  .enter()
  .append('circle')
  .attr('class', 'node')
  .attr('id', function (d) { return 'i' + d.name })
  .attr('r', '5')
  .style('fill', node_color)
  .call(force.drag)

var edges = canvas.selectAll('.edge')
  .data(net.edges)
  .enter()
  .append('line')
  .attr('class', 'edge')
  .style('stroke-width', '2px')
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
