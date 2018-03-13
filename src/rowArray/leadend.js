const buildLead = require('./buildLead.js');

var leadEnds = [
  {
    name: 'p',
    fullname: 'plain'
  },
  {
    name: 'b',
    fullname: 'bob'
  },
  {
    name: 's',
    fullname: 'single'
  }
];

module.exports = function leadend(methodInfo, compInfo) {
  let stage = methodInfo.stage;
  let touch = compInfo.touch;
  
  let leadInfo = {};
    leadInfo.rowZero = compInfo.rowZero;
    leadInfo.placeNot;
    leadInfo.rowNum = 1;
    leadInfo.leadType = {};
  
  let rowArray = [];
  
  for (var i = 0; i < touch.length; ++i) {
    let type = touch[i];
    let typeName = leadEnds.find(o => o.name == type).fullname;
    leadInfo.leadType.name = type;
    leadInfo.leadType.callLoc = methodInfo.callLoc;
    leadInfo.placeNot = methodInfo.placeNot[typeName];
    
    let oneLead = buildLead(leadInfo);
    //new leadhead = last row of built lead, removing tenor if added
    leadInfo.rowZero = oneLead[oneLead.length - 1].bells.slice(0, stage);
    leadInfo.rowNum = oneLead.length*(i+1) + 1;
    rowArray = rowArray.concat(oneLead);
  }
  
  return rowArray;
}