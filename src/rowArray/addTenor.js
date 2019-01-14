
//takes array of row objects and number of tenors and adds tenor(s) to the end of each row
module.exports = function addTenor(rowArray, tenors) {
  let stage = rowArray[0].bells.length;
  for (var j = 0; j < tenors; j++) {
    for (var i = 0; i < rowArray.length; i++) {
      rowArray[i].bells.push(stage+1+j);
    }
  }
  
  
  return rowArray;
}