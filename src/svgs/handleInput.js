const buildGraphs = require('./graphs.js');
const printMethod = require('../bluelines/handleInput.js');
const methodPractice = require('../practice/handleInput.js');
const staffNot = require('./staffnotation2.js');

module.exports = function handleInput(methodInfo, compInfo, rowArray, displayInput, type) {
  let results = {};
  results.script = '';
  let width = 270;
  if (type == 'grid') {
    let info = {
      rowZeroObj: compInfo.rowZeroObj,
      placeNot: methodInfo.placeNot,
      numBells: methodInfo.stage,
      leadLength: methodInfo.leadLength,
      comp: compInfo.leadendcomp
    };
    if (methodInfo.name.indexOf('Stedman') > -1 || methodInfo.name.indexOf('Erin') > -1) {
      info.method = methodInfo.name.slice(0,4);
    }
    
    results.SVGs = printMethod(displayInput, info, rowArray);
  } else if (type == 'graphs') {
    results.SVGs = buildGraphs(rowArray, width);
  } else if (type == 'practice') {
    let info = {
      rowZeroObj: compInfo.rowZeroObj,
      placeNot: methodInfo.placeNot,
      stage: methodInfo.stage,
      comp: compInfo.leadendcomp,
    };
    
    //info.huntbells = displayInput.huntbells;
    //info.bluebell = Number(displayInput.blueBell);
    //info.bluecolor = displayInput.blueBellc;
    let obj = methodPractice(rowArray, info, displayInput);
    results.SVGs = obj.svg;
    results.script = obj.script;
  } else if (type == 'staff') {
    results.SVGs = staffNot(compInfo.rowZeroObj, rowArray, methodInfo.stage, displayInput);
  }
  return results;
}