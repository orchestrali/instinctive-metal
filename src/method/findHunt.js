const rounds = require('../rounds.js');
const buildLead = require('../rowArray/buildLead.js');

var leadInfo = {leadType: {}, rowNum: 1};

module.exports = function findHuntBells(plainPN, numBells) {
  leadInfo.rowZero = rounds(numBells);
  leadInfo.placeNot = plainPN;
  let rowZero = rounds(numBells);
  let rowArray = buildLead(leadInfo);
  let huntBells = [];
  
  let lastRow = rowArray[rowArray.length - 1].bells;
  
  for (var i = 0; i < numBells; ++i) {
    if (lastRow[i] == rowZero[i]) {
      huntBells.push(rowZero[i]);
    }
  }
  //console.log('huntBells: ', huntBells);
  return huntBells;
}