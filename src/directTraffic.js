const sortInput = require('./sortInput.js');
const checkError = require('./checkError.js');

const methodParse = require('./method/handleInput2.js');
const compParse = require('./comp/handleInput.js');
const rowGen = require('./rowArray/handleInput.js');
const buildSVGs = require('./svgs/handleInput.js');

const buildPage = require('./buildPage.js');
const buildPageBL = require('./buildPageBL.js');
const buildPageP = require('./buildPageP.js');

module.exports = function directTraffic(input, type) {
  let sortedInput = sortInput(input);
  let methodInput = sortedInput.methodInfo;
  let compInput = sortedInput.composition;
  let displayInput = sortedInput.display;
  let stage = Number(input.stage);
  let width = 270;
  let SVGs;
  console.log(type);
  //check for errors, first round; return page if there are any.
  let errors = checkError(methodInput, compInput);
  if (errors.length > 0) {
    if (type == 'grid') {
      return buildPageBL(errors, [], input);
    } else if (type == 'graphs') {
      return buildPage(errors, [], input);
    }
  }
  
  //parse methodInput, get methodInfo object
  let methodInfo = methodParse(methodInput);
  console.log(methodInfo);
  //parse compInput
  let compInfo = compParse(compInput, stage);
  //second error check: not needed????
  
  //generate row array
  let rowArray;
  if (type == 'practice') {
     rowArray = rowGen(methodInfo, compInfo, "no");
  } else {
    rowArray = rowGen(methodInfo, compInfo, "yes");
  }
  
  //console.log("first row bells: ", rowArray[0].bells);
  //generate SVGs
  SVGs = buildSVGs(methodInfo, compInfo, rowArray, displayInput, type);
  //buildpage
  if (type == 'grid') {
    return buildPageBL([], SVGs, input);
  } else if (type == 'graphs') {
    return buildPage([], SVGs, input);
  } else if (type == 'practice') {
    return buildPageP([], SVGs, input);
  }
}