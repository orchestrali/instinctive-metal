const categories = {
  methodInfo: ['stage', 'placeNotation', 'methodClass', 'methodName', 'callType', 'bobPlaceNot', 'bobStart', 'singlePlaceNot', 'singleStart'],
  composition: ['leadhead', 'otherLeadhead', 'quantity', 'touch', 'touchType'],
  display: ['huntBellw', 'huntColor', 'blueBell', 'blueBellw', 'blueBellc', 'pagination', 'blueGroup1', 'blueGroup1w', 'blueGroup1c', 'blueGroup2w', 'blueGroup2c', 'blueGroup2', 'huntbells']
}

const catIndexed = (function(cats) {
  let index = {};
  for (var key in cats) {
    for (var i = 0; i < cats[key].length; ++i) {
      index[cats[key][i]] = key;
    }
  }
  for (var i = 1; i < 13; ++i) {
    index['bell' + i + 'w'] = 'display';
    index['bell' + i + 'c'] = 'display';
  }
  return index;
})(categories);

module.exports = function sortInput(input) {
  let object = {};
  object.methodInfo = {};
  object.composition = {};
  object.display = {};
  
  for (var key in input) {
    object[catIndexed[key]][key] = input[key];
  }
  
  return object;
}