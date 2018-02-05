const buildLead = require('./oneLeadArray.js');
const rounds = require('../rounds.js');
const places = require('../places');
const methodSVG = require('./methodSVG.js');


module.exports = function composition(rowArray, blue, leadLength) {
  let svgs = [];
  let numLeads = 1;
  let rowZeroObj = {};
  rowZeroObj.rowNum = 0;
  
  if (leadLength > 41) {
    leadLength = leadLength/2;
  }
  //determine how many leads will fit vertically on a page.
 while ((numLeads+1)*leadLength < 40) {
   numLeads++;
 }
  console.log('numLeads: ', numLeads);
  console.log('rowArray length: ', rowArray.length);
  //number of rows per column
  let numRows = numLeads*leadLength;
  console.log('rows per column: ', numRows);
  //determine how many columns will be required
  let numSVGs = Math.ceil((rowArray.length-1)/(numRows));
  console.log('number of columns: ', numSVGs);
  
  let firstRowArray = rowArray.slice(0,numRows+1);
  svgs.push(methodSVG(firstRowArray, blue));
  //build SVGs with chunks of the rowArray containing numLeads*leadLength rows
  for (var j = 1; j < numSVGs; ++j) {
    let shortArray = rowArray.slice(j*numRows,(j+1)*numRows+1);
    svgs.push(methodSVG(shortArray, blue));
  }
  
  return svgs.join(' ');
}