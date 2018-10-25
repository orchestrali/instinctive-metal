const buildLead = require("./buildLead.js");
const rounds = require('../rounds.js');

module.exports = function firstPlainLead(placeNot, stage) {
  let leadInfo = {};
  leadInfo.placeNot = placeNot;
  leadInfo.rowNum = 1;
  leadInfo.rowZero = rounds(stage)
  leadInfo.leadType = {};
  leadInfo.leadType.name = "plain";
  leadInfo.tenor = "no";
  let rowArray = buildLead(leadInfo);
  
  return rowArray;
}