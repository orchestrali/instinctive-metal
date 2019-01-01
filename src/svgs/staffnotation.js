const width = 1000;
const build = require("../staff/assemble.js");

module.exports = function staff(rowArray, stage) {
  let numBars;
  let numSystems;
  let svgWidth;
  let lastSystem;
  
  //determine how many bars per system and how many systems required for the number of rows in rowArray
  if (width < (stage+2)*30) {
    numBars = 1;
    numSystems = rowArray.length;
  } else {
    numBars = Math.floor(width/((stage+2)*30));
    numSystems = Math.floor(rowArray.length/numBars);
    if (rowArray.length % numBars > 0) {
      lastSystem = rowArray.length % numBars;
    }
  }
  
  svgWidth = 85+(stage-1)*30*numBars+(numBars-1)*40;
  
  let svgs = [];
  
  //generate each system
  for (var i = 0; i < numSystems; i++) {
    let rows = [];
    
    //collect the rows that will make a single system
    for (var j = 0; j < numBars; j++) {
      rows.push(rowArray[i*numBars+j]);
    }
    
    //send rows to system svg generator
    let svg = build(rows, stage, svgWidth);
    svgs.push(svg);
  }
  
  if (lastSystem) {
    let rows = [];
    for (var j = 0; j < lastSystem; ++j) {
      rows.push(rowArray[numSystems*numBars+j]);
    }
    let svg = build(rows, stage, svgWidth);
    svgs.push(svg);
  }
  
  return svgs;
}