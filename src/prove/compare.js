

module.exports = function compare(inputs) {
  let uniques = [];
  
  for (var i = 0; i < inputs[0].length; ++i) {
    uniques.push(inputs[0][i]);
  }
  
  for (var i = 1; i < inputs.length; ++i) {
    for (var j = 0; j < inputs[i].length; ++j) {
      let thing2 = inputs[i][j];
      if (!uniques.includes(thing2)) {
        uniques.push(thing2);
      }
    }
    
  }
  
  return uniques;
}