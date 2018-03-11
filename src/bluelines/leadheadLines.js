

module.exports = function buildLines(rowArray) {
  //line under the first leadhead
  let lines = `<g style="stroke: #111; stroke-width:1;">
<line x1="38" y1="20" x2="` + (16*rowArray[0].bells.length+38) + `" y2="20" />`
  
  //find where the treble leads twice in a row and draw a line under it
  for (var i = 0; i < rowArray.length-1; ++i) {
    let index1 = rowArray[i].bells.indexOf(1);
    let index2 = rowArray[i+1].bells.indexOf(1);
    
    if (index1 == 0 && index2 == 0) {
      let lineY = (rowArray[i].rowNum-rowArray[0].rowNum)*20 + 20;
      lines += '<line x1="38" y1="' + lineY + '" x2="' + (16*rowArray[0].bells.length+38) + '" y2="' + lineY + '" />';
    }
  }
  
  lines += '</g>';
  return lines;
}