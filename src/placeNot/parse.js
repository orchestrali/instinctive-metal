const lexer = require('./lexer');
const numJoin = require('./numJoin');
const parseNumAbbr = require('./numAbbr');
const grouping = require('./grouping');
const stringify = require('./objToStr');




module.exports = function parseNotation(placeNot, numBells) {
  var stringArray = stringify(grouping(parseNumAbbr(numJoin(placeNot), numBells)));
  console.log('hi');
  console.log(stringArray);
  return stringArray;
  

}