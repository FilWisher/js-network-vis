/*
 * OPTS:
 * {
 *  width // canvas width
 *, height // canvas height
 *, node_color // color or function to set node color
 *, node_size // size or function to set node size
 *, tick // function to call on force tick
 *, charge // charge for force layout
 *, linkDistance // linkDistance for force layout
 * }
 */

var d3 = require('d3')
var topology = require('./topology.js')

module.exports = function (nodes, edges, opts) {

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
  
  var tick = opts.tick || function (edges, nodes) {
    edges.attr('x1', function(d) { return d.source.x })
        .attr('y1', function(d) { return d.source.y })
        .attr('x2', function(d) { return d.target.x })
        .attr('y2', function(d) { return d.target.y })

    nodes.attr('cx', function(d) { return d.x })
        .attr('cy', function(d) { return d.y })
  }
  opts.tick = function() {
    tick(network.edges, network.nodes)
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
  
  network.canvas = d3.select(opts.element).append('svg')
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
    network.graph.update(ev)
    
    force.nodes(network.graph.nodes)
      .charge(opts.charge)
      .linkDistance(opts.linkDistance)
      .start()
      
    network.nodes = network.canvas.selectAll('circle.node')
      .data(network.graph.nodes, function (d) { 
        return d.name
      })
      .style('fill',  opts.node_color)
      
    network.nodes
      .transition()
      .duration(100)
      .attr('r', opts.node_size)
  }
    
  return network
}
