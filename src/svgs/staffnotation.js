const width = 1000;
const build = require("../staff/assemble.js");

module.exports = function staff(rowZero, rowArray, stage, displayInput) {
  let numBars;
  let numSystems;
  let svgWidth;
  let lastSystem = 0;
  
  //determine how many bars per system and how many systems required for the number of rows in rowArray
  if (width < (stage+2)*30) {
    numBars = 1;
    numSystems = rowArray.length;
  } else {
    numBars = Math.floor(width/((stage+2)*30));
    numSystems = Math.floor(rowArray.length/numBars); //doesn't include last system if it's shorter
    if (rowArray.length % numBars > 0) {
      lastSystem = rowArray.length % numBars;
    }
  }
  console.log('numBars', numBars);
  console.log('numSystems', numSystems);
  //30 between each note, 40 between bars, 65 for clef, 20 at end?
  svgWidth = 95+(stage-1)*30*numBars+(numBars-1)*40; 
  let lastWidth = 95+(stage-1)*30*lastSystem+(lastSystem-1)*40;
  
  let svgs = [];
  
  //generate each system
  for (var i = 0; i < numSystems; i++) {
    let last = lastSystem == 0 && i == numSystems-1 ? true : false;
    //collect the rows that will make a single system
    let rows = rowArray.slice(i*numBars, (i+1)*numBars);
    
    //send rows to system svg generator
    let svg = build(rows, stage, svgWidth, last);
    svgs.push(svg);
  }
  
  if (lastSystem) {
    let rows = rowArray.slice(numSystems*numBars);
    
    let svg = build(rows, stage, lastWidth, true);
    svgs.push(svg);
  }
  
  return svgs;
}