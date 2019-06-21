const buildLead = require('./buildLead2.js');
const finish = require('./finish.js');

var leadEnds = [
  {
    name: 'p',
    fullname: 'plain'
  },
  {
    name: 'b',
    fullname: 'bob'
  },
  {
    name: 's',
    fullname: 'single'
  }
];

module.exports = function leadEnd(methodInfo, compInfo) {
  let comp = compInfo.touch;
  let rowArray = [];
  let rowZero = compInfo.rowZero;
  let pn;
  let ll = methodInfo.leadLength;
  let rowNum = 1;
  
  for (var i = 0; i < comp.length; i++) {
    let type = comp[i];
    //console.log('building lead of type ' + type);
    let typeName = leadEnds.find(o => o.name == type).fullname;
    pn = methodInfo.placeNot[typeName];
    
    let oneLead = buildLead(rowZero, pn, rowNum);
    if (i == 0) {
      //console.log('first lead pn length', pn.length);
    }
    rowZero = oneLead[oneLead.length-1].bells;
    rowNum = (i+1)*ll + 1;
    rowArray = rowArray.concat(oneLead);
    //console.log('rowArray length: ', rowArray.length);
  }
  
  return finish(rowArray, comp, methodInfo);
}