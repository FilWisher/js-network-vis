var animate = require('../src/animate.js')
var network = require('../src/network.js')
var topology = require('../fixtures/topology.json')
var d3 = require('d3')
  
topology.nodes.forEach(function (node) {
  node.cache = []
  node.requests = {}
  node.cacheSize = (Math.random() * 10) + 5
})
 

var width = 900
var height = 500

var canvas = d3.select('body').append('svg')
  .attr('width', width)
  .attr('height', height)



var events = [
  {
    type: 'request'
  , node: '32'
  , data_ID: 'aoeu'
  }, 
  {
    type: 'request'
  , node: '1006'
  , data_ID: 'aoeu1'
  }, 
  {
    type: 'request'
  , node: '12'
  , data_ID: 'aoeu2'
  }, 
  {
    type: 'request'
  , node: '1001'
  , data_ID: 'aoeu3'
  }, 
  {
    type: 'request'
  , node: '1032'
  , data_ID: 'aoeu4'
  }
]

function redraw() {
  var force = d3.layout.force()
      .charge(-200)
      .linkDistance(100)
      .size([width, height]);

  force
    .nodes(topology.nodes)
    .links(topology.edges)
    .start()

  console.log(topology.nodes.filter(function (node) {
    return Object.keys(node.requests).length > 0
  }))
  console.log('redrawing ,,,.')
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
}

animate(topology, events, 100, redraw)
