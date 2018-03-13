const sortInput = require('./sortInput.js');
const checkError = require('./checkError.js');

const methodParse = require('./method/handleInput.js');
const compParse = require('./comp/handleInput.js');
const rowGen = require('./rowArray/handleInput.js');
const buildGraphs = require('./buildSVGs.js');
const printMethod = require('./bluelines/handleInput.js');

const buildPage = require('./buildPage.js');
const buildPageBL = require('./buildPageBL.js');

module.exports = function directTraffic(input, type) {
  let sortedInput = sortInput(input);
  let methodInput = sortedInput.methodInfo;
  let compInput = sortedInput.composition;
  let displayInput = sortedInput.display;
  let stage = Number(input.stage);
  let width = 270;
  let SVGs;
  
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
  
  //parse compInput
  let compInfo = compParse(compInput, stage);
  //second error check: not needed????
  
  //generate row array
  let rowArray = rowGen(methodInfo, compInfo);
  //generate SVGs
  if (type == 'grid') {
    let info = {};
    info.rowZeroObj = compInfo.rowZeroObj;
    info.plainPN = methodInfo.placeNot.plain;
    info.numBells = stage;
    info.leadLength = methodInfo.leadLength;
    SVGs = printMethod(displayInput, info, rowArray);
  } else if (type == 'graphs') {
    SVGs = buildGraphs(rowArray, width);
  }
  //buildpage
  if (type == 'grid') {
    return buildPageBL([], SVGs, input);
  } else if (type == 'graphs') {
    return buildPage([], SVGs, input);
  }
}