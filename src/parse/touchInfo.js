const lexer = require('./lexer');

//given the form input (composition, bob info, single info)
//return any errors
//return callInfo, an array containing bob info and/or single info as applicable

module.exports = function parseTouch(input) {
  var comp = input.touch;
  var callInfo = ['none', 'none'];
  var numBells = Number(input.stage);
  var errors = [];
  
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

  
  return [errors, callInfo];
}