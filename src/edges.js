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
    .attr('class', 'edge')
    .style('stroke-width', '2px')
}
