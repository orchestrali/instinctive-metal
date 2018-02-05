const buildLead = require('./oneLeadArray.js');
const rounds = require('../rounds.js');

var leadEnds = [
  {
    name: 'p',
    num: 0,
  },
  {
    name: 'b',
    num: 1,
  },
  {
    name: 's',
    num: 2,
  }
];


//placeNot is an array containing up to three arrays: plain lead PN, bob lead PN, and single lead PN
//composition is an array containing the quantity requested
//if composition[0] is 'touch' composition[1] should be an array of the leads in the touch (p, b, or s)
module.exports = function composition(placeNot, rowZero, composition, callLoc) {
  let numBells = rowZero.length;
  let roundsStr = rounds(numBells).join();
  let leadType = {
    name: 'p',
  };
 
  console.log('rounds', roundsStr);
  
  if (composition[0] == 'one-lead') {
    //console.log(buildLead(rowZero, placeNot[0], 1, numBells));
    return buildLead(rowZero, placeNot[0], 1, numBells, leadType);
  } else if (composition[0] == 'plain-course') {
    let leadhead = rowZero;
    let leadheadStr;
    let rowNum = 1;
    let rowArray = [];
    let i = 1;
    do {
      //build one lead of rows
      let oneLead = buildLead(leadhead, placeNot[0], rowNum, numBells, leadType);
      //new leadhead = last row of built lead, removing tenor if added
      leadhead = oneLead[oneLead.length - 1].bells.slice(0, numBells);
      leadheadStr = leadhead.join();
      rowNum = oneLead.length*i + 1;
      //console.log(i);
      i += 1;
      rowArray = rowArray.concat(oneLead);
      //console.log('leadhead', leadheadStr);
      //if the new leadhead is not rounds, repeat
    } while (leadheadStr != roundsStr && i < 20);
    
    //console.log(rowArray);
    return rowArray;
  } else if (composition[0] == 'touch') {
    let leadhead = rowZero;
    let rowNum = 1;
    let rowArray = [];
    
    for (var i = 0; i < composition[1].length; ++i) {
      let type = composition[1][i];
      leadType.name = type;
      leadType.callLoc = callLoc;
      let typeNum = leadEnds.find(o => o.name == composition[1][i]).num;
      let oneLead = buildLead(leadhead, placeNot[typeNum], rowNum, numBells, leadType);

      leadhead = oneLead[oneLead.length - 1].bells.slice(0, numBells);
      rowNum = oneLead.length*(i + 1) + 1;
      rowArray = rowArray.concat(oneLead);
    }
    return rowArray;
  }
}