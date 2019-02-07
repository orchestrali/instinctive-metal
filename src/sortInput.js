const catIndexed = require('./catIndexed.js');

module.exports = function sortInput(input) {
  let object = {};
  object.methodInfo = {};
  object.composition = {};
  object.display = {};
  
  for (var key in input) {
    if (catIndexed[key]) {
      object[catIndexed[key]][key] = input[key].trim();
    }
  }
  
  return object;
}