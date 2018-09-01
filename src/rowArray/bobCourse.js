const buildLead = require('./buildLead.js');
const rounds = require('../rounds.js');

module.exports = function bobCourse(methodInfo, tenor) {
  let stage = methodInfo.stage;
  let roundsStr = rounds(stage).join();
  //starting states
  let leadheadStr;
  let rowArray = [];
  let i = 1;
  let leadInfo = {};
    leadInfo.rowZero = rounds(stage);
    leadInfo.placeNot = methodInfo.placeNot.bob;
    leadInfo.rowNum = 1;
    leadInfo.leadType = {name: 'b', callLoc: methodInfo.callLoc};
  leadInfo.tenor = tenor;
  do {
    //add one lead of rows
    rowArray = rowArray.concat(buildLead(leadInfo));
    //new leadhead = last row of built lead, removing tenor if added
    leadInfo.rowZero = rowArray[rowArray.length - 1].bells.slice(0, stage);
    leadheadStr = leadInfo.rowZero.join();
    leadInfo.rowNum = rowArray.length + 1;
    //console.log(i);
    i += 1;
    //console.log('leadhead', leadheadStr);
    //if the new leadhead is not rounds, repeat
  } while (leadheadStr != roundsStr && i < 20);
 
    //console.log(rowArray);
    return rowArray;
}