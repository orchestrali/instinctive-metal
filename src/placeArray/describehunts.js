const buildplaces = require('./buildArray.js');
const huntup = [1, 0, -1, 0];
const huntdown = [-1, 0, 1, 0];
const treblebob = [[1, -1, 1],[0],[-1, 1, -1],[0]];

module.exports = function describehunts(rowArray, hunts) {
  let stage = rowArray[0].bells.length;
  let descript = "";
  hunts.forEach(h => {
    let placeArr = buildplaces(rowArray, h);
    let diffs = [];
    let difshort = [];
    let min = Math.min(...placeArr);
    let max = Math.max(...placeArr);
    for (let i = 1; i < placeArr.length; i++) {
      let d = placeArr[i] - placeArr[i-1];
      diffs.push(d);
      if (difshort.length && d != difshort[difshort.length-1]) {
        difshort.push(d);
      }
    }
    if (huntup.every((n,i) => n === difshort[i])) {
      let i = diffs.indexOf(0);
      let j = diffs.indexOf(0, diffs.indexOf(-1));
      if (diffs[i+1] === -1 && j === diffs.length-1) {
        //hunt bell is plain hunting
      }
    }
    
    
    
  });
}