

const build = require('./buildPage2.js');


const handleInput = require('./handleInput.js');

module.exports = function directTraffic(input, type) {
  if (Object.keys(input).length == 0) {
    return build([],[],'', input, type);
  } else {
    //buildpage
    return handleInput(input, type);
  }
  
}