

module.exports = function addTenor(rowArray, tenor) {
  for (var i = 0; i < rowArray.length; i++) {
    rowArray[i].bells.push(tenor);
  }
  return rowArray;
}