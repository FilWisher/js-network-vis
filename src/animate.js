// create request

var requests = {}

module.exports = function (network, events, dt, redraw) {
/*
  setInterval(function () {
    update_cache_size(network)
  }, dt)
       
  console.log('network:', network)
*/
  return anim(network, events, dt, redraw)
}

function update_cache_size(network, dt) {
  network.nodes
    .transition(dt)
    .attr('r', function (d) {
      return (Math.random()*10)+5
    })
}

/*
event = {
  type: 'request'
, from: '<number>'
, to: '<number>'
}
*/

function anim(network, evs, dt, redraw) {

  setInterval(function () {
    ev = evs.pop()
    if (!ev) return
    update(network, ev)
   
    redraw()
      
  }, 1000)
}

function request_coords(nodes) {
  var reqs = Object.keys(requests).map(function (k) {
    return requests[k].loc
  })
  return nodes.filter(function (node) {
    return reqs.indexOf(node.name) > -1
  }).map(function (node) {
    console.log(node)
    return {
      x: node[0].cx.baseVal.valueAsString
    , y: node[0].cy.baseVal.valueAsString
    }
  })
}

function update(network, ev) {
  switch (ev.type) {
  case 'request':
    request(network.nodes, ev)
    break
  case 'request_hop':
    request_hop(network.nodes, ev)
    break
  }
}

function get_node(id, nodes) {
  return nodes.filter(function (node) {
    return node.name === ev.node
  })[0]
}

function request(nodes, ev) {
  var n = get_node(ev.node, nodes)
  if (!n) return
  console.log('n', n)
  var r = {
    id: ev.data_ID
  , loc: ev.node
  }
  n.requests[ev.data_ID] = r
}

function request_hop(nodes, ev) {
  var src = get_node(ev.from_node, nodes)
  if (!src) return
  delete src.requests[ev.data_ID]
  var dst = get_node(ev.to_node, nodes)
  dst.requests[ev.data_ID] = {
    id: ev.data_ID
  , loc: ev.to_node
  }
}
