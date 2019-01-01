const addCalls = require('./addCalls.js');
const addTenor = require('./addTenor.js');

const inputs = [
  {
    name: 'onelead',
    file: './buildLead2.js',
    pn: 'plain'
  },
  {
    name: 'plaincourse',
    file: './buildCourse.js',
    pn: 'plain'
  },
  {
    name: 'leadend',
    file: './leadEnd.js'
  },
  {
    name: 'callplace',
    file: './callplace.js'
  }
];

module.exports = function handleInput(methodInfo, compInfo, tenor) {
  let rowArray;
  let comp;
  //console.log('bob pn length', methodInfo.placeNot.bob.length);
  
  if (compInfo.quantity != 'touch') {
    let path = inputs.find(o => o.name == compInfo.quantity).file;
    let f = require(path);
    rowArray = f(compInfo.rowZero, methodInfo.placeNot.plain, 1);
  } else {
    let path = inputs.find(o => o.name == compInfo.touchType).file;
    let f = require(path);
    //console.log('function: ', f);
    let results = f(methodInfo, compInfo);
    rowArray = results.rows;
    comp = results.comp;
    //console.log(methodInfo);
    let arr = addCalls(rowArray, comp, methodInfo.leadLength, methodInfo.callLoc);
    rowArray = arr;
  }
  
  if (tenor == 'yes' && methodInfo.stage % 2 == 1) {
    rowArray = addTenor(rowArray, methodInfo.stage+1);
  }
  return rowArray;
}