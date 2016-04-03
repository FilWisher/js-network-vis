var data = require('../fixtures/topology_small.json')
var draw = require('../src/network2.js')

var network = draw(data.nodes, data.edges, {
  node_color: function (node) {
    return node.requests.length > 0 ? 'blue' : 'red'
  }
, node_size: function (node) {
    return node.requests.length > 0 ? '15' : '10'
  }
})

var id = Math.floor(Math.random()*1000)
var evs = [
  {
    type: 'request'
  , data_ID: id
  , node: network.graph.nodes[0].name 
  }
  ,{
    type: 'request_hop'
  , data_ID: id
  , to_node: network.graph.nodes[1].name 
  , from_node: network.graph.nodes[0].name 
  },
  ,{
    type: 'request_hop'
  , data_ID: id
  , to_node: network.graph.nodes[2].name 
  , from_node: network.graph.nodes[1].name 
  }
].reverse()

function update () {
  var ev = evs.pop()
  if (!ev) return
  network.update(ev)
}

setInterval(update, 2000)
