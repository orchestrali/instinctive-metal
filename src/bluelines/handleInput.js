const handlePaths = require('./handlePaths.js');
const ungroupPaths = require('./pathsToBuild.js');
const printMethod = require('./printMethod.js');
const pagedSVGs = require('./pagedPrint.js');

module.exports = function handleInput(input, info, rowArray) {
  let rowZeroObj = {};
      rowZeroObj.rowNum = 0;
      rowZeroObj.bells = info.rowZero;
      if (info.numBells % 2 == 1) {
        rowZeroObj.bells.push(info.numBells + 1);
      }
      rowArray.unshift(rowZeroObj);
      //console.log(rowArray);
  let pathArray = ungroupPaths(handlePaths(input, info.plainPN, info.numBells), rowArray);
  console.log(pathArray);
  
  if (input.pagination) {
        let svgs = pagedSVGs(rowArray, pathArray, info.leadLength);
        return svgs;
      } else {
        let methodSVGs = printMethod(rowArray, pathArray);
        return methodSVGs;
      }
}