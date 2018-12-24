const parsePN = require('../placeNot/parse.js');


module.exports = function callInfo(methodInput) {
  let calls = {};
  let stage = Number(methodInput.stage);
  
  if (methodInput.bobStart) {
    calls.callLoc = methodInput.bobStart;
    calls.bob = {};
    calls.bob.placeNot = parsePN(methodInput.bobPlaceNot, stage);
    calls.bob.startRow = Number(methodInput.bobStart);
  } else {
    calls.callLoc = methodInput.singleStart;
  }
  if (methodInput.singleStart) {
    calls.single = {};
    calls.single.placeNot = parsePN(methodInput.singlePlaceNot, stage);
    calls.single.startRow = Number(methodInput.singleStart);
  }
  return calls;
}