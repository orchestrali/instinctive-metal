const callTypes = [
  {
    type: "a",
    bobPN: [1,4],
    singlePN: [1, 2, 3, 4],
    callLoc: "leadLength"
  },
  {
    type: "b",
    bobPN: [1, "stage-2"],
    singlePN: [1, "stage-2", "stage-1", "stage"]
  },
  {
    type: "c",
    placeNot: [1,2],
  },
  {
    type: "d", //grandsire
    placeNot: [1],
    callLoc: "leadLength-1"
  }
    ]

module.exports = function addCalls(type, plainPN, stage) {
  //console.log("type", type);
  let methodInfo = {};
  let leadLength = plainPN.length;
  if (type == "a" || type == "c") {
    let typeObj = callTypes.find(o => o.type == "a")
    //console.log(typeObj);
    let bobArray = typeObj.bobPN;
    let singleArr = typeObj.singlePN;
    if (stage % 2 == 1) {
      bobArray.push(stage);
      singleArr.push(stage);
    }
    methodInfo.bobPN = plainPN.slice(0, -1);
    methodInfo.bobPN.push(bobArray);
    methodInfo.singlePN = plainPN.slice(0, -1)
    //console.log("bobPN", methodInfo.bobPN);
    if (stage == 5) {
      methodInfo.singlePN.push([1,2,3]);
    } else {
      methodInfo.singlePN.push(singleArr);
    }
    methodInfo.callLoc = leadLength;
    //console.log(methodInfo);
  } else if (type == "b") {
    let bobArr = [1, stage-2];
    let singleArr = [1, stage-2, stage-1, stage];
    methodInfo.bobPN = plainPN.slice(0, -1)
    methodInfo.bobPN.push(bobArr);
    methodInfo.singlePN = plainPN.slice(0, -1);
    methodInfo.singlePN.push(singleArr);
    methodInfo.callLoc = leadLength;
  } else if (type == "d") {
    methodInfo.bobPN = plainPN.slice(0, -2);
    methodInfo.bobPN.push([3],plainPN[plainPN.length-1]);
    methodInfo.singlePN = plainPN.slice(0, -2);
    methodInfo.singlePN.push([3], [1,2,3]);
    methodInfo.callLoc = leadLength-1;
  }

  return methodInfo;
}