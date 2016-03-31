var network = require('../src/network.js')
var topology = require('../fixtures/topology.json')
var d3 = require('d3')

var width = 900
var height = 500

var force = d3.layout.force()
    .charge(-200)
    .linkDistance(100)
    .size([width, height]);

force
  .nodes(topology.nodes)
  .links(topology.edges)
  .start()

var canvas = d3.select('body').append('svg')
  .attr('width', width)
  .attr('height', height)

var nw = network.draw(topology.nodes, topology.edges)(canvas) 
nw.edges.call(force.drag)
nw.nodes.call(force.drag)

force.on('tick', function() {
  nw.edges.attr('x1', function(d) { return d.source.x })
      .attr('y1', function(d) { return d.source.y })
      .attr('x2', function(d) { return d.target.x })
      .attr('y2', function(d) { return d.target.y })
  nw.edges.attr('x1', function(d) { return d.source.x })
      .attr('y1', function(d) { return d.source.y })
      .attr('x2', function(d) { return d.target.x })
      .attr('y2', function(d) { return d.target.y })

  nw.nodes.attr('cx', function(d) { return d.x })
      .attr('cy', function(d) { return d.y })

})

console.log(topology)
