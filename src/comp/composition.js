const lexer = require('./compLexer.js');
const parseLetters = require('./compLetters.js');
const expandAbbr = require('./compAbbr.js');
const numbers = require('./numbers.js');

module.exports = function parseComp(compStr, type) {
  let tokens = lexer(compStr, type);
  //if type is 'callplace', parseLetters
  if (type == 'callplace') {
    tokens = parseLetters(tokens);
    //console.log(tokens);
  }
  if (type == 'numbers') {
    return numbers(tokens);
  }
  //expand abbreviations using numbers
  let composition = expandAbbr(tokens);
  //return array of lead ends or of objects indicating call place and call name
  if (type == 'leadend') {
    let compArray = [];
    for (var i = 0; i < composition.length; ++i) {
      compArray.push(composition[i].value);
    }
    //console.log(compArray);
    return compArray;
  } else {
    //console.log(composition);
    return composition;
  }
}