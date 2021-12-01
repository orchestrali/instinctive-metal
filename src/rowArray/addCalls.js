
//given composition (array of pbs), lead length, and call location, add call types to rowArray
module.exports = function addCalls(rowArray, comp, ll, callLoc) {
  console.log('rowArray length: ', rowArray.length);
  
  for (var i = 0; i < comp.length; i++) {
    if (comp[i] != 'p') {
      let num = Number(i*ll+callLoc-1);
      rowArray[num].type = comp[i];
      
      switch (comp[i]) {
        case "b":
          rowArray[num-2].call = "Bob";
          break;
        case "s":
          rowArray[num-2].call = "Single";
          break;
      }
    }
  }
  return rowArray;
}