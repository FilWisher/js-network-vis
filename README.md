# js-network-vis
Tool for visualizing network simulation

Use with browserify or use pre-browserified in dist/

```npm install js-network-vis```

```js
var data = require('./graph_data.json')
var draw = require('js-network-vis')

var network = draw(data.nodes, data.edges, {
  width: 500
, height: 900
  
  /* configure visualization with values or functions */
, node_color: 'pink'
, node_size: function (node) {
    return node.requests.length > 0 ? '15' : '10'
  }  
})

/* register handlers to determine how graph responds to events */
network.event('request', function (event, nodes, edges) {
  var node = nodes.filter(function (n) {
    return n.name == event.node
  })[0]
  if (!node) return
  node.requests.push({
    id: ev.id
  , location: ev.node
  })
})

/* updates network with event */
network.update({
  type: 'request'
, node: 837
, id: Math.floor(Math.random() * 1000)
})

```

# api

js-network-vis exposes a single function

## draw(nodes, edges, opts)
nodes is an array of node objects:

```js
{
  name: ?
, group: ?
, type: ?
}
```

edges is an array of edge objects:
```js
{
  source: node1.name
, target: node2.name
, value: ?
}
```

opts has the following optional configurations:
```
{
  width: ? // canvas width
, height: ? // canvas height
, node_color: // color or function(node) that returns color
, node_size: ? // size or function(node) that returns size
, tick // function to call on force tick
, charge // charge for force layout
, linkDistance // linkDistance for force layout
}
```

## network
a network object is returned by draw:

```
{
  update: function(ev) // updates graph according to an event object
, event: function(name, handler) // adds event handler to network
, opts: { ... } // reference to opts object passed to draw
, canvas: d3 svg selection // reference to graph canvas 
, edges: d3 line selection // reference to graph lines
, nodes: d3 circle selection // reference to graph nodes
}
```

## network.event(name, handler)
adds handler function to network. when network.update is called with an event with the named typed, the handler is fired. handler should have the signature (event, nodes, edges) where nodes, edges are the data objects (*not* the d3 selection objects).

## network.update(event)
calls the handler registered against the type specified by event.type. if none is found, nothing happens.

# license
MIT
