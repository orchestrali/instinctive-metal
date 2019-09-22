const buildPath = require('./buildPath.js');

module.exports = function printPaths(pathArray, rowArray, x) {
  let pathsString = '';
  
  for (var i = 0; i < pathArray.length; ++i) {
    let path = buildPath(rowArray, pathArray[i], x);
    pathsString += path;
  }
  return pathsString;
}