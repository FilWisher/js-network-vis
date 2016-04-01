module.exports = topology

function topology (nodes, edges) {
  var t = {}
  
  t.edges = edges
  t.nodes = nodes
  
  t.requests = {}
  
  t.update = function update(ev) {

    switch (ev.type) {
      case 'request':
        t.requests[ev.data_ID] = {
          id: ev.data_ID
        , loc: ev.node
        }
        break
      case 'request_hop':
        if (!t.requests[ev.data_ID]) return
        t.requests[ev.data_ID].loc = ev.to_node
    }
  }
  
  return t
}
