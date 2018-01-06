var places = '1234567890ET';

function nextRowFromPlaces(row, places) {
  let direction = 1; // this variable's value should alternate between -1 and 1 as we loop through the row
  let nextRow = [];
  for (let p = 0; p < row.length; p++) {
    if (places.indexOf(p+1) > -1) {
      nextRow.push(row[p]);
    } else {
      nextRow.push(row[p+direction]);
      direction *= -1;      
    }
  }
  return nextRow;
};


function buildCourseString(rowZero, placeNotArray) {
  let arrayRows = [];

  //build rows (only one lead):
  for (var i = 0; i < placeNotArray.length; ++i) {
    //each loop adds one row:
    var row = '';
    
    if (i == 0) {
      var prevRow = rowZero;
    } else {
      var prevRow = arrayRows[i-1];
    }
    
    //console.log(prevRow);
    var changePlaces = '';
    
    for (var j = 0; j < rowZero.length; ++j) {

      if (placeNotArray[i].indexOf(places[j]) >= 0) {
        row += prevRow[j];
      } else {
        changePlaces += places[j];
        if (changePlaces.indexOf(places[j]) % 2 == 0) {
          //console.log('no');
          row += prevRow[j+1]
        } else if (changePlaces.indexOf(places[j]) % 2 == 1) {
          row += prevRow[j-1];
        }
      }
      
      
    }
  
    arrayRows.push(row);
  }
  
}