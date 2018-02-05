

module.exports = function findMethod(input) {
  var stage = input.stage;
  var methodClass = input.methodClass;
  var methodName = input.methodName;
  var classes = [];
  var methods = [];
  var file = require('../methods' + stage + '.json');
  var placeNot = '';
  var callLoc;
  var leadLength;
  let output = {};
  
  for (var i = 0; i < file.length; ++i) {
    classes.push(file[i].class);
  };
  
  
  //console.log(methods);
  if (input.methodName != undefined && input.methodName != '') {
    
    methods = file.find(o => o.class == methodClass).methods;
    var method = methods.find(o => o.name == methodName);
    callLoc = method.callLoc;
    leadLength = method.leadLength;
  
    if (Number(stage) == 4) {
      placeNot = [method.plainPN];
    } else {
      placeNot = [method.plainPN, method.bobPN, method.singlePN];
    }
  }
  output.placeNot = placeNot;
  output.methods = methods;
  output.classes = classes;
  output.callLoc = callLoc;
  output.leadLength = leadLength;
  return output;
}