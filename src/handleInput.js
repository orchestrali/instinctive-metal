const sortInput = require('./sortInput.js');
const checkError = require('./checkError.js');

const methodParse = require('./method/handleInput.js');
const compParse = require('./comp/handleInput.js');
const rowGen = require('./rowArray/handleInput2.js');
const buildSVGs = require('./svgs/handleInput.js');

const build = require('./buildPage2.js');


module.exports = function directTraffic(input, type, cb) {
  let sortedInput = sortInput(input);
  let methodInput = sortedInput.methodInfo;
  let compInput = sortedInput.composition;
  let displayInput = sortedInput.display;
  let stage = Number(input.stage);
  let width = 270;
  let SVGs;
  console.log(type);
  //console.log(compInput);
  //check for errors, first round; return page if there are any.
  let errors = checkError(methodInput, compInput);
  if (errors.length > 0) {
    return build(errors, [], '', input, type);
  }
  
  //parse compInput
  let compInfo = compParse(compInput, stage);
  
  //parse methodInput, get methodInfo object
  let methodInfo; // = methodParse(methodInput);
  //return next();
  ///*
  methodParse(methodInput, (obj) => {
    methodInfo = obj;
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