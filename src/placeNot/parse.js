const lexer = require('./lexer');
const numJoin = require('./numJoin');
const parseNumAbbr = require('./numAbbr');
const grouping = require('./grouping');



//takes input place notation string, returns fully parsed array of place notation
module.exports = function parseNotation(placeNot, numBells) {
  let tokens = numJoin(lexer(placeNot));
  parseNumAbbr(tokens, numBells);
  grouping(tokens);
  
  return tokens.filter(t => t.type !== "grouping token").map(t => t.value);
  
}