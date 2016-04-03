module.exports = topology

function topology (nodes, edges) {
  var t = {}
  
  t.edges = edges
  t.nodes = nodes.map(function (node) {
    node.requests = []
    return node
  })
  
  t.update = function update(ev) {

    switch (ev.type) {
      case 'request':
        var node = get_node(ev.node, t.nodes)
        if (!node) return
        node.requests.push({
          id: ev.data_ID
        , loc: ev.node
        })
        
        break
      case 'request_hop':
        var src = get_node(ev.from_node, t.nodes)
        if (!src) return
       
        src.requests = src.requests.filter(function (r) {
          return r.id !== ev.data_ID
        })
        
        var dst = get_node(ev.to_node, t.nodes)
        if (!dst) return
        dst.requests.push({
          id: ev.data_ID
        , loc: ev.to_node
        })
        
        break
    }
  }
  
  return t
}

function get_node(id, nodes) {
  return nodes.filter(function (node) {
    return node.name === id 
  })[0]
}
