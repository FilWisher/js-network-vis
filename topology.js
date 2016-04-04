module.exports = topology

function topology (nodes, edges) {
  var t = {}
  var handlers = {} 
  
  t.edges = edges
  t.nodes = nodes.map(function (node) {
    node.requests = []
    return node
  })
   
  t.update = function update(ev) {

    var h = handlers[ev.type]
    if (!h) return
    return h(ev, t.nodes, t.edges)
  }
  
  t.event = function (name, fn) {
    if (!name || !fn || typeof fn !== 'function') {
      throw new Error('must register event-type with function')
    }
    handlers[name] = fn
  }
  
  return t
}
