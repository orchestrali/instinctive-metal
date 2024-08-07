const catIndexed = require('./catIndexed.js');

const build = require('./buildPage.js');

const handleInput = require('./handleInput.js');

module.exports = function directTraffic(input, raw, cb) {
  //console.log(input);
  let type = ["grid", "graph", "staff", "practice", "simulator"].includes(input.type) ? input.type : null;
  let validInputs = 0;
  for (var key in input) {
    if (catIndexed[key]) validInputs++;
  }
  
  
  if (validInputs === 0 || !input.stage) {
    cb(build([],{}, 0, type));
  } else {
    //buildpage
    return handleInput(input, type, raw, cb);
  }
  
}