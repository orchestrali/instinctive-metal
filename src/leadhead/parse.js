
module.exports = function leadhead(rowString, numBells) {
  let errorArray = [];
  let rowZero = [];
  
  
  if (rowString.length != numBells) {
    errorArray.push("Error: given leadhead does not contain the correct number of bells");
  } else {
    let leadhead = rowString.split('');
    for (var i = 0; i < numBells; ++i) {
      if (leadhead[i] == '0') {
        rowZero.push(10);
      } else if (leadhead[i] == 'E') {
        rowZero.push(11);
      } else if (leadhead[i] == 'T') {
        rowZero.push(12);
      } else if (leadhead[i]*1 > 0 && leadhead[i]*1 < 10) {
        rowZero.push(Number(leadhead[i]));
      } else {
        errorArray.push("Error: unrecognized character in leadhead");
      }
    }
  }
    
  return [errorArray, rowZero];
}