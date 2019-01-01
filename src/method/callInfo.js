const parsePN = require('../placeNot/parse.js');


module.exports = function callInfo(methodInput, ll) {
  let calls = {};
  let stage = Number(methodInput.stage);
  if (Number(methodInput.callLoc) == 0) {
    calls.callLoc = ll;
  } else {
    calls.callLoc = Number(methodInput.callLoc);
  }
  
  if (methodInput.bobPlaceNot != '') {
    calls.bob = parsePN(methodInput.bobPlaceNot, stage);
  } 
  
  if (methodInput.singlePlaceNot != '') {
    calls.single = parsePN(methodInput.singlePlaceNot, stage);
  }
  return calls;
}