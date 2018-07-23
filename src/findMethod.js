

module.exports = function findMethod(input) {
  var stage = Number(input.stage);
  var methodClass = input.methodClass;
  var methodName = input.methodName;
  var classes = [];
  var methods = [];
  var file = require('../methods' + stage + '.json');
  var placeNot = {};
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
      placeNot.plain = method.plainPN;
    } else {
      placeNot.plain = method.plainPN; 
      placeNot.bob = method.bobPN;
      placeNot.single = method.singlePN;
    }
  }
  output.name = methodName;
  output.stage = stage;
  output.placeNot = placeNot;
  output.methods = methods;
  output.classes = classes;
  output.callLoc = callLoc;
  output.leadLength = leadLength;
  return output;
}