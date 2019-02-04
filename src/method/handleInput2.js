const parsePN = require('../placeNot/parse.js');
const findMethod = require('../library/findMethod.js');
const callInfo = require('./callInfo.js');
const callPN = require('./callPN.js');
const addCalls = require('./addCalls.js');
var stedman

//was new file for getting methodInfo from xml files
module.exports = function methodInfo(methodInput) {
  //build methodInfo object with name, stage, place notations, lead length, call location(s)
  let methodInfo = {};
  let stage = Number(methodInput.stage);
  methodInfo.stage = stage;
  methodInfo.placeNot = {};
  //console.log(methodInput);
  
  if (methodInput.methodName) {
    //if the method is known, name, stage, unparsed plain PN, and lead length come from the files
    let knownMethod = findMethod(methodInput);
    methodInfo.name = knownMethod.name;
    methodInfo.placeNot.plain = parsePN(knownMethod.plainPN, stage);
    methodInfo.leadLength = knownMethod.leadLength;
  } else {
    methodInfo.placeNot.plain = parsePN(methodInput.placeNotation, stage);
    methodInfo.leadLength = methodInfo.placeNot.plain.length;
    methodInfo.name = '';
  }
  if (methodInfo.name.indexOf("Stedman") > -1 || methodInfo.name.indexOf("Erin") > -1) {
    //stedman(methodInput, methodInfo.name);
  }

  if (methodInput.callType != "cust") {
    //console.log("adding calls");
    let callInfo = addCalls(methodInput.callType, methodInfo.placeNot.plain, stage);
    methodInfo.placeNot.bob = callInfo.bobPN;
    methodInfo.placeNot.single = callInfo.singlePN;
    methodInfo.callLoc = callInfo.callLoc;
  } else if (methodInput.callType = "cust") {
    let calls = callInfo(methodInput, methodInfo.leadLength);
    methodInfo.callLoc = calls.callLoc;
    //add bob PN to PN object
    if (calls.bob) {
      methodInfo.placeNot.bob = callPN(methodInfo.placeNot.plain, calls.bob, calls.callLoc);
    } //add single PN to PN object
    if (calls.single) {
      methodInfo.placeNot.single = callPN(methodInfo.placeNot.plain, calls.single, calls.callLoc);
    }
  } else {
    methodInfo.callLoc = methodInfo.placeNot.plain.length;
  }
  
  return methodInfo;
}