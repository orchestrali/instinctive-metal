

module.exports = function buildMethod(set, method) {
  let methodObj = {};
  methodObj.name = method.title._text;
  methodObj.plainPN = method.notation._text;
  methodObj.stage = set.stage;
  methodObj.class = set.class;
  methodObj.plain = set.plain;
  methodObj.little = set.little;
  methodObj.differential = set.differential;
  methodObj.leadLength = set.leadLength;
  
  return methodObj;
}