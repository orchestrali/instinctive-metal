const methodSetArray = require('./methodSetArray.js');
const methodArray = require('./methodArray.js');
const stages = require('../stages.js');


module.exports = function findMethod(input) {
  var stage = Number(input.stage);
  var methodClass = input.methodClass;
  var methodName = input.methodName;
  let stageName = stages.find(o => o.num == stage).name;
  let filter = {};
  
  if (methodClass == "Plain") {
    filter.plain = true;
    filter.class = "none";
  } else {
    filter.class = methodClass;
  }
  
  let methodSet = methodSetArray(stage, filter);
  let methods = methodArray(methodSet);
  
  let methodObj = methods.find(o => o.name == methodName + " " + stageName);
  return methodObj;
  
}