const addCalls = require('./addCalls.js');
const addTenor = require('./addTenor.js');
const addNames = require('./addLHs.js');
const stages = require('../stages.json');

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

module.exports = function handleInput(methodInfo, compInfo) {
  let rowArray;
  let comp = [];
  let stage = methodInfo.stage;
  let stageName = stages.find(o => o.num == stage).name;
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
  
  rowArray = addTenor(rowArray, compInfo.tenors);
  rowArray = addNames(rowArray, methodInfo.leadLength, methodInfo.leadLength-1, "leadhead");
  if (methodInfo.name == "Stedman " + stageName || methodInfo.name == "Erin " + stageName) {
    let start = methodInfo.name == "Stedman " + stageName ? 2 : 0;
    console.log("start "+start);
    rowArray = addNames(rowArray, 6, start, "new six");
  }
  
  return {array: rowArray, comp: comp};
}