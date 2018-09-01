const buildGraphs = require('./graphs.js');
const printMethod = require('../bluelines/handleInput.js');
const methodPractice = require('../practice/handleInput.js');

module.exports = function handleInput(methodInfo, compInfo, rowArray, displayInput, type) {
  let SVGs;
  let width = 270;
  if (type == 'grid') {
    let info = {};
    info.rowZeroObj = compInfo.rowZeroObj;
    info.plainPN = methodInfo.placeNot.plain;
    info.numBells = methodInfo.stage;
    info.leadLength = methodInfo.leadLength;
    if (methodInfo.name.indexOf('Stedman') > -1 || methodInfo.name.indexOf('Erin') > -1) {
      info.method = methodInfo.name.slice(0,4);
    }
    if (displayInput.numbers) {
      info.displayNums = true;
    } else {
      info.displayNums = false;
    }
    SVGs = printMethod(displayInput, info, rowArray);
  } else if (type == 'graphs') {
    SVGs = buildGraphs(rowArray, width);
  } else if (type == 'practice') {
    let info = {};
    info.rowZeroObj = compInfo.rowZeroObj;
    info.plainPN = methodInfo.placeNot.plain;
    info.stage = methodInfo.stage;
    info.huntbells = displayInput.huntbells;
    info.bluebell = Number(displayInput.blueBell);
    info.bluecolor = displayInput.blueBellc;
    SVGs = methodPractice(rowArray, info);
  }
  return SVGs;
}