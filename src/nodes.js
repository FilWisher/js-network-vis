module.exports = {
  draw: draw
}

function draw(data) {
 
  if (!data) {
    console.log('nodes.draw: no data provided')
    return undefined
  }
 
  return data
    .append('circle')
    .attr('class', 'node')
    .attr('r', function (d) {
      return (4*Object.keys(d.requests).length)+3
    })
    .style('fill', 'red')
}
