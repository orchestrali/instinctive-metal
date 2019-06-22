

module.exports = function buildLines(width, rowArrayLength, info) {
  let leadLength = info.leadLength;
  let j;

  if (info.method == 'Sted') {
    j = -60;
    leadLength = 6;
  } else if (info.method == 'Erin') {
    j = 20;
  } else {
    j = 0;
  }
  //line under the first leadhead
  let lines = `<g style="stroke: #111; stroke-width:1;">
<line x1="38" y1="20" x2="` + width + `" y2="20" />`
  //every leadLength rows draw a line
  for (var i = 0; i < rowArrayLength/leadLength; ++i) {
    let lineY = (i+1)*leadLength*20 + j;
    if (lineY < rowArrayLength*20) {
      lines += '<line x1="38" y1="' + lineY + '" x2="' + width + '" y2="' + lineY + '" />';
    }
  }
  
  lines += '</g>';
  return lines;
}