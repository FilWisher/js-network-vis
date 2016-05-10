module.exports = topology

function topology (nodes, edges) {
  var t = {}
  var handlers = {} 
  
  t.edges = edges
  t.nodes = nodes
   
  t.update = function update(ev, network) {

    var h = handlers[ev.type]
    if (!h) return
    return h(ev, t.nodes, t.edges, network)
  }
  
  t.event = function (name, fn) {
    if (!name || !fn || typeof fn !== 'function') {
      throw new Error('must register event-type with function')
    }
    handlers[name] = fn
  }
  
  return t
}
