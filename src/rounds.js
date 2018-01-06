module.exports = function rounds(numBells) {
  let rowZero = [];
  
  for (var i = 0; i < numBells; ++i) {
      rowZero.push(i+1);
    }
  return rowZero;
}