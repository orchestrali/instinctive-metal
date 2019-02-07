const sortInput = require('./sortInput.js');
const checkError = require('./checkError.js');

const methodParse = require('./method/handleInput.js');
const compParse = require('./comp/handleInput.js');
const rowGen = require('./rowArray/handleInput2.js');
const buildSVGs = require('./svgs/handleInput.js');

const build = require('./buildPage2.js');

const stages = require('./stages.json');


module.exports = function directTraffic(input, type, cb) {
  let sortedInput = sortInput(input);
  let methodInput = sortedInput.methodInfo;
  let compInput = sortedInput.composition;
  let displayInput = sortedInput.display;
  let stage = Number(input.stage);
  let stageName = stages.find(o => o.num == stage).name;
  let width = 270;
  let SVGs;
  console.log(type);
  console.log(methodInput);
  //check for errors, first round; return page if there are any.
  let errResults = checkError(methodInput, compInput);
  let errors = errResults.errors;
  methodInput.nameLower = errResults.realName ? errResults.realName : null;
  if (errors.length > 0) {
    cb(build(errors, [], '', input, type));
    return;
  }
  
  //parse compInput
  let compInfo = compParse(compInput, stage);
  
  //parse methodInput, get methodInfo object
  let methodInfo; // = methodParse(methodInput);
  //return next();
  ///*
  methodParse(methodInput, (obj) => {
    methodInfo = obj;
    if (methodInfo.name) input.methodName = methodInfo.name.substring(0, methodInfo.name.length-stageName.length-1);
    //console.log('methodInfo', methodInfo);
    cb(next());
  });
  //*/
  //console.log(methodInfo);
  
  //second error check: not needed????
  
  function next() {
    //generate row array
    let r = rowGen(methodInfo, compInfo);
    let rowArray = r.array;
    compInfo.leadendcomp = r.comp;

    //console.log("row array: ", rowArray);
    //generate SVGs
    let results = buildSVGs(methodInfo, compInfo, rowArray, displayInput, type);
    SVGs = results.SVGs;
    let script = results.script;
    //buildpage
    let page = build([], SVGs, script, input, type);
    //console.log(page);
    return page;
  }
  
  /*
  if (type == 'grid') {
    return buildPageBL([], SVGs, input);
  } else if (type == 'graphs') {
    return buildPage([], SVGs, input);
  } else if (type == 'practice') {
    return buildPageP([], SVGs, input);
  } else if (type == 'staff') {
    return buildPageS([], SVGs, input);
  }
  */
}