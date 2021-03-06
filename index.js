var d3 = require('d3')
var topology = require('./topology.js')

module.exports = draw

function draw (nodes, edges, opts) {

  var network = {}
  var color, size
  
  network.opts = opts
  network.graph = topology(nodes, edges)
  
  opts = opts || {}
  opts.width = opts.width || 900
  opts.height = opts.height || 500
  opts.element = opts.element || 'body'
  opts.charge = opts.charge || -200
  opts.linkDistance = opts.linkDistance || 100
  
  if (typeof opts.setup === 'function') {
    opts.setup(network.graph.nodes, network.graph.edges)
  }
  
  var tick = opts.tick || function (nodes, edges) {
    edges.attr('x1', function(d) { return d.source.x })
        .attr('y1', function(d) { return d.source.y })
        .attr('x2', function(d) { return d.target.x })
        .attr('y2', function(d) { return d.target.y })

    nodes.attr('cx', function(d) { return d.x })
        .attr('cy', function(d) { return d.y })
  }
  opts.tick = function() {
    tick(network.nodes, network.edges)
  }
  
  if (typeof opts.node_color !== 'function') {
    color = opts.node_color || 'red'
    opts.node_color = function (node) {
      return color
    }
  }
  
  if (typeof opts.node_size !== 'function') {
    size = opts.node_size || '10'
    opts.node_size = function (node) {
      return size
    }
  }

  network.event = network.graph.event



  network.canvas = d3.select(opts.element).append('svg')
    .attr('width', opts.width)
    .attr('height', opts.height)
    .append('g')
    .call(d3.behavior.zoom().scaleExtent([1,8]).on("zoom", function() {
      network.canvas.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
    }))
    
  network.canvas.append('rect')
    .attr('class', 'overlay')
    .attr('width', opts.width)
    .attr('height', opts.height)
      
    
  var force = d3.layout.force()
    .charge(opts.charge)
    .linkDistance(opts.linkDistance)
    .size([opts.width, opts.height])

  network.edges = network.canvas.selectAll('.edge')
    .data(network.graph.edges)
    .enter()
    .append('line')
    .attr('class', 'edge')
    .style('stroke-width', '2px')
    .call(force.drag)
  
  network.nodes = network.canvas.selectAll('.node')
    .data(network.graph.nodes)
    .enter()
    .append('circle')
    .attr('class', 'node')
    .attr('id', function (d) { return 'i' + d.name })
    .attr('r', opts.node_size)
    .style('fill', opts.node_color)
    .call(force.drag)
    
  force.nodes(network.graph.nodes)
    .links(network.graph.edges)
    .start()
    
  force.on('tick', opts.tick)
  
  network.update = function (ev) {
    network.graph.update(ev, network)
    
    if (typeof opts.update === 'function') {
      opts.update(network)
    }
  }
    
  return network
}

draw.topology = topology
