const places = require('../places');

var validGroupTokens = [',', '+', '&,', '&,+', '+,', '+,&'];

module.exports = function grouping(tokens) {
  var groupingTokens = [];
  var groupingString = '';
  var mirrorStart;
  var mirrorEnd = 0;
  var insertIndex;
  var numToReplace;
  for (var i = 0; i < tokens.length; ++i) {
    //add the grouping tokens to the array
    if (tokens[i].type == 'grouping token') {
      groupingTokens.push({
        index: i,
        token: tokens[i].value,
      });
      groupingString += tokens[i].value;
    }
  }
  //console.log(groupingString);
  
  if (groupingString == '') {
    return tokens;
  } else if (groupingString == '+') {
      tokens.splice(groupingTokens[0].index, 1);
      return tokens;  
  } else {
    var toBeReversed;
    if (groupingString == ',') {
      if (groupingTokens[0].index > 1) {
        mirrorStart = 0;
        mirrorEnd = groupingTokens[0].index - 1;
        insertIndex = groupingTokens[0].index + 1;
      } else if (groupingTokens[0].index == 1) {
        mirrorStart = 2;
        mirrorEnd = tokens.length-1;
        insertIndex = tokens.length;
      }
      
    } else if (groupingString == '&,' || groupingString == '&,+') {
      mirrorStart = groupingTokens[0].index + 1;
      mirrorEnd = groupingTokens[1].index - 1;
      insertIndex = groupingTokens[1].index + 1;
    } else if (groupingString == '+,') {
      mirrorStart = groupingTokens[1].index + 1;
      mirrorEnd = tokens.length - 1;
      insertIndex = tokens.length;
    } else if (groupingString == '+,&') {
      mirrorStart = groupingTokens[2].index + 1;
      mirrorEnd = tokens.length - 1;
      insertIndex = tokens.length;
    }
    
    if (mirrorEnd == 0) {
      toBeReversed = tokens.slice(mirrorStart);
    } else {
      toBeReversed = tokens.slice(mirrorStart, mirrorEnd);
    }
    
    toBeReversed.reverse();
    //console.log('toBeReversed', toBeReversed);
    //console.log('tokens', tokens);
    //console.log(toBeReversed[0]);
    //console.log(tokens[insertIndex]);
    for (var j = 0; j < toBeReversed.length; j++) {
      //console.log('insideloop', toBeReversed[j]);
      tokens.splice(insertIndex + j, 0, toBeReversed[j]);
    }
    //console.log('tokens after forloop', tokens);
    
    //tokens.splice(insertIndex, numToReplace, toBeReversed);
    //console.log(tokens);
    //console.log(tokens.splice(0, 0, {test: 'this is a test',}))
    //console.log(tokens);
    
  }
  //console.log(tokens);
 
  return tokens;
}