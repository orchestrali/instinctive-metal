

module.exports = function allLines(input, numBells) {
  let bellPaths = [];
  for (var i = 1; i <= numBells; ++i) {
      let path = {};
      let color = input['bell' + i + 'c']
      if (color && color != '') {
        path.bells = [i];
        path.weight = input['bell' + i + 'w']
        path.color = color;
      }
    bellPaths.push(path);
  }
  return bellPaths;
}