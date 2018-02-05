var method = {
  leadHead: '1234567890ET',
  placeNot: 'x4x3x1x0x9x1,1',
  numBells: 12,
  name: 'Musicus Butthead Rex Maximus',
}
var places = '1234567890ET';


const lexer = require('./parse/lexer');
const numJoin = require('./parse/numJoin');
const parseNumAbbr = require('./parse/parseNumAbbr');
const grouping = require('./parse/qGrouping');
const stringify = require('./parse/stringsFromObjects');




module.exports = function parseNotation(placeNot, numBells) {
  var stringArray = stringify(grouping(parseNumAbbr(numJoin(placeNot), numBells)));
  console.log('hi');
  console.log(stringArray);
  return stringArray;
  

}


