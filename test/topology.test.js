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
  
  t.equals(Object.keys(network.requests).length, 1, 'request event adds request')
  
  var r = network.requests[id]
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
  
  var r = network.requests[id]
  t.equals(Object.keys(network.requests).length, 1, 'requests length unchanged')
  t.equals(r.loc, data.nodes[1].name, 'request location updated')
  
  t.end()
})
