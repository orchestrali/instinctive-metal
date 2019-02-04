const findhunt = require("../method/findHunt.js");
const placeArray = require("../placeArray/buildArray.js");
const stringify = require("./stringify.js");
const buildSVG = require("./buildSVG.js");
const tutorial = require("../tutorial/test.js");

//take a row array and choice of bell to practice & whether to draw hunt bells
//info needs to include: draw hunts or not, bluebell, plainPN, stage, bluebell color!
//place arrays need to include row zero! row array to put on page must not include row zero
module.exports = function handle(rowArray, info, displayInput) {
  let huntArray = [];
  rowArray.unshift(info.rowZeroObj);
  
  let bluebell = Number(displayInput.blueBell);
  
  if (displayInput.tutorial) {
    rowArray = tutorial(rowArray, bluebell, info.stage);
  }
  let rowZero = rowArray[0];
  //generate place array(s) for hunt bell(s)
  if (displayInput.huntbells == "draw-hunts") {
    let huntbells = findhunt(info.placeNot, info.stage, info.comp);
    
    for (var i = 0; i < huntbells.length; i++) {
      let array = placeArray(rowArray, huntbells[i]);
      huntArray.push(array);
    }
  }
  
  //generate place array for blue bell
  let blueArray = placeArray(rowArray, bluebell);
  //create script with row array and place arrays
  let script = '<link rel="stylesheet" href="/practicestyle.css">' + stringify(rowArray, huntArray, blueArray);
  //build SVG
  
  let svg = buildSVG(rowZero, rowArray.length, displayInput);
  let results = {};
  results.script = script;
  results.svg = svg;
  return results;
}