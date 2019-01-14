const width = 1100;
const build = require("../staff/assemble2.js");

module.exports = function staff(rowZero, rowArray, stage, displayInput) {
  let numBells = rowArray[0].bells.length;
  let numBars;
  let numSystems;
  let svgWidth;
  let lastSystem = 0;
  
  //determine how many bars per system and how many systems required for the number of rows in rowArray
  if (displayInput.mobile) {
    numBars = 1;
    numSystems = rowArray.length;
  } else {
    numBars = Math.floor(width/((numBells+2)*30));
    numSystems = Math.floor(rowArray.length/numBars); //doesn't include last system if it's shorter
    if (rowArray.length % numBars > 0) {
      lastSystem = rowArray.length % numBars;
    }
  }
  console.log('numBars', numBars);
  console.log('numSystems', numSystems);
  
  let lastWidth = 95+(stage-1)*30*lastSystem+(lastSystem-1)*40;
  
  let svgs = [];
  
  
  if (displayInput.rowzero) {
    //console.log('rowZero', rowZero);
    svgs.push(build([rowZero], numBells, displayInput, true, false));
    svgs.push(build(rowArray.slice(0, numBars), numBells, displayInput, false, false));
  } else {
    svgs.push(build(rowArray.slice(0, numBars), numBells, displayInput, true, false));
  }
  
  //generate each system
  for (var i = 1; i < numSystems; i++) {
    let last = lastSystem == 0 && i == numSystems-1 ? true : false;
    //collect the rows that will make a single system
    let rows = rowArray.slice(i*numBars, (i+1)*numBars);
    
    //send rows to system svg generator
    let svg = build(rows, numBells, displayInput, false, last);
    svgs.push(svg);
  }
  
  if (lastSystem > 0) {
    let rows = rowArray.slice(numSystems*numBars);
    
    let svg = build(rows, numBells, displayInput, false, true);
    svgs.push(svg);
  }
  
  return svgs;
}