const handlePaths = require('./handlePaths.js');
const ungroupPaths = require('./pathsToBuild.js');
const printMethod = require('./printMethod.js');
const pagedSVGs = require('./pagedPrint.js');

module.exports = function handleInput(displayInput, info, rowArray) {
  let rowZeroObj = info.rowZeroObj;
  console.log('rowZeroObj', rowZeroObj);
  
  //add tenor to odd-bell methods
      if (info.numBells % 2 == 1) {
        rowZeroObj.bells.push(info.numBells + 1);
      }
      rowArray.unshift(rowZeroObj);
      console.log(rowArray[0]);
  let pathArray = ungroupPaths(handlePaths(displayInput, info.plainPN, info.numBells), rowArray);
  //console.log(pathArray);
  
  if (displayInput.pagination) {
        let svgs = pagedSVGs(rowArray, pathArray, info);
        return svgs;
      } else {
        let methodSVGs = printMethod(rowArray, pathArray, info);
        return methodSVGs;
      }
}