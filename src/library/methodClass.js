

module.exports = function methodClass(methodArray, className) {
  let methods = [];
  let names = [];
  let results = {};
  
  for (var i = 0; i < methodArray.length; ++i) {
    if (methodArray[i].class == className) {
      methods.push(methodArray[i]);
      names.push(methodArray[i].name);
    }
  }
  
  results.methods = methods;
  results.names = names;
  return results;
}