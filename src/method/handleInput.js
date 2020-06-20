const parsePN = require('../placeNot/parse.js');
const findMethod = require('../library/findOneOrMany.js');
const buildMethod = require('../library/buildMethod2.js');
const callInfo = require('./callInfo.js');
const callPN = require('./callPN.js');
const addCalls = require('./addCalls.js');
const stages = require('../stages.json');
var stedman

//originally this file was for finding methods in my hand-typed json files
//now it's for getting methods from mongodb via vivacious-port
module.exports = function methodInfo(methodInput, cb) {
  //build methodInfo object with name, stage, place notations, lead length, call location(s)
  let methodInfo = {};
  let stage = Number(methodInput.stage);
  let stageName = stages.find(o => o.num == stage).name;
  methodInfo.stage = stage;
  methodInfo.placeNot = {};
  //console.log(methodInput);
  
  if (methodInput.methodName) {
    methodInfo.name = methodInput.nameLower ? methodInput.nameLower : methodInput.methodName + ' ' + stageName;
    //if the method is known, name, stage, parsed plain PN, and lead length come from the database
    let knownMethod;
    let amp = /&(?!=amp)/gi;
    //.replace(amp, "&amp;")
    findMethod({title: {$regex: "^" +methodInfo.name.toLowerCase(), $options: 'i'}}, '', (err, res) => {
      //console.log(res);
      if (!err) {
        knownMethod = buildMethod(res);
        methodInfo.name = knownMethod.name;
        methodInfo.placeNot.plain = knownMethod.plainPN;
        methodInfo.leadLength = knownMethod.leadLength;
        next();
      } else {
        console.log('find method error');
        cb(err);
      }
      
    });
    
  } else {
    methodInfo.placeNot.plain = parsePN(methodInput.placeNotation, stage);
    methodInfo.leadLength = methodInfo.placeNot.plain.length;
    methodInfo.name = '';
    next();
  }
  
  function next() {
    if (methodInfo.name == "Stedman " + stageName || methodInfo.name == "Erin " + stageName) {
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

    cb(null, methodInfo);
  }
  
}