var nodes = require('./nodes.js')
var edges = require('./edges.js')

var draw_network = function draw_network (ns, es) {

  return function (el) {
  
    if (!ns || !es) {
      console.log('links#draw: no data provided')
      return undefined
    } 
    
    var node_collection = nodes.draw(el.selectAll('.node')
      .data(ns)
      .enter())
     
    var edge_collection = edges.draw(el.selectAll('.edge')
      .data(es)
      .enter())
  }
}

module.exports = {
  draw: draw_network
}
