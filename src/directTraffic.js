const catIndexed = require('./catIndexed.js');

const build = require('./buildPage2.js');


const handleInput = require('./handleInput.js');

module.exports = function directTraffic(input, type, cb) {
  //console.log("input: ", input);
  let validInputs = 0;
  for (var key in input) {
    if (catIndexed[key]) validInputs++;
  }
  
  
  if (validInputs == 0) {
    cb(build([],[],'', 0, type));
  } else {
    //buildpage
    return handleInput(input, type, cb);
  }
  
}