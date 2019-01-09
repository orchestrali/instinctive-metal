

const build = require('./buildPage2.js');


const handleInput = require('./handleInput.js');

module.exports = function directTraffic(input, type, cb) {
  if (Object.keys(input).length == 0) {
    cb(build([],[],'', input, type));
  } else {
    //buildpage
    return handleInput(input, type, cb);
  }
  
}