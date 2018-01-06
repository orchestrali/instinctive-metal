const buildLead = require('./oneLeadArray.js');
const rounds = require('../rounds.js');

module.exports = function composition(placeNot, rowZero, composition) {
  let numBells = rowZero.length;
  let roundsStr = rounds(numBells).join();
 
  console.log('rounds', roundsStr);
  
  if (composition[0] == 'one-lead') {
    console.log(buildLead(rowZero, placeNot[0], 1));
    return buildLead(rowZero, placeNot[0], 1);
  } else if (composition[0] == 'plain-course') {
    let leadhead = rowZero;
    let leadheadStr;
    let rowNum = 1;
    let rowArray = [];
    let i = 1;
    do {
      let oneLead = buildLead(leadhead, placeNot[0], rowNum, numBells);
      leadhead = oneLead[oneLead.length - 1].bells.slice(0, numBells);
      leadheadStr = leadhead.join();
      rowNum = oneLead.length*i + 1;
      //console.log(i);
      i += 1;
      rowArray = rowArray.concat(oneLead);
      //console.log('leadhead', leadheadStr);
      //  
    } while (leadheadStr != roundsStr && i < 20);
    
    //console.log(rowArray);
    return rowArray;
  } else if (composition[0] == 'touch') {
    let leadhead = rowZero;
    let rowNum = 1;
    let rowArray = [];
    
    for (var i = 0; i < composition[1].length; ++i) {
      let type = composition[1][i];
      let oneLead;
      if (type == 'p') {
        oneLead = buildLead(leadhead, placeNot[0], rowNum, numBells);
      } else if (type == 'b') {
        oneLead = buildLead(leadhead, placeNot[1], rowNum, numBells);
      } else if (type == 's') {
        oneLead = buildLead(leadhead, placeNot[2], rowNum, numBells);
      }
      leadhead = oneLead[oneLead.length - 1].bells.slice(0, numBells);
      rowNum = oneLead.length*(i + 1) + 1;
      rowArray = rowArray.concat(oneLead);
    }
    return rowArray;
  }
}