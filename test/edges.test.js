var test = require('tape')
var edges = require('../src/edges.js')
var topology = require('../fixtures/topology.json')

module.exports = function (window, d3) {
  
  var canvas = d3.select('body').append('svg')
    .attr('width', 900)
    .attr('height', 500)

  test('edges#draw', function (t) {
  
    t.notOk(edges.draw(undefined), '(undefined): returns undefined') 
    t.notOk(edges.draw(null), '(null): returns undefined') 

    edges.draw(canvas.selectAll('.edge')
      .data([topology.edges[0]])
      .enter())
    t.equals(getEdges().length, 1, '(el): draws single edge')
    
    removeEdges()
    
    edges.draw(canvas.selectAll('.edge')
      .data(topology.edges)
      .enter())
     
    t.equals(getEdges().length, topology.edges.length, '(els): draws multiple edges')
    t.end()
  })

  function getEdges() {
    return d3.selectAll('.edge')[0]
  }
  
  function removeEdges() {
    d3.selectAll('.edge').remove()
  }
}
