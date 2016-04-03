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

/* updates network with event */
network.update({
  type: 'request'
, node: 837
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
, opts: { ... } // reference to opts object passed to draw
, canvas: d3 svg selection // reference to graph canvas 
, edges: d3 line selection // reference to graph lines
, nodes: d3 circle selection // reference to graph nodes
}
```

## network.update(event)
updates network according to one of the following events:

### request
creates a request on the specified node
```js
{
  type: 'request'
, node: node.name
}
```

### request\_hop
moves a request from the from\_node to the to\_node
```js
{
  type: 'request_hop'
, from_node: node1.name
, to_node: node2.name
}
```
