const buildLead = require('./buildLead.js');
const callPlaces = require("../method/callplaces.js");
const rounds = require("../rounds.js");
const buildInfo = require("./leadInfo.js");

var leadEnds = [{name: 'b',fullname: 'bob'},{name: 's',fullname: 'single'}];

var testCallPos = [{placebell: 2, bobname: 'i', singlename: 3},{placebell: 4, bobname: 'h', singlename: 'h'},{placebell: 6, bobname: 'w', singlename: 'w'},{placebell: 5, bobname: 4, singlename: 4},{placebell: 3, bobname: 'b', singlename: 2}]

module.exports = function callplace(methodInfo, compInfo, tenor) {
  let rowArray = [];
  let rowZero = compInfo.rowZero;
  let info = {callLoc: methodInfo.callLoc, tenor: tenor}
  let obsBell = compInfo.obsBell;
  let stage = methodInfo.stage;
  //get call name & place bell correspondences from somewhere
  let callPos = callPlaces(methodInfo);
  //loop through touch
  for (var i = 0; i < compInfo.touch.length; ++i) {
    let type = compInfo.touch[i].call;
    let typename = leadEnds.find(o => o.name == type).fullname;
    let pos = compInfo.touch[i].value;
    
    
    //console.log(callPos);
    //console.log(pos, type);
    //console.log(callPos.find(o => o[type + 'name'] == pos));
    //while obsBell's place is not the place of the current call type & position
    while (rowZero.indexOf(obsBell)+1 != callPos.find(o => o[typename + 'name'] == pos).placebell) {
      let lead = buildInfo(methodInfo.placeNot.plain, rowArray.length+1, rowZero, "p", info);
      //generate a plain lead
      rowArray = rowArray.concat(lead);
      //new leadhead = last row of built lead, removing tenor if added
      rowZero = rowArray[rowArray.length - 1].bells.slice(0, stage);
    }
    
    let placeNot = methodInfo.placeNot[typename];
    let callLead = buildInfo(placeNot, rowArray.length+1, rowZero, type, info);
    //console.log(leadInfo);
    rowArray = rowArray.concat(callLead);
    //new leadhead = last row of built lead, removing tenor if added
    rowZero = rowArray[rowArray.length - 1].bells.slice(0, stage);
  }
  let lastcallrow = rowArray[rowArray.length - 1].bells.slice(0, stage).join('');
  //add plain leads after the last call lead
  if (lastcallrow == rounds(stage).join('')) {
    console.log("last call produced rounds")
    return rowArray;
  } else {
    console.log("last call didn't produce rounds");
    do {
      let lead = buildInfo(methodInfo.placeNot.plain, rowArray.length+1, rowZero, "p", info);
      rowArray = rowArray.concat(lead);
      rowZero = rowArray[rowArray.length - 1].bells.slice(0, stage);

    } while (rowZero.join('') != rounds(stage).join('') && rowZero.join('') != lastcallrow)
    return rowArray;
  }
}