

module.exports = function buildMethod(method) {
  let methodObj = {};
  methodObj.name = method.title;
  methodObj.plainPN = method.pnFull;
  methodObj.stage = method.stage;
  methodObj.class = method.class;
  methodObj.plain = method.classification.plain;
  methodObj.leadLength = method.leadLength;
  
  return methodObj;
}