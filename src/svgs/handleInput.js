const buildGraphs = require('./graphs.js');
const printMethod = require('../bluelines/handleInput.js');
const methodPractice = require('../practice/handleInput.js');
const staffNot = require('./staffnotation2.js');
const stages = require('../stages.json');
const buildplayer = require('./player.js');
const simulator = require('../simulator/router.js');

module.exports = function handleInput(methodInfo, compInfo, rowArray, displayInput, type) {
  //console.log("svgs/handleInput", compInfo.rowZeroObj);
  let results = {};
  let width = 270;
  if (type == 'grid') {
    let stageName = stages.find(o => o.num == methodInfo.stage).name;
    let info = {
      rowZeroObj: compInfo.rowZeroObj,
      placeNot: methodInfo.placeNot,
      numBells: methodInfo.stage,
      leadLength: methodInfo.leadLength,
      comp: compInfo.leadendcomp,
      hunts: compInfo.hunts
    };
    if (methodInfo.name == "Stedman "+stageName || methodInfo.name == "Erin "+stageName) {
      info.method = methodInfo.name.slice(0,4);
    }
    
    results.SVGs = printMethod(displayInput, info, rowArray);
  } else if (type == 'graph') {
    results.SVGs = buildGraphs(rowArray, width);
  } else if (type == 'practice') {
    let info = {
      rowZeroObj: compInfo.rowZeroObj,
      placeNot: methodInfo.placeNot,
      stage: methodInfo.stage,
      comp: compInfo.leadendcomp,
      hunts: compInfo.hunts
    };
    
    //info.huntbells = displayInput.huntbells;
    //info.bluebell = Number(displayInput.blueBell);
    //info.bluecolor = displayInput.blueBellc;
    let obj = methodPractice(rowArray, info, displayInput);
    results.SVGs = obj.svg;
    results.script = obj.script;
  } else if (type == 'staff') {
    results.SVGs = staffNot(compInfo.rowZeroObj, rowArray, methodInfo.stage, displayInput);
  } else if (type === "simulator") {
    let obj = simulator(methodInfo.stage+compInfo.tenors, rowArray, compInfo.rowZeroObj.bells, methodInfo);
    results.SVGs = obj.html;
    results.script = obj.script;
  }
  if (displayInput.player) {
    let r = buildplayer(methodInfo.stage+compInfo.tenors, displayInput, rowArray);
    results.script = r.script;
    results.player = r.player;
  }
  return results;
}