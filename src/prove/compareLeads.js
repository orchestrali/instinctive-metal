const findMethod = require('../library/findMethod.js');
const rounds = require('../rounds.js');
const parsePN = require('../placeNot/parse.js');
const buildLead = require('../rowArray/buildLead.js');

/*
var input1 = {
  stage: 6,
  methodClass: "Surprise",
  methodName: "Cambridge Surprise"
};

var input2 = {
  stage: 6,
  methodClass: "Surprise",
  methodName: "London Surprise"
};
*/

//given two methods, determine how many rows they share in the first lead of a plain course
module.exports = function compareLeads(input1, input2) {
  //get methods
  console.log("input1 again:", input1);
  let method1 = findMethod(input1);
  //console.log(method1);
  let method2 = findMethod(input2);
  let pn1 = parsePN(method1.plainPN, method1.stage);
  let pn2 = parsePN(method2.plainPN, method2.stage);
  //console.log("pn1", pn1);
  
  //build row arrays
  let leadInfo = {};
    leadInfo.rowZero = rounds(input1.stage);
    leadInfo.placeNot = pn1;
    leadInfo.rowNum = 1;
    leadInfo.leadType = {name: 'p'};
    leadInfo.tenor = "no";
  let rowArray1 = buildLead(leadInfo);
  //console.log("rowArray1", rowArray1);
  
  leadInfo.placeNot = pn2;
  let rowArray2 = buildLead(leadInfo);
  
  //compare row arrays
  let numSame = 0;
  let commonRows = [];
  for (var i = 0; i < rowArray1.length; ++i) {
    let method1row = rowArray1[i].bells.join('');
    
    for (var j = 0; j < rowArray2.length; ++j) {
      let method2row = rowArray2[j].bells.join('');
      if (method1row == method2row) {
        numSame++;
        commonRows.push(rowArray1[i].bells);
      }
    }
  }
  
  return {numSame: numSame, commonRows: commonRows};
}