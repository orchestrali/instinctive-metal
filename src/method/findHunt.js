const rounds = require('../rounds.js');
const buildLead = require('../rowArray/buildLead2.js');
const leadNames = [{letter: "p", name: "plain"},{letter: "b", name: "bob"}, {letter: "s", name: "single"}];

module.exports = function findHuntBells(pns, numBells, comp) {
  
  let pLead = buildLead(rounds(numBells), pns.plain, 1);
  let pHunts = testHunts(pLead, numBells);
  
  let leads = [];
  if (comp.indexOf("b") > -1) leads.push("b");
  if (comp.indexOf("s") > -1) leads.push("s");
  
  for (var i = 0; i < leads.length; i++) {
    let pn = leadNames.find(o => o.letter == leads[i]).name;
    let lead = buildLead(rounds(numBells), pns[pn], 1)
    let hunts = testHunts(lead, numBells);
    let j = 0;
    do {
      if (hunts.indexOf(pHunts[j]) == -1) {
        pHunts.splice(j, 1);
      } else {
        j++;
      }
    } while (j < pHunts.length)
  }
  
  
  return pHunts;
}

function testHunts(rowArray, stage) {
  let rowZero = rounds(stage);
  let lastRow = rowArray[rowArray.length - 1].bells;
  let hunts = [];
  for (var i = 0; i < stage; ++i) {
    if (lastRow[i] == rowZero[i]) {
      hunts.push(rowZero[i]);
    }
  }
  
  return hunts;
}