const test = require('tape')
const topology = require('../src/topology.js')
const data = require('../fixtures/topology.json')


test('instantiate topology', (t) => {

  var network = topology(data.nodes, data.edges)
  t.equals(network.edges.length, data.edges.length, 'passed edges')
  t.equals(network.nodes.length, data.nodes.length, 'passed nodes')
  
  t.end()
})

test('topology#update -> request', (t) => {

  var network = topology(data.nodes, data.edges)
  var id = Math.floor(Math.random()*10)
  network.update({
    type: 'request'
  , data_ID: id
  , node: data.nodes[0].name 
  })
  
  var node = network.nodes.filter(n => n.name == data.nodes[0].name)[0]
  
  t.ok(node, 'node exists')
  t.equals(Object.keys(node.requests).length, 1, 
      'request event adds to node.requests')
  
  var r = node.requests.filter(r => r.id == id)[0]
  t.ok(r, 'request has correct id')
  t.equals(r.loc, data.nodes[0].name, 'request location instantiated')
  t.equals(r.id, id, 'request id instantiated')
   
  t.end()
})

test('topology#update -> request_hop', (t) => {
  
  var network = topology(data.nodes, data.edges)
  var id = Math.floor(Math.random()*10)
  network.update({
    type: 'request'
  , data_ID: id
  , node: data.nodes[0].name 
  })
  network.update({
    type: 'request_hop'
  , data_ID: id
  , to_node: data.nodes[1].name 
  , from_node: data.nodes[0].name 
  })
  
  var src = network.nodes.filter(n => n.name == data.nodes[0].name)[0]
  var dst = network.nodes.filter(n => n.name == data.nodes[1].name)[0]
  t.ok(src, 'src exists')
  t.equals(src.requests.length, 0, 'src has no requests') 
  
  t.ok(dst, 'dst exists')
  t.equals(dst.requests.length, 1, 'dst has one request')
 
  var r = dst.requests.filter(r => r.id == id)[0] 
  t.ok(r, 'request exists with correct id')
  
  t.equals(r.loc, dst.name, 'request has correct loc')
  
  t.end()
})
