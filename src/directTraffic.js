

const build = require('./buildPage2.js');


const handleInput = require('./handleInput.js');

module.exports = function directTraffic(input, type, cb) {
  console.log("input: ", input);
  
  if (Object.keys(input).length == 0) {
    cb(build([],[],'', 0, type));
  } else {
    //buildpage
    return handleInput(input, type, cb);
  }
  
}