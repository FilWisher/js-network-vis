module.exports = {
  draw: draw
}

function draw (data) {

  if (!data) {
    console.log('links#draw: no data provided')
    return undefined
  } 

  return data
    .append('line')
    .attr('class', 'link')
    .style('stroke-width', function(d) { return Math.sqrt(d.target) })
}
