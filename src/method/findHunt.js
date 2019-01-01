const rounds = require('../rounds.js');
const buildLead = require('../rowArray/buildLead2.js');

module.exports = function findHuntBells(plainPN, numBells) {

  let rowZero = rounds(numBells);
  let rowArray = buildLead(rounds(numBells),plainPN, 1);
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