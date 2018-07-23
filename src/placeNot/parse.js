const lexer = require('./lexer');
const numJoin = require('./numJoin');
const parseNumAbbr = require('./numAbbr');
const grouping = require('./grouping');
const stringify = require('./objToStr');



//takes input place notation string, returns fully parsed array of place notation
module.exports = function parseNotation(placeNot, numBells) {
  var stringArray = stringify(grouping(parseNumAbbr(numJoin(lexer(placeNot, numBells)), numBells)));
  //console.log('hi');
  //console.log(stringArray);
  return stringArray;
  
}