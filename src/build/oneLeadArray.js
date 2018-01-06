

module.exports = function buildRows(rowZero, placeNotArray, rowNum, numBells) {
  let arrayRows = [];
  let prevRow = rowZero;
  
  
  //loop through place notation
  for (var i = 0; i < placeNotArray.length; ++i) {
    let row = {};
    row.rowNum = i + rowNum;
    row.bells = [];
    let direction = 1;
    
    //build one row
    for (var p = 0; p < rowZero.length; ++p) {
      if (placeNotArray[i].indexOf(p+1) >= 0) {
        row.bells.push(prevRow[p]);
      } else {
        row.bells.push(prevRow[p+direction]);
        direction *= -1;
      }
    }
    
    //add tenor to odd bell methods
    if (numBells % 2 == 1) {
      row.bells.push(numBells + 1);
    }
    arrayRows.push(row);
    prevRow = row.bells;
  }
  return arrayRows;
}