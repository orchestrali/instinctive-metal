const rounds = require('../rounds.js');

module.exports = function handleGroups(input, groupNum, info) {
  let numBells = info.numBells;
  let paths = {};
  let group = input['blueGroup' + groupNum];
  console.log('group ', group);
  let weight = input['blueGroup' + groupNum + 'w']
  let color = input['blueGroup' + groupNum + 'c'];
  paths.weight = weight;
  paths.color = color;
  
  if (group == 'all') {
    paths.bells = rounds(numBells);
  } else if (group == 'none') {
  } else if (group == 'hunt') {
    paths.bells = info.hunts;
    
  } else if (group == 'work') {
    let huntBells = info.hunts;
    paths.bells = [];
    for (var i = 1; i <= numBells; ++i) {
      if (huntBells.indexOf(i) == -1) {
        paths.bells.push(i);
      }
    }
    
  }
  console.log(paths);
  return paths;
}