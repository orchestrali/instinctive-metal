const places = require('../places');


module.exports = function lexer(placeNot, numBells) {
  var tokens = [];
  
  for (var i = 0; i < placeNot.length; ++i) {
    var token = {};
    if (placeNot[i] == '&' || placeNot[i] == ',' || placeNot[i] == '+'){
      //console.log('grouping token ' + placeNot[i]);
      token.type = 'grouping token';
    } else if (placeNot[i] == '.') {
      token.type = 'separator';
    } else if (placeNot[i] == 'x' || placeNot[i] == '-') {
      token.type = 'all change';
    } else if (places.indexOf(placeNot[i]) >= 0) {
      token.type = 'number';
    }
    token.value = placeNot[i];
    tokens.push(token);
  }
  
  //console.log(tokens);
  return tokens;
}