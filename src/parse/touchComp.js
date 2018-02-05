var validTouchTokens = ['p', 'b', 's'];

module.exports = function touchComp(compStr) {
  var comp = compStr.split('');
  var errors = [];
  
  for (var i = 0; i < comp.length; ++i) {
    if (validTouchTokens.indexOf(comp[i]) == -1) {
      errors.push("Error: unrecognized token in touch");
      return [errors, []];
    }
  }
  return [[], comp];
}