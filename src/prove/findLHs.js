const findMethod = require('../library/findMethod.js');
const rounds = require('../rounds.js');
const parsePN = require('../placeNot/parse.js');
const buildLead = require('../rowArray/buildLead2.js');

const rowNumGroups = [{rowNums: [2,21,23,24]},{rowNums: [1,3,20,22]},{rowNums: [4,6,17,19]},{rowNums: [5,7,16,18]},{rowNums: [8,10,13,15]},{rowNums: [9,11,12,14]}];

//given two methods, find the leadheads of the second that produce the rows in the first lead of the first
module.exports = function findLHs(input1, input2) {
  //get each method
  let method1 = findMethod(input1);
  //console.log(method1);
  let method2 = findMethod(input2);
  //get plain place notation
  let pn1 = parsePN(method1.plainPN, method1.stage);
  let pn2 = parsePN(method2.plainPN, method2.stage);
  
  //build row arrays
  let rowArray1 = buildLead(rounds(method1.stage), pn1, 1);
  let rowArray2 = buildLead(rounds(method2.stage), pn2, 1);
  
  let LHArray = [];
  
  for (var i = 0; i < rowArray1.length; ++i) {
    let rowNum = rowArray1[i].rowNum;
    let rowNumGroup = rowNumGroups.find(o => o.rowNums.includes(rowNum)).rowNums;
    let rowA = rowArray1[i].bells;
    let bRows = [];
    for (var j = 0; j < 4; ++j) {
      bRows.push(rowArray2[rowNumGroup[j]-1].bells);
    }
    
    let LHs = [];
    for (var k = 0; k < bRows.length; ++k) {
      let rowB = bRows[k];
      let LH = "1";
      for (var l = 2; l < 7; ++l) {
        let n = rowB.indexOf(l);
        let x = rowA[n];
        LH += x;
      }
      LHs.push(LH);
    }
    
    LHArray.push(LHs);
  }
  
  return LHArray;
}