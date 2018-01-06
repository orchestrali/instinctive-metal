const parsePN = require('../parsePlaceNotation.js');

module.exports = function touchPN(completePN, callInfo, numBells) {
  var plainPN = completePN[0];
  if (callInfo == 'none') {
    completePN.push([]);
    return [[], completePN];
  } else {
  
    console.log('call placeNot tokens', callInfo.placeNot);
    var error = [];
    var callPN = parsePN(callInfo.placeNot, numBells);
    var callLead = [];

    if (plainPN.length % callInfo.howOften != 0) {
      error.push("Error: inconsistent call location");
      return [error, []];
    }

    for (var j = 0; j < plainPN.length / callInfo.howOften; ++j) {
      callLead = callLead.concat(plainPN.slice(j*callInfo.howOften, callInfo.startRow - 1 + j*callInfo.howOften));
      for (var i = 0; i < callPN.length; ++i) {
        callLead.push(callPN[i]);
      }
      if (callInfo.startRow != 0) {
        callLead = callLead.concat(plainPN.slice((j+1)*callInfo.startRow+callPN.length-1, (j+1)*callInfo.howOften));
      }

    }
    console.log(callLead);
    completePN.push(callLead);
    return [[], completePN];
  }
}