const buildLead = require('./buildLead.js');
const rounds = require('../rounds.js');

module.exports = function plainCourse(methodInfo, tenor) {
  let stage = methodInfo.stage;
  let roundsStr = rounds(stage).join();
  //starting states
  let leadheadStr;
  let rowArray = [];
  let i = 1;
  let leadInfo = {};
    leadInfo.rowZero = rounds(stage);
    leadInfo.placeNot = methodInfo.placeNot.plain;
    leadInfo.rowNum = 1;
    leadInfo.leadType = {name: 'p'};
  leadInfo.tenor = tenor;
  do {
    //build one lead of rows
    let oneLead = buildLead(leadInfo);
    //new leadhead = last row of built lead, removing tenor if added
    leadInfo.rowZero = oneLead[oneLead.length - 1].bells.slice(0, stage);
    leadheadStr = leadInfo.rowZero.join();
    leadInfo.rowNum = oneLead.length*i + 1;
    //console.log(i);
    i += 1;
    rowArray = rowArray.concat(oneLead);
    //console.log('leadhead', leadheadStr);
    //if the new leadhead is not rounds, repeat
  } while (leadheadStr != roundsStr && i < 20);
 
    //console.log(rowArray);
    return rowArray;
}