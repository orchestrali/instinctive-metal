


module.exports = function compAbbr(compArr) {
  //does compArr have any parens?
  while (compArr.find(o => o.type == 'groupStart')) {
    //console.log('dealing with one pair of grouping tokens');
    let startIndices = [];
    let endIndices = [];
    //populate arrays of open and close parens
    for (var i = 0; i < compArr.length; ++i) {
      if (compArr[i].type == 'groupStart') {
        startIndices.push(i);
      } else if (compArr[i].type == 'groupEnd') {
        endIndices.push(i);
      }
    }
    
    //find index of last open paren
    let start = startIndices[startIndices.length -1];
    //find index of first close paren after that
    let end = endIndices.find(e => e > start);
    //if there's a number before
    if (compArr[start-1].type == 'number') {
      //find number
      let n = compArr[start-1].value-1;
      //copy chunk between
      let copyChunk = compArr.slice(start+1,end);
      //expand copy chunk n times
      let insertChunk = copyChunk
      let j = 0;
      while (j < n) {
          insertChunk = insertChunk.concat(copyChunk);
          j++;
        }
      //remove chunk, number, parens
      compArr.splice(start-1, end-start+2)
      //insert chunk n times
      for (var k = insertChunk.length-1; k >= 0; +--k) {
          compArr.splice(start-1, 0, insertChunk[k]);
        }
    } else {
      //remove the parens
      compArr.splice(start, 1);
      compArr.splice(end,1);
    }
      
  } 
    
  //console.log('no grouping tokens left');
  //console.log(compArr);
  return compArr;
}