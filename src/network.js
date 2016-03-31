var nodes = require('./nodes.js')
var edges = require('./edges.js')

var draw = function draw (ns, es) {

  return function (el) {
  
    if (!ns || !es) {
      console.log('network#draw: no data provided')
      return undefined
    } 
    
    var node_collection = nodes.draw(el.selectAll('.node')
      .data(ns)
      .enter())
     
    var edge_collection = edges.draw(el.selectAll('.edge')
      .data(es)
      .enter())
    
    return {
      nodes: node_collection
    , edges: edge_collection
    }
  }
}

module.exports = {
  draw: draw
}
