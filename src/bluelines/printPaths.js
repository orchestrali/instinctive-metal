const buildPath = require('./buildPath.js');

module.exports = function printPaths(pathArray, rowArray) {
  let pathsString = '';
  
  for (var i = 0; i < pathArray.length; ++i) {
    let path = buildPath(rowArray, pathArray[i]);
    pathsString += path;
  }
  return pathsString;
}