var callPlaces = ['h', 'w', 'm', 'b', 'i'];
var callTypes = ['p', 'b', 's'];
var grouping = ['(', ')', '[', ']'];
var groupStart = ['(', '[', '{'];
var groupEnd = [')', ']', '}'];

module.exports = function lexer(compStr, type) {
  //should I use another function here to remove white space? well right now it's already getting removed; the question is whether I should allow it when I'm error checking.
  let compInput = compStr.toLowerCase().split('');
  let tokens = [];
  
  for (var i = 0; i < compInput.length; ++i) {
    let token = {};
    token.value = compInput[i];
    
    if (compInput[i]*1 > 0) {
      token.type = 'number';
    } else if (compInput[i] == "!") {
      token.type = 'obsbell'
    } else if (groupStart.indexOf(compInput[i]) > -1) {
      token.type = 'groupStart';
    } else if (groupEnd.indexOf(compInput[i]) > -1) {
      token.type = 'groupEnd';
    } else if (callTypes.indexOf(compInput[i]) > -1 || callPlaces.indexOf(compInput[i]) > -1) {
      if (type == 'leadend') {
        token.type = 'call';
      } else {
        token.type = 'letter';
      }     
    }
    if (token.type) {
      tokens.push(token);
    }
    
  }
  //console.log(tokens);
  return tokens;
}