const places = require('./places');

var validNotTokens = [',', '+', '&', 'x', '.', '-'];
var validGroupTokens = ['',',', '+', '&,', '&,+', '+,', '+,&'];
var validCompTokens = ['p', 'b', 's'];
var leadendTokens = ['p', 'b', 's'];
var callPlaceTokens = ['h', 'w', 'm', 'b', 'i'];
var touchGroup = ['(', ')', '[', ']', '{', '}'];

module.exports = function findError(methodInput, compInput) {
  let errors = [];
  let stage = Number(methodInput.stage);
  
  //'x' or '-' in odd-bell method place notation
  if (stage % 2 == 1 && (methodInput.placeNotation.indexOf('x') > -1 || methodInput.placeNotation.indexOf('-') > -1)) {
    errors.push("Error: 'x' and '-' are not allowed in odd-bell methods");
  }
  //repeated '.' in place notation
  if (methodInput.placeNotation.indexOf('..') > -1) {
    errors.push("Error: repeated '.' in place notation")
  }
  
  //unrecognized token in place notation, build group string
  let groupStr = '';
  for (var i = 0; i < methodInput.placeNotation.length; ++i) {
    let token = methodInput.placeNotation[i];
    if (validNotTokens.indexOf(token) == -1 && (places.indexOf(token) == -1 || token*1 > stage)) {
      errors.push("Error: invalid character in place notation");
    } else if (token == '+' || token == '&' || token == ',') {
      groupStr += token;
    }
  }
  //unrecognized group string
  if (validGroupTokens.indexOf(groupStr) == -1) {
    errors.push("Error: unrecognized place notation format");
  }
//if leadhead is not rounds
  if (compInput.otherLeadhead) {
    console.log('leadhead is not rounds');
    //unrecognized token in leadhead
    for (var i = 0; i < compInput.otherLeadhead.length; ++i) {
      if (places.indexOf(compInput.otherLeadhead[i]) == -1) {
        errors.push("Error: unrecognized character in leadhead");
      }
    }
    //wrong number of bells in leadhead
    if (compInput.otherLeadhead.length != stage) {
      errors.push("Error: given leadhead does not contain the correct number of bells");
    }
    //plain course must start with rounds (for now?)
    if (compInput.quantity == 'plain-course') {
      errors.push("Error: a plain course must start with rounds");
    }
  } else {
    console.log('leadhead is rounds');
  }
  

  if (compInput.touch) {
    let compArr = compInput.touch.split('');
    //unrecognized token in composition
    for (var i = 0; i < compInput.touch.length; ++i) {
      let token = compInput.touch[i];
      if (compInput.touchType == 'leadend') {
        if (leadendTokens.indexOf(token) == -1 && touchGroup.indexOf(token) == -1 && token*1 > stage) {
          errors.push("Error: unrecognized token in touch");
        }
      } else if (compInput.touchType == 'callplace') {
        if (leadendTokens.indexOf(token) == -1 && callPlaceTokens.indexOf(token) == -1 && touchGroup.indexOf(token) == -1 && token*1 > stage) {
          errors.push("Error: unrecognized token in touch");
        }
      }
    }
    //no actual calls in touch
    if ((compInput.touchType == 'leadend' && compArr.filter(e => leadendTokens.indexOf(e) > -1).length == 0) || (compInput.touchType == 'callplace' && compArr.filter(e => callPlaceTokens.indexOf(e) > -1).length == 0)) {
      errors.push("Error: no actual calls in touch");
    }
    //mismatched parentheses/brackets (only checks if the number of opening and closing symbols match)
    for (var i = 0; i < touchGroup.length-1; i+=2) {
      if (compArr.filter(e => e == touchGroup[i]).length != compArr.filter(e => e == touchGroup[i+1]).length) {
        errors.push("Error: mismatching '" + touchGroup[i] + "' in touch");
      }
    }
    
    
    if (!methodInput.methodName) {
      //bob info required
      if ((compInput.touchType == 'leadend' && compInput.touch.indexOf('b') > -1) || (compInput.touchType == 'callplace' && compArr.filter(e => callPlaceTokens.indexOf(e) > -1).length > compArr.filter(e => (e == 'p' || e == 's')).length)) {
        if (!methodInput.bobPlaceNot || !methodInput.bobFreq || !methodInput.bobStart) {
          errors.push("Error: bob info required");
        }
      }
      //single info required
      if (compInput.touch.indexOf('s') > -1) {
        if (!methodInput.singlePlaceNot || !methodInput.singleFreq || !methodInput.singleStart) {
          errors.push("Error: single info required");
        }
      }
      //bob or single start = 0
      if (methodInput.bobStart == 0 || methodInput.singleStart == 0) {
        errors.push("Error: call locations must be a non-zero integer");
      }
    } 
  }

return errors;
}