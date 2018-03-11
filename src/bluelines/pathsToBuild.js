

module.exports = function arrayOfPaths(groupedPaths) {
  let pathsToBuild = [];
  
  for (var i = 0; i < groupedPaths.length; ++i) {
    for (var j = 0; j < groupedPaths[i].bells.length; ++j) {
      let path = {};
      path.bell = Number(groupedPaths[i].bells[j]);
      path.weight = groupedPaths[i].weight;
      path.color = groupedPaths[i].color;
      pathsToBuild.push(path);
    }
  }
  return pathsToBuild;
}