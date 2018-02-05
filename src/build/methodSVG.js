const places = require('../places');
/*
var rowArray = [ 
  { rowNum: 0, bells: [ 1, 2, 3, 4, 5, 6 ] },
  { rowNum: 1, bells: [ 2, 1, 4, 3, 6, 5 ] },
  { rowNum: 2, bells: [ 2, 4, 1, 6, 3, 5 ] },
  { rowNum: 3, bells: [ 4, 2, 6, 1, 5, 3 ] },
  { rowNum: 4, bells: [ 4, 6, 2, 1, 3, 5 ] },
  { rowNum: 5, bells: [ 6, 4, 1, 2, 5, 3 ] },
  { rowNum: 6, bells: [ 6, 1, 4, 5, 2, 3 ] },
  { rowNum: 7, bells: [ 1, 6, 5, 4, 3, 2 ] },
  { rowNum: 8, bells: [ 1, 6, 4, 5, 2, 3 ] } ];


var blue = 5;

*/

module.exports = function methodSVG(rowArray, blue) {
  //console.log(rowArray)
  //group for the row text
  let rows = '<g style="font-family: Verdana; fill: #000;">';
  //starting index of the treble
  let trebleIndex = rowArray[0].bells.indexOf(1);
  //beginning of the treble path
  let treblePath = `<g style="stroke: #d00; stroke-width: 1; fill:none;">
      <path d="M` + (trebleIndex*16+45) + `,10`;
  
  //starting index of the bell getting the blue line
  let blueIndex = rowArray[0].bells.indexOf(blue);
  //beginning of the blue line
  let bluePath = `<g style="stroke: #00d; stroke-width:2; fill:none;">
      <path d="M` + (45 + 16*blueIndex) + `,10`;
  //height of the whole svg
  let height = rowArray.length*20;
  //console.log('rowArray length: ', rowArray.length);
  //console.log('height: ', height);
  
  //line under the first leadhead
  let lines = `<g style="stroke: #111; stroke-width:1;">
<line x1="38" y1="20" x2="` + (16*rowArray[0].bells.length+38) + `" y2="20" />`
  
  //group for bob/single indicators
  let callMarkers = '<g style="font-family: Verdana; fill: #000;">';
  
  //width of svg including rows + margin
  let gridWidth = rowArray[0].bells.length*16 + 38;
  
  //console.log('blueIndex: ', blueIndex);
  
  //build text of rows
  for (var i = 0; i < rowArray.length; ++i) {
    rows += '<text x="40" y="' + (16 + i*20) + '">';
    for (var j = 0; j < rowArray[i].bells.length; ++j) {
      //take each number in the array of bells and find the character that represents it in the places string
      let number = rowArray[i].bells[j];
      rows += places[number-1] + ' ';
    }
    rows += '</text>';
    
    //add call indicators
    if (rowArray[i].type == 'b') {
      callMarkers += '<text x="24" y="' + (16 + i*20) + '">-</text>';
    } else if (rowArray[i].type == 's') {
      callMarkers += '<text x="24" y="' + (16 + i*20) + '">s</text>';
    }
  }
  rows += '</g>';
  
  //build path (not beginning though!)—bell and bellIndex should be numbers
  function buildPath(bell, bellIndex) {
    let path = '';
    //console.log('building path for bell ' + bell)
    for (var i = 1; i < rowArray.length; ++i) {
      let index = rowArray[i].bells.indexOf(bell);
      if (index == bellIndex) {
        path += 'l0,20';
      } else if (index > bellIndex) {
        path += 'l16,20';        
      } else if (index < bellIndex) {
        path += 'l-16,20';
      }
      bellIndex = index;
      //console.log('new bell index: ', bellIndex);
    }
    
    return path;
  }
  
  //find where the treble leads twice in a row and draw a line under it
  for (var i = 0; i < rowArray.length-1; ++i) {
    let index1 = rowArray[i].bells.indexOf(1);
    let index2 = rowArray[i+1].bells.indexOf(1);
    
    if (index1 == 0 && index2 == 0) {
      let lineY = (rowArray[i].rowNum-rowArray[0].rowNum)*20 + 20;
      lines += '<line x1="38" y1="' + lineY + '" x2="' + (16*rowArray[0].bells.length+38) + '" y2="' + lineY + '" />';
    }
  }
  
  //finish treble path
  treblePath += buildPath(1, trebleIndex) + `"
/>
</g>`;
  
  //finish blue line
  bluePath += buildPath(blue, blueIndex) + `"
/>
</g>`;
  
  //close leadhead line and callmarker groups
  lines += '</g>';
  callMarkers += '</g>';
  
  //console.log('bluePath', bluePath);
  
  //build svg
  let svg = `<div class="grid"><svg class="grid" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="` + gridWidth + `" height="` + height + `">
` + rows + lines + callMarkers + treblePath + bluePath + `</svg></div>`
  
  
  return svg;
}