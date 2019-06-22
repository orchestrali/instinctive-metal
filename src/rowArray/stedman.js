const buildLead = require('./buildLead2.js');

const doubles = {
  quicks: [[1],[3],[1,4,5],[3],[1],[5]],
  slows: [[3],[1],[3,4,5],[1],[3],[5]]
}

module.exports = function stedman(methodInfo, compInfo, sixes) {
  console.log("stedman");
  let stage = methodInfo.stage;
  let bob = [stage-2], single = [stage-2,stage-1,stage]
  let pn;
  
  let rowArray = [];
  let rowZero = compInfo.rowZero;
  let rowNum = 1;
  let comp = sixes ? sixes : compInfo.touch;
  
  if (stage == 5) {
    console.log("stedman doubles");
    pn = buildPN("first", "p", 5);
    rowArray = buildLead(rowZero, pn, rowNum);
    console.log(rowArray);
    rowZero = rowArray[rowArray.length-1].bells;
    rowNum = rowArray.length+1;
    let six;
    for (var i = 0; i < comp.length; i++) {
      if (i % 2 == 1) {
        six = "quick";
      } else if (i % 2 == 0) {
        six = "slow";
      }
      if (i == 0) {
        console.log(six, comp[i]);
      }
      if (comp[i] == "p") {
        pn = buildPN(six[0], "p", 5);
      } else if (comp[i] == "s") {
        pn = doubles[six+"s"];
      }
      let oneLead = buildLead(rowZero, pn, rowNum);
      rowNum += oneLead.length;
      rowZero = oneLead[oneLead.length-1].bells;
      rowArray = rowArray.concat(oneLead);
    }
    if (comp.length % 2 == 0) {
      rowArray = rowArray.concat(buildLead(rowZero, buildPN("s", "p", 5), rowNum));
      rowNum += 6;
      rowZero = rowArray[rowArray.length-1].bells;
    }
    rowArray = rowArray.concat(buildLead(rowZero, buildPN('last', null, 5), rowNum));
  } else {
    for (var i = 0; i < comp.length; i++) {
      let six;
      if (i == 0) six = "first";
      else if (i % 2 == 1) six = "s";
      else if (i % 2 == 0) six = "q";
      
      pn = buildPN(six, comp[i], stage)
      let oneLead = buildLead(rowZero, pn, rowNum);
      rowNum += oneLead.length;
      rowZero = oneLead[oneLead.length-1].bells;
      rowArray = rowArray.concat(oneLead);
    }
    if (comp.length % 2 == 1) {
      rowArray = rowArray.concat(buildLead(rowZero, buildPN("s", "p", stage), rowNum));
      rowNum += 6;
      rowZero = rowArray[rowArray.length-1].bells;
    }
    rowArray = rowArray.concat(buildLead(rowZero, buildPN('last', null, stage), rowNum));
  }
  
  
  return {rows: rowArray, comp: comp};
}


function buildPN(six, end, stage) {
  let pn;
  if (six == "q") {
    pn = [[1],[3],[1],[3],[1]];
  } else if (six == "s") {
    pn = [[3],[1],[3],[1],[3]];
  } else if (six == 'first') {
    pn = [[3],[1]];
  } else if (six = 'last') {
    pn = [[1],[3],[1]];
  }
  
  if (end == "p") pn.push([stage]);
  if (end == "b") pn.push([stage-2]);
  if (end == "s") pn.push([stage-2,stage-1,stage]);
  
  return pn;
}