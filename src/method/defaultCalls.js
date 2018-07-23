const addCalls = require('./addCalls.js');
const plainEnds = [
  {
    type: "a",
    placeNot: [1,2],
    callLoc: "leadLength"
  },
  {
    type: "b",
    placeNot: [1],
  },
  {
    type: "c",
    placeNot: [1,2],
  },
  {
    type: "d",
    placeNot: [1],
    callLoc: "leadLength-1"
  }
    ]


//given stage and plain place notation (in an array), produce most likely bob and single place notation
module.exports = function addCalls(stage, plainPN) {
  plainEnds[1].placeNot.push(stage);
  plainEnds[2].placeNot.push(stage);
  let plainEnd = plainPN[plainPN.length-1]
  let leadLength = plainPN.length;
  
  let type = plainEnds.find(o => o.placeNot == plainEnd);
  let typeName;
  if (type) {
    typeName = type.type;
  }
  
  let methodInfo = addCalls(typeName, plainPN, stage);

  return methodInfo;
}