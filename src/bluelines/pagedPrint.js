const printMethod = require('./printMethod.js');

module.exports = function composition(rowArray, pathArray, info) {
  console.log(rowArray[0]);
  let svgs = [];
  let numLeads = 1;
  let leadLength = info.leadLength;
  
  if (leadLength > 41) {
    leadLength = leadLength/2;
  }
  //determine how many leads will fit vertically on a page.
 while ((numLeads+1)*leadLength < 40) {
   numLeads++;
 }
  //number of rows per column
  let numRows = numLeads*leadLength;
  console.log('rows per column: ', numRows);
  //determine how many columns will be required
  let numSVGs = Math.ceil((rowArray.length-1)/(numRows));
  console.log('number of columns: ', numSVGs);
  let firstRowArray = rowArray.slice(0,numRows+1);
  
  svgs.push(printMethod(firstRowArray, pathArray, info));
  //build SVGs with chunks of the rowArray containing numLeads*leadLength rows
  for (var j = 1; j < numSVGs; ++j) {
    let shortArray = rowArray.slice(j*numRows,(j+1)*numRows+1);
    if (rowArray[0].description) shortArray[0].description = true;
    svgs.push(printMethod(shortArray, pathArray, info));
  }
  
  return svgs;
}