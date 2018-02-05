//given a starting row, place notation, the number of the first row to create, and the stage, create an array of rows

module.exports = function buildRows(rowZero, placeNotArray, rowNum, numBells, leadType) {
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
    
    if ((leadType.name == 'b' || leadType.name == 's') && row.rowNum % leadType.callLoc == 0) {
      row.type = leadType.name;
    }
  }
  return arrayRows;
}