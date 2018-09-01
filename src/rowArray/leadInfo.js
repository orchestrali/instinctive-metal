const buildLead = require("./buildLead.js");

module.exports = function leadInfo(placeNot, rowNum, rowZero, type, info) {
  let leadInfo = {};
  leadInfo.placeNot = placeNot;
  leadInfo.rowNum = rowNum;
  leadInfo.rowZero = rowZero;
  leadInfo.leadType = {};
  leadInfo.leadType.name = type;
  leadInfo.leadType.callLoc = info.callLoc;
  leadInfo.tenor = info.tenor;
  let stage = rowZero.length;
  let rowArray = buildLead(leadInfo);
  
  return rowArray;
}