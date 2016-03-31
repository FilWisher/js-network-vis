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
    .attr('r', 10)
    .style('fill', 'red')
}
