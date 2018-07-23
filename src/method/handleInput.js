const parsePN = require('../placeNot/parse.js');
const findMethod = require('../findMethod.js');
const callInfo = require('./callInfo.js');
const callPN = require('./callPN.js');

module.exports = function methodInfo(methodInput) {
  //build methodInfo object with name, stage, place notations, lead length, call location(s)
  let methodInfo = {};
  let stage = Number(methodInput.stage);
  
  if (methodInput.methodName) {
    //if the method is known, all those things come from the files
    return findMethod(methodInput);
  } else {
    methodInfo.stage = stage;
    methodInfo.placeNot = {};
    methodInfo.placeNot.plain = parsePN(methodInput.placeNotation, stage);
    methodInfo.leadLength = methodInfo.placeNot.plain.length;
    methodInfo.name = '';
    
    if (methodInput.bobStart || methodInput.singleStart) {
      let calls = callInfo(methodInput);
      methodInfo.callLoc = calls.callLoc;
      //add bob PN to PN object
      if (calls.bob) {
        methodInfo.placeNot.bob = callPN(methodInfo.placeNot.plain, calls.bob, stage);
      } //add single PN to PN object
      if (calls.single) {
        methodInfo.placeNot.single = callPN(methodInfo.placeNot.plain, calls.single, stage);
      }
    } else {
      methodInfo.callLoc = 0;
    }
  }
  return methodInfo;
}