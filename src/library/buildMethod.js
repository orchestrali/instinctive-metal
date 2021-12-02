

module.exports = function buildMethod(methodInfo,knownMethod) {
  methodInfo.name = knownMethod.name;
  methodInfo.placeNot.plain = knownMethod.plainPN;
  methodInfo.leadLength = knownMethod.leadLength;
  methodInfo.hunts = knownMethod.hunts;
  if (knownMethod.leadHeadCode) {
    let order = [knownMethod.stage];
    
      let next = knownMethod.stage%2 === 0 ? knownMethod.stage-1 : knownMethod.stage-2;
      while (next > 1) {
        order.push(next);
        next -= 2;
      }
    if ((knownMethod.stage%2 === 0 && knownMethod.leadHeadCode.charCodeAt(0) <= 109) || (knownMethod.stage%2 === 1 && knownMethod.leadHeadCode.charCodeAt(0) > 109)) {
      next++;
    } else {
      next += 3;
    }
      while (next < knownMethod.stage) {
        order.push(next);
        next += 2;
      }
     console.log(order);
    methodInfo.courseorder = order;
  }
  //if (knownMethod.name === "Stedman" && knownMethod.class === "Principle") {
  //  methodInfo.courseorder = knownMethod.pbOrder[0].reverse();
  //}
  
}