const compareLeads = require('./compareLeads.js');

var methods = ["Allendale",	"Alnwick", "Annable's London",	"Bacup",	"Bamborough",	"Berwick", "Beverley", "Bourne", "Cambridge", "Canterbury", "Carlisle", "Chester", "Coldstream", "Cunecastre", "Durham", "Hexham", "Hull", "Ipswich", "Kelso", "Lightfoot", "Lincoln", "London", "Morpeth", "Munden", "Netherseale", "Newcastle", "Norfolk", "Northumberland", "Norwich", "Primrose", "Rossendale", "Sandiacre", "Stamford", "Surfleet", "Warkworth", "Wearmouth", "Wells", "Westminster", "Whitley", "Wooler", "York"]

module.exports = function buildInputs(i, startj) {
  let input1 = {};
  input1.stage = 6;
  input1.methodClass = "Surprise";
  input1.methodName = methods[i] + " Surprise";
  console.log("input1: ", input1);
  let input2 = {};
  input2.stage = 6;
  input2.methodClass = "Surprise";
  
  let comparisons = [];
  

  for (var j = startj; j < methods.length && j < startj+11; j++) {

    input2.methodName = methods[j] + " Surprise";
    console.log("input2: ", input2);
    let results = compareLeads(input1, input2);
    let obj = {};
    obj.method1 = methods[i];
    obj.method2 = methods[j];
    obj.numSame = results.numSame;
    comparisons.push(obj);
  }
    
  return comparisons;
}