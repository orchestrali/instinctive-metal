

//given a starting row, place notation, the number of the first row to create, and the lead type, create an array of rows

module.exports = function buildRows(leadInfo) {
  let arrayRows = [];
  let prevRow = leadInfo.rowZero;
  let placeNotArray = leadInfo.placeNot;
  let numBells = prevRow.length;
  let leadType = leadInfo.leadType;
  //console.log('rowZero', leadInfo.rowZero);
  //console.log('numBells', numBells);
  
  //loop through place notation
  for (var i = 0; i < placeNotArray.length; ++i) {
    let row = {};
    row.rowNum = i + leadInfo.rowNum;
    row.bells = [];
    let direction = 1;
    
    //build one row
    for (var p = 0; p < numBells; ++p) {
      if (placeNotArray[i].indexOf(p+1) >= 0) {
        row.bells.push(prevRow[p]);
      } else {
        row.bells.push(prevRow[p+direction]);
        direction *= -1;
      }
    }
    prevRow = row.bells;
    //console.log(row.bells);
    //add tenor to odd bell methods
    if (numBells % 2 == 1 && leadInfo.tenor == "yes") {
      row.bells.push(numBells + 1);
    }
    arrayRows.push(row);
    
    //add call indication to call rows
    if ((leadType.name == 'b' || leadType.name == 's') && row.rowNum % leadType.callLoc == 0) {
      row.type = leadType.name;
    }
  }
  return arrayRows;
}