var test = require('tape')
var network = require('../src/network')
var topology = require('../fixtures/topology.json')

module.exports = function (window, d3) {

  var canvas = d3.select('body').append('svg')
    .attr('width', 900)
    .attr('height', 500)
    
  test('hello', function (t) {
    t.equals(1, 1, 'ones are equal')
    t.end()
  })
  
  test('network#draw(undefined)', function (t) {
    var draw = network.draw(null, null)
    t.notOk(draw(canvas), 'network.draw(null, null)(x) == undefined')
    t.end()
  })
  
  test('network#draw', function (t) {
    network.draw(topology.nodes, topology.edges)(canvas)
    t.ok(get('.node').length > 0, 'nodes.length > 0')
    t.equals(get('.node').length, topology.nodes.length, 'all nodes rendered')
    t.end()
  })
  
  function get(el) {
    return d3.selectAll(el)[0]
  }
}
