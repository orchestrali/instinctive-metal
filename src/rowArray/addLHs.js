

module.exports = function addLHs(rowArray, l, start, name) {
  
  for (var i = 0; i < rowArray.length/l; i++) {
    if (rowArray[start+i*l]) {
      rowArray[start+i*l].name = name;
    }
    
  }
  return rowArray;
}