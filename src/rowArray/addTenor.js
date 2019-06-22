
//takes array of row objects and number of tenors and adds tenor(s) to the end of each row
module.exports = function addTenor(stage, rowArray, tenors) {
  console.log(rowArray[0]);
  console.log("tenors", tenors);
  for (var j = 0; j < tenors; j++) {
    for (var i = 0; i < rowArray.length; i++) {
      //console.log('stage', stage);
      rowArray[i].bells.push(stage+1+j);
    }
  }
  
  
  return rowArray;
}