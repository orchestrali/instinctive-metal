const buildLead = require('./buildLead2.js');
const callPlaces = require("../method/callplaces.js");
const rounds = require("../rounds.js");
const places = require('../places.js');
const rowStr = require('../rowStr.js');
const finish = require('./finish.js');

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
  //console.log(compInfo.touch);
  let comp = [];
  //loop through touch
  for (var i = 0; i < compInfo.touch.length; ++i) {
    let type = compInfo.touch[i].call;
    let typename = leadEnds.find(o => o.name == type).fullname;
    let pos = compInfo.touch[i].value;
    
    
    //while obsBell's place is not the place of the current call type & position
    while (rowZero.indexOf(obsBell)+1 != callPos.find(o => o[typename + 'name'] == pos).placebell) {
      let lead = buildLead(rowZero, methodInfo.placeNot.plain, rowArray.length+1);
      //generate a plain lead
      rowArray = rowArray.concat(lead);
      //new leadhead = last row of built lead
      rowZero = rowArray[rowArray.length - 1].bells;
      comp.push('p');
    }
    //when obsBell's place IS the place of the current call position
    let placeNot = methodInfo.placeNot[typename];
    let callLead = buildLead(rowZero, placeNot, rowArray.length+1);
    comp.push(type);
    //console.log(leadInfo);
    rowArray = rowArray.concat(callLead);
    //new leadhead = last row of built lead
    rowZero = rowArray[rowArray.length - 1].bells;
  }
  //let lastcallrow = rowStr(rowArray[rowArray.length - 1].bells);
  //add plain leads after the last call lead
  /*
  if (lastcallrow == places.substring(0, stage)) {
    console.log("last call produced rounds")
    return {rows: rowArray, comp: comp};
  } else {
    console.log("last call didn't produce rounds");
    do {
      let lead = buildLead(rowZero, methodInfo.placeNot.plain, rowArray.length+1);
      rowArray = rowArray.concat(lead);
      rowZero = rowArray[rowArray.length - 1].bells;
      comp.push('p');

    } while (rowZero.join('') != rounds(stage).join('') && rowZero.join('') != lastcallrow)
    return {rows: rowArray, comp: comp};
  }
  */

  return {rows: rowArray, comp: comp};
  //return finish(rowArray, comp, methodInfo);
}