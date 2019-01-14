const buildLead = require('./buildLead2.js');
const rounds = require('../rounds.js');

//given a starting row, place notation, and row number, build leads until rounds or the starting row is reached
module.exports = function buildCourse(rowZero, pn, rowNum) {
  let rowArray = [];
  let stage = rowZero.length;
  let roundsStr = rounds(stage).join('');
  let rowZeroStr = rowZero.join('');
  let ll = pn.length;
  let i = 1;
  let lastrow;
  
  do {
    let lead = buildLead(rowZero, pn, rowNum);
    
    rowZero = lead[lead.length-1].bells;
    rowNum += ll*i;
    rowArray = rowArray.concat(lead);
    lastrow = rowZero.join('');
    
  } while (lastrow != roundsStr && lastrow != rowZeroStr)
  
    return rowArray;
}