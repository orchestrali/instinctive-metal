var validTouchTokens = ['p', 'b', 's'];
const lexer = require('./lexer');

module.exports = function parseTouch(input) {
  var comp = input.touch.split('');
  var callInfo = ['none', 'none'];
  
  
  var numBells = Number(input.stage);
  
  var errors = [];
  
  for (var i = 0; i < input.touch.length; ++i) {
    if (validTouchTokens.indexOf(comp[i]) == -1) {
      errors.push("Error: unrecognized token in touch");
      return [errors, callInfo];
    }
  }
  
  if (comp.indexOf('b') > -1 && 
      (input.bobPlaceNot == '' || input.bobFreq == '' || input.bobStart == '')) {
    errors.push("Error: bob info required");
    return [errors, callInfo];
  } else if (comp.indexOf('b') > -1) {
    let bobInfo = {};
    bobInfo.placeNot = lexer(input.bobPlaceNot, numBells)[1];
    bobInfo.howOften = Number(input.bobFreq);
    bobInfo.startRow = Number(input.bobStart);
    callInfo.splice(0, 1, bobInfo);
    errors = errors.concat(lexer(input.bobPlaceNot, numBells)[0]);
  }
  
  if (comp.indexOf('s') > -1 && 
      (input.singlePlaceNot == '' || input.singleFreq == '' || input.singleStart == '')) {
    errors.push("Error: single info required");
    
  } else if (comp.indexOf('s') > -1) {
    let singleInfo = {};
    singleInfo.placeNot = lexer(input.singlePlaceNot, numBells)[1];
    singleInfo.howOften = Number(input.singleFreq);
    singleInfo.startRow = Number(input.singleStart);
    callInfo.splice(1, 1, singleInfo);
    errors = errors.concat(lexer(input.singlePlaceNot, numBells)[0]);
  }
  
  
  
  
  
  
  return [errors, callInfo, comp];
}