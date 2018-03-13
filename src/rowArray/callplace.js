const buildLead = require('./buildLead.js');

var leadEnds = [{name: 'b',fullname: 'bob'},{name: 's',fullname: 'single'}];

var testCallPos = [{placebell: 2, bobname: 'i', singlename: 3},{placebell: 4, bobname: 'h', singlename: 'h'},{placebell: 6, bobname: 'w', singlename: 'w'},{placebell: 5, bobname: 4, singlename: 4},{placebell: 3, bobname: 'b', singlename: 2}]

module.exports = function callplace(methodInfo, compInfo) {
  let rowArray = [];
  //set up leadInfo
  let leadInfo = {};
    leadInfo.rowZero = compInfo.rowZero;
    leadInfo.placeNot;
    leadInfo.rowNum = 1;
    leadInfo.leadType = {};
  let obsBell = compInfo.obsBell;
  let stage = methodInfo.stage;
  let j = 1;
  //loop through touch
  for (var i = 0; i < compInfo.touch.length; ++i) {
    let type = compInfo.touch[i].call;
    let pos = compInfo.touch[i].value;
    //get call name & place bell correspondences from somewhere
    let callPos;
    //while obsBell's place is not the place of the current call type & position
    while (leadInfo.rowZero.indexOf(obsBell) != callPos.find(o => o[type + 'name'] == pos).placebell) {
      leadInfo.placeNot = methodInfo.placeNot.plain;
      //generate a lead and update leadInfo
      rowArray = rowArray.concat(buildLead(leadInfo));
      //new leadhead = last row of built lead, removing tenor if added
      leadInfo.rowZero = rowArray[rowArray.length - 1].bells.slice(0, stage);
      leadInfo.rowNum = rowArray.length + 1;
    }
    leadInfo.placeNot = methodInfo.placeNot[leadEnds.find(o => o.name == type).fullname];
    rowArray = rowArray.concat(buildLead(leadInfo));
    //new leadhead = last row of built lead, removing tenor if added
    leadInfo.rowZero = rowArray[rowArray.length - 1].bells.slice(0, stage);
    leadInfo.rowNum = rowArray.length + 1;
  }
  return rowArray;
}