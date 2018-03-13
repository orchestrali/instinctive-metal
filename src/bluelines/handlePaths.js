const findHunt = require('../method/findHunt.js');
const blueGroups = require('./handleGroups.js');
const allLines = require('./allLines.js');

//input here is displayInput
module.exports = function handlePaths(input, plainPN, numBells) {
  let bellPaths = [];
  
  if (input.blueGroup1) {
    //determine bells to be pathed & weight and color
    bellPaths.push(blueGroups(input,1,plainPN,numBells))
  } 
  if (input.blueGroup2) {
    //same for blueGroup2  
    bellPaths.push(blueGroups(input,2,plainPN,numBells))
  } else if (input.huntBellw) {
    //find hunt bells and add them to bell paths with weight and input.huntColor
    let huntBells = {};
    huntBells.weight = input.huntBellw;
    huntBells.color = input.huntColor;
    huntBells.bells = findHunt(plainPN, numBells);
    bellPaths.push(huntBells);
    //add bluebell to paths with weight and color
    let bluebell = {};
    bluebell.bells = [Number(input.blueBell)];
    bluebell.weight = input.blueBellw;
    bluebell.color = input.blueBellc;
    bellPaths.push(bluebell);
  } else if (input.bell1w) {
    //add each bell to bell paths
    bellPaths = bellPaths.concat(allLines(input, numBells));
  }
  return bellPaths;
}