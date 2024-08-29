const printRows = require('./printRows.js');
const printPaths = require('./printPaths.js');
const printCalls = require('./printCalls.js');
const leadheads = require('./leadLines.js');
const printpn = require('./printPN.js');
const addMethod = require('./methods.js');
const printdescript = require('./printdescript.js');

module.exports = function printSVG(rowArray, pathArray, info) {
  //console.log(rowArray[0]);
  //height of the whole svg
  let height = rowArray.length*20;
   //width of svg including rows + margin
  let gridWidth = rowArray[0].bells.length*16 + 38;
  let x = 40;
  //if the PN should be displayed and this rowArr contains the first lead
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
  let instruct = rowArray[0].description ? printdescript(rowArray, x) : "";
  let methods = rowArray.some(r => r.method) ? addMethod(rowArray, x) : "";
  if (methods.length || rowArray[0].description) gridWidth += 450;
  let hunts = "";
  if (rowArray[0].description && rowArray[0].rowNum === 0 && info.hunts.length) {
    hunts += '<div id="huntdescript">';
    switch (info.hunts.length) {
      case 1:
        hunts += info.hunts[0] === 1 ? "Treble" : info.hunts[0];
        hunts += " is the hunt bell.";
        break;
      case rowArray[0].bells.length:
        hunts += "All bells are hunt bells.";
        break;
      default:
        for (let i = 0; i < info.hunts.length; i++) {
          hunts += info.hunts[i] === 1 ? (i === 0 ? "Treble" : "treble") : info.hunts[i];
          switch (info.hunts.length - i) {
            case 1:
              hunts += " are";
              break;
            case 2:
              hunts += " and ";
              break;
            default:
              hunts += ", ";
          }
        }
        hunts += " hunt bells.";
    }
  }
  
  let svg = `<div class="grid"><svg class="grid" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="` + gridWidth + `" height="` + height + `">
` + rows + lines + pn + calls + paths + methods + instruct + `</svg></div>`
  //console.log(svg);
  return [svg];
}