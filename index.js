var data = require('../topology_small.json')
var draw = require('..')

var network = draw(data.nodes, data.edges, {
  node_color: function (node) {
    return node.requests.length > 0 ? 'blue' : 'red'
  }
, node_size: function (node) {
    return node.requests.length > 0 ? '15' : '10'
  }
})

function get_node(id, nodes) {
  return nodes.filter(function (n) {
    return n.name === id
  })[0]
}

// handle request events
function request (ev, nodes, edges) {
  var node = get_node(ev.node, nodes)
  if (!node) return
  node.requests.push({
    id: ev.data_ID
  , loc: ev.node
  })
}

// handle request_hop events
function request_hop (ev, nodes, edges) {
  var src = get_node(ev.from_node, nodes) 
  if (!src) return
 
  src.requests = src.requests.filter(function (r) {
    return r.id !== ev.data_ID
  })
  
  var dst = get_node(ev.to_node, nodes) 
  if (!dst) return
  dst.requests.push({
    id: ev.data_ID
  , loc: ev.to_node
  })
}

network.event('request', request)
network.event('request_hop', request_hop)

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
