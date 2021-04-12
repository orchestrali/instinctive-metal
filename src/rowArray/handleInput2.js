const addCalls = require('./addCalls.js');
const addTenor = require('./addTenor.js');
const addNames = require('./addLHs.js');
const stages = require('../stages.json');
const numbers = require('./numbers.js');
const finish = require('./finish.js');

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
  },
  {
    name: 'numbers',
    file: './leadEnd.js'
  }
];

module.exports = function handleInput(methodInfo, compInfo) {
  let rowArray;
  let comp = [];
  let stage = methodInfo.stage;
  let stageName = stages.find(o => o.num == stage).name;
  //console.log('bob pn length', methodInfo.placeNot.bob.length);
  //console.log("rowArray handleInput", compInfo.rowZero);
  
  if (compInfo.quantity != 'touch') {
    //build one lead or plain course
    let path = inputs.find(o => o.name == compInfo.quantity).file;
    let f = require(path);
    rowArray = f(compInfo.rowZero, methodInfo.placeNot.plain, 1);
  } else {
    let path;
    if (methodInfo.name == "Stedman "+stageName) {
      methodInfo.stedman = true;
      path = './stedman.js';
    } else {
      path = inputs.find(o => o.name == compInfo.touchType).file;
    }
    let f = require(path);
    let comp = compInfo.touchType == 'numbers' ? numbers(compInfo) : null;
    //console.log('function: ', f);
    let results = f(methodInfo, compInfo, comp);
    let results2 = finish(results.rows, results.comp, methodInfo);
    rowArray = results2.rows;
    comp = results2.comp;
    //console.log(methodInfo);
    if (methodInfo.name == "Stedman "+stageName) {
      addCalls(rowArray, comp, 6, stage == 5 ? 6 : 3);
    } else {
      addCalls(rowArray, comp, methodInfo.leadLength, methodInfo.callLoc);
    }
    //console.log("later", rowArray);
  }
  let hunts = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16].slice(0,stage);
  for (let i = methodInfo.leadLength-1; i < rowArray.length; i+=methodInfo.leadLength ) {
    for (let b = 1; b <= stage; b++) {
      if (hunts.includes(b) && rowArray[i].bells.indexOf(b) !== compInfo.rowZero.indexOf(b)) {
        let j = hunts.indexOf(b);
        hunts.splice(j, 1);
      }
    }
  }
  
  
  addTenor(stage, rowArray, compInfo.tenors);
  
  addNames(rowArray, methodInfo.leadLength, methodInfo.leadLength-1, "leadhead");
  if (methodInfo.name == "Stedman " + stageName || methodInfo.name == "Erin " + stageName) {
    let start = methodInfo.name == "Stedman " + stageName ? 2 : 0;
    //console.log("start "+start);
    addNames(rowArray, 6, start, "new six");
  }
  
  return {array: rowArray, comp: comp, hunts: hunts};
}