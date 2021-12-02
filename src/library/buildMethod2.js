

module.exports = function buildMethod(method) {
  let methodObj = {};
  methodObj.name = method.title;
  methodObj.plainPN = method.pnFull;
  methodObj.stage = method.stage;
  methodObj.class = method.class;
  methodObj.plain = method.classification.plain;
  methodObj.leadLength = method.leadLength;
  methodObj.hunts = method.huntBells;
  
  if (method.leadHeadCode) {
    let order = [method.stage];
    
      let next = method.stage%2 === 0 ? method.stage-1 : method.stage-2;
      while (next > 1) {
        order.push(next);
        next -= 2;
      }
    if ((method.stage%2 === 0 && method.leadHeadCode.charCodeAt(0) <= 109) || (method.stage%2 === 1 && method.leadHeadCode.charCodeAt(0) > 109)) {
      next++;
    } else {
      next += 3;
    }
      while (next < method.stage) {
        order.push(next);
        next += 2;
      }
     console.log(order);
    methodObj.courseorder = order;
  }
  if (method.name === "Stedman" && method.class === "Principle") {
    methodObj.courseorder = method.pbOrder[0].reverse();
  }
  
  return methodObj;
}