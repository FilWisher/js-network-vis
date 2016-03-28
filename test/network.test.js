var test = require('tape')

module.exports = function (window, d3) {

  var canvas = d3.select('body').append('svg')
    .attr('width', 900)
    .attr('height', 500)
    
  test('hello', function (t) {
    t.equals(1, 1, 'ones are equal')
    t.end()
  })
}
