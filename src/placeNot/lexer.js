const places = require('../places');

var validGroupTokens = ['',',', '+', '&,', '&,+', '+,', '+,&'];

module.exports = function lexer(placeNot, numBells) {
  var tokens = [];
  var groupingStr = '';
  var errorArray = [];
  
  if (placeNot.indexOf('..') >= 0 ) {
    errorArray.push("Error: repeated '.' in place notation")
  }
  
  for (var i = 0; i < placeNot.length; ++i) {
    var token = {};
    if (placeNot[i] == '&' || placeNot[i] == ',' || placeNot[i] == '+'){
      //console.log('grouping token ' + placeNot[i]);
      token.type = 'grouping token';
      groupingStr += placeNot[i];
    } else if (placeNot[i] == '.') {
      token.type = 'separator';
    } else if (placeNot[i] == 'x' || placeNot[i] == '-') {
      if (numBells % 2 == 1) {
        errorArray.push("Error: '" + placeNot[i] + "' is not allowed in odd-bell methods");
        console.log("error: '" + placeNot[i] + "' is not allowed in odd-bell methods");
        break;
      } else {
        token.type = 'all change';
      }
    } else if (places.indexOf(placeNot[i]) >= 0) {
      token.type = 'number';
    } else {
      errorArray.push("Error: unrecognized character in place notation");
      console.log('error: unrecognized token');
      break;
    }
    token.value = placeNot[i];
    tokens.push(token);
  }
  
  if (validGroupTokens.indexOf(groupingStr) == -1) {
    errorArray.push('Error: unrecognized place notation format');
    console.log('Error: unrecognized place notation format');
  } else if (groupingStr == '+' && placeNot.indexOf('+') > 0) {
    errorArray.push('Error: unrecognized place notation format');
    console.log('Error: unrecognized place notation format');
  }
  
  //console.log(tokens);
  return [errorArray, tokens];
}