const printRows = require('./printRows.js');
const printPaths = require('./printPaths.js');
const printCalls = require('./printCalls.js');
const leadheads = require('./leadheadLines.js');

module.exports = function printSVG(rowArray, pathArray, info) {
  //console.log(rowArray[0]);
  //height of the whole svg
  let height = rowArray.length*20;
   //width of svg including rows + margin
  let gridWidth = rowArray[0].bells.length*16 + 38;
  let rows;
  if (info.displayNums) {
    rows = printRows(rowArray);
  } else {
    rows = "";
  }
  let paths = printPaths(pathArray, rowArray);
  let calls = printCalls(rowArray);
  let lines = leadheads(gridWidth, rowArray.length, info);
  
  let svg = `<div class="grid"><svg class="grid" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="` + gridWidth + `" height="` + height + `">
` + rows + lines + calls + paths + `</svg></div>`
  //console.log(svg);
  return [svg];
}