const categories = {
  methodInfo: ['stage', 'placeNotation', 'methodClass', 'methodName', 'validName', 'callType', 'bobPlaceNot', 'singlePlaceNot', 'callLoc'],
  composition: ['leadhead', 'otherLeadhead', 'quantity', 'comp', 'touchType', 'tenors'],
  display: ['numbers', 'huntBellw', 'huntColor', 'blueBell', 'blueBellw', 'blueBellc', 'pagination', 'blueGroup1', 'blueGroup1w', 'blueGroup1c', 'blueGroup2w', 'blueGroup2c', 'blueGroup2', 'huntbells', 'windowWidth', 'gap', 'includeTime', 'timesig', 'keysig', 'actTenor', 'rowzero', 'mobile', 'keepscore', 'drawLH', 'tutorial']
}

const booleans = ['numbers', 'pagination', 'huntbells', 'gap', 'includeTime', 'rowzero', 'mobile', 'keepscore', 'drawLH', 'tutorial'];
const numbers = ['stage', 'callLoc', 'tenors', 'blueBell'];

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

module.exports = catIndexed;