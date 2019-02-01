const rounds = require('../rounds.js');
const buildLead = require('../rowArray/buildLead2.js');

module.exports = function findHuntBells(pns, numBells, comp) {
  let placeNot;
    if (comp.indexOf("b") == -1 && comp.indexOf("s") == -1) {
      placeNot = pns.plain;
    } else if (comp.indexOf("s") > -1 && comp.indexOf("b") == -1) {
      placeNot = pns.single;
    } else {
      placeNot = pns.bob;
    }

  let rowZero = rounds(numBells);
  let rowArray = buildLead(rounds(numBells), placeNot, 1);
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