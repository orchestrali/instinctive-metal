const printRows = require('./printRows.js');
const printPaths = require('./printPaths.js');
const printCalls = require('./printCalls.js');
const leadheads = require('./leadLines.js');
const printpn = require('./printPN.js');
const addMethod = require('./methods.js');

module.exports = function printSVG(rowArray, pathArray, info) {
  //console.log(rowArray[0]);
  //height of the whole svg
  let height = rowArray.length*20;
   //width of svg including rows + margin
  let gridWidth = rowArray[0].bells.length*16 + 38;
  let x = 40;
  let pn = info.displayPN && rowArray[0].rowNum <= info.leadLength ? printpn(info.placeNot.plain) : "";
  if (pn.length) {
    let max = Math.max(...info.placeNot.plain.filter(e => e != "x").map(e => e.length));
    if (max > 3) {
      gridWidth += (max-3)*9;
      x += (max-3)*9;
    }
  }
  let rows = info.displayNums ? printRows(rowArray, x) : "";
  let paths = printPaths(pathArray, rowArray, x+5);
  let calls = printCalls(rowArray);
  let lines = leadheads(gridWidth, rowArray.filter(r => r.name).map(r => r.rowNum), x-2);
  let methods = rowArray.some(r => r.method) ? addMethod(rowArray, x) : "";
  if (methods.length) gridWidth += 250;
  
  let svg = `<div class="grid"><svg class="grid" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="` + gridWidth + `" height="` + height + `">
` + rows + lines + pn + calls + paths + methods + `</svg></div>`
  //console.log(svg);
  return [svg];
}