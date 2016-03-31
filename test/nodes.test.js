var test = require('tape')
var nodes = require('../src/nodes.js')
var topology = require('../fixtures/topology.json')

module.exports = function (window, d3) {
  
  var canvas = d3.select('body').append('svg')
    .attr('width', 900)
    .attr('height', 500)

  test('nodes#draw', function (t) {
  
    removeNodes()
    
    t.notOk(nodes.draw(undefined), '(undefined): returns undefined') 
    t.notOk(nodes.draw(null), '(null): returns undefined') 
    
    nodes.draw(canvas.selectAll('.node')
      .data(topology.nodes)
      .enter())
     
    t.equals(getNodes().length, topology.nodes.length, '(els): draws multiple nodes')
    
    removeNodes()
    
    t.end()
  })

  function getNodes() {
    return d3.selectAll('.node')[0]
  }
  
  function removeNodes() {
    d3.selectAll('.node').remove()
  }
}
