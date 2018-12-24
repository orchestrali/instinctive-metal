const sortInput = require('./sortInput.js');
const checkError = require('./checkError.js');

const methodParse = require('./method/handleInput2.js');
const compParse = require('./comp/handleInput.js');
const rowGen = require('./rowArray/handleInput.js');
const buildSVGs = require('./svgs/handleInput.js');

const build = require('./buildPage2.js');
const buildPage = require('./buildPage.js');
const buildPageBL = require('./buildPageBL.js');
const buildPageP = require('./buildPageP.js');
const buildPageS = require('./buildPageS.js');

const handleInput = require('./handleInput.js');

module.exports = function directTraffic(input, type) {
  if (Object.keys(input).length == 0) {
    return build([],[],'', input, type);
  } else {
    //buildpage
    return handleInput(input, type);
  }
  
}