const buildSets = require('./methodSetArray.js');
const buildArray = require('./methodArray.js');
const methodClass = require('./methodClass.js');

module.exports = function search(input) {
  
  let filter = {};
  
  if (input.class == "Plain") {
    filter.plain = "true";
    filter.class = "none";
  } else {
    filter.class = input.class;
  }
  
  let methodSetArray = buildSets(input.stage, filter);
  let methodArray = buildArray(methodSetArray);
  let names = [];
  
  console.log('number in class ' + input.class, methodArray.length);
  
  for (var i = 0; i < methodArray.length; ++i) {
    names.push(methodArray[i].name);
  }
  return names;
}