

module.exports = function letters(compArr) {
  let tokens = [];
  let prevToken;
  
  for (var i = 0; i < compArr.length; ++i) {
    
    if (compArr[i].type == 'number') {
      if (compArr[i+1].type != 'groupStart') {
        //if token is a number and next token is not a groupStart, change tokenType to callPlace and add to tokens
        compArr[i].type = 'callPlace';
        if (prevToken == 's' || prevToken == 'p') {
          compArr[i].call = prevToken;
        } else {
          compArr[i].call = 'b';
        }
        tokens.push(compArr[i]);
        prevToken = '';
      } else {
        //if token is a number and next token IS groupStart, add it as is
        tokens.push(compArr[i]);
      }
      prevToken = '';
    } else if (compArr[i].type == 'groupStart' || compArr[i].type == 'groupEnd') {
      //if token is grouping, add it
      tokens.push(compArr[i]);
      prevToken = '';
    } else if (compArr[i].value == 's' || compArr[i].value == 'p') {
      //if token is s or p, don't add
      prevToken = compArr[i].value;
    } else if (compArr[i].type == 'letter') {
      compArr[i].type = 'callPlace';
      if (prevToken == 's' || prevToken == 'p') {
        //if token is a letter and prevToken is s or p, set type to callPlace and call to s or p
        compArr[i].call = prevToken;
      } else {
        //if token is a letter and prevToken is not s or p, set call to b
        compArr[i].call = 'b';
      }
      tokens.push(compArr[i]);
      prevToken = '';
    }  
    
  }
  return tokens;
}