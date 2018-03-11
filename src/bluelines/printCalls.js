

module.exports = function printCalls(rowArray) {
  //group for bob/single indicators
  let callMarkers = '<g style="font-family: Verdana; fill: #000;">';
  
  for (var i = 0; i < rowArray.length; ++i) {
    //add call indicators
    if (rowArray[i].type == 'b') {
      callMarkers += '<text x="24" y="' + (16 + i*20) + '">-</text>';
    } else if (rowArray[i].type == 's') {
      callMarkers += '<text x="24" y="' + (16 + i*20) + '">s</text>';
    }
  }
  callMarkers += '</g>';
  return callMarkers;
}