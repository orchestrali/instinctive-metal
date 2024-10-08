const handlePaths = require('./handlePaths.js');
const ungroupPaths = require('./pathsToBuild.js');
const printMethod = require('./printMethod.js');
const pagedSVGs = require('./pagedPrint.js');
const addinstruct = require('../tutorial/test.js');

module.exports = function handleInput(displayInput, info, rowArray) {
  let rowZeroObj = info.rowZeroObj;
  //console.log('info.comp', info.comp);
  
  //add tenor to odd-bell methods
  /*
  if (info.numBells % 2 == 1) {
    rowZeroObj.bells.push(info.numBells + 1);
  }
   */
  rowArray.unshift(rowZeroObj);
  if (displayInput.describe) {
    addinstruct(rowArray, Number(displayInput.blueBell), info.numBells, info.hunts);
  }
  //console.log(rowArray[0]);
  let pathArray = ungroupPaths(handlePaths(displayInput, info), rowArray);
  //console.log(pathArray);
  info.displayPN = displayInput.pn;
  if (displayInput.numbers) {
    info.displayNums = true;
  } else {
    info.displayNums = false;
  }
  if (displayInput.pagination) {
    let svgs = pagedSVGs(rowArray, pathArray, info);
    return svgs;
  } else {
    let methodSVGs = printMethod(rowArray, pathArray, info);
    return methodSVGs;
  }
}