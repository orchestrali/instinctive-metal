const places = require('../places.js');
const rowStr = require('../rowStr.js');
const buildLead = require('./buildLead2.js');

module.exports = function finish(rowArray, comp, methodInfo) {
  let plainleads = 0;
  let j = comp.length-1;
  while (comp[j] == "p") {
    plainleads++;
    j--;
  }
  let rowZero = rowArray[rowArray.length - 1].bells;
  let lastcallrow = rowStr(rowArray[rowArray.length - 1 - plainleads*methodInfo.leadLength]);
  let stage = methodInfo.stage;
  
  let rows = rowArray.slice(rowArray.length-methodInfo.leadLength*(plainleads+1)+methodInfo.callLoc-1);
  let round = rows.find(o => rowStr(o.bells) == places.substring(0, stage));
  
  if (round) {
    console.log("last call produced rounds");
    if (round.rowNum < rowArray.length) rowArray.splice(round.rowNum, rowArray.length-round.rowNum);
  } else {
    console.log("last call didn't produce rounds");
    let roundIndex = -1;
    do {
      comp.push('p');
      let lead = buildLead(rowZero, methodInfo.placeNot.plain, rowArray.length+1);
      roundIndex = lead.findIndex(o => rowStr(o.bells) == places.substring(0, stage));
      if (roundIndex > -1) {
        for (var i = 0; i <= roundIndex; i++) {
          rowArray.push(lead[i]);
        }
      } else {
        rowArray = rowArray.concat(lead);
        rowZero = rowArray[rowArray.length - 1].bells;
      }
    } while (roundIndex == -1 && rowStr(rowZero) != lastcallrow)
  }

  return {rows: rowArray, comp: comp};
  
}