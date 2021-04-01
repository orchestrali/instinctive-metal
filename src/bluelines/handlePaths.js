const blueGroups = require('./handleGroups.js');
const allLines = require('./allLines.js');

//input here is displayInput
module.exports = function handlePaths(input, info) {
  //console.log(input);
  let bellPaths = [];
  
  if (input.blueGroup1) {
    //determine bells to be pathed & weight and color
    bellPaths.push(blueGroups(input,1,info))
  } 
  if (input.blueGroup2) {
    //same for blueGroup2  
    bellPaths.push(blueGroups(input,2,info))
  } 
  if (input.huntBellw) {
    //find hunt bells and add them to bell paths with weight and input.huntColor
    let huntBells = {};
    huntBells.weight = input.huntBellw;
    huntBells.color = input.huntColor;
    huntBells.bells = info.hunts;
    bellPaths.push(huntBells);
    //add bluebell to paths with weight and color
    
  }
  let bluebell = {};
  if(input.blueBell) {
    bluebell.bells = [Number(input.blueBell)];
    bluebell.weight = input.blueBellw;
    bluebell.color = input.blueBellc;
    bellPaths.push(bluebell);
  }
  if (input.bell1w) {
    //add each bell to bell paths
    bellPaths = bellPaths.concat(allLines(input, info.numBells));
  }
  return bellPaths;
}