const places = require('../places');

module.exports = function printRows(rowArray) {
  let rows = '<g style="font-family: Verdana, sans-serif; fill: #000; font-size: 16px;">';
  
  //build text of rows
  for (var i = 0; i < rowArray.length; ++i) {
    
    for (var j = 0; j < rowArray[i].bells.length; ++j) {
      rows += '<text x="'+(40+j*16)+'" y="' + (16 + i*20) + '">';
      //take each number in the array of bells and find the character that represents it in the places string
      let number = rowArray[i].bells[j];
      rows += places[number-1]; // + ' '
      rows += '</text>';
    }
    
    
  }
  rows += '</g>';
  
  return rows;
}