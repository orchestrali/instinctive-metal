
//this is not actually the rowArray, but an array of rownums that have names (leadhead, half lead, new six)
module.exports = function buildLines(width, rowArray, x) {

  //line under the first leadhead
  let lines = `<g style="stroke: #111; stroke-width:1;">
<line x1="${x}" y1="20" x2="` + width + `" y2="20" />`
  
  for (let i = 0; i < rowArray.length; ++i) {
    let lineY = rowArray[i]*20;
    
    lines += '<line x1="'+x+'" y1="' + lineY + '" x2="' + width + '" y2="' + lineY + '" />';
    
  }
  
  lines += '</g>';
  return lines;
}