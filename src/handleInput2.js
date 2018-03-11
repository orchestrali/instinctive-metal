
const lexer = require('./parse/lexer.js');
const buildPage = require('./buildPage.js');
const parsePN = require('./placeNot/parse.js');
const buildRows = require('./build/rowArray.js');
const parseLH = require('./parse/leadhead.js');
const rounds = require('./rounds.js');
const buildSVGs = require('./buildSVGs.js');
const touchComp = require('./parse/touchComp.js');
const touchInfo = require('./parse/touchInfo.js');
const completePN = require('./parse/touchPN.js');
const findMethod = require('./findMethod.js');
const methodSVG = require('./build/methodSVG.js');
const pagedSVGs = require('./build/leadsSVG.js');
const bluelineSVGs = require('./bluelines/handleInput.js');
const buildPageBL = require('./buildPageBL.js');

module.exports = function handleInput(input, type) {
  var numBells = Number(input.stage);
  var knownMethod = input.methodName;
  console.log('known method: ', knownMethod);
  var errors = [];
  var tokens = [];
  var placeNotArray = [];
  var callLoc;
  var leadLength;
  var info = {};
  info.numBells = numBells;
  
  if (knownMethod == undefined || knownMethod == '') {
    errors = lexer(input.placeNotation, numBells)[0];
    tokens = lexer(input.placeNotation, numBells)[1];
    placeNotArray = [parsePN(tokens, numBells)];
    leadLength = placeNotArray.length;
  } else {
    placeNotArray = findMethod(input).placeNot;
    callLoc = findMethod(input).callLoc;
    leadLength = findMethod(input).leadLength;
  }
  var rowZero;
  var bobInfo = 'none';
  var singleInfo = 'none';
  var composition = [];
  var width = 270;
  //console.log(placeNotArray);
  
  //parse beginning leadhead
  if (input.leadhead == 'rounds') {
    rowZero = rounds(numBells);
  } else if (input.leadhead == 'other') {
    errors = errors.concat(parseLH(input.otherLeadhead, numBells)[0]);
    rowZero = parseLH(input.otherLeadhead, numBells)[1];
  }
  
  info.rowZero = rowZero;
  console.log(rowZero);
  console.log('quantity', input.quantity);
  //console.log('bob info first', bobInfo);
  
  //parse quantity/composition and complete place notation array
  if (input.quantity == 'one-lead') {
    composition.push('one-lead');
  } else if (input.quantity == 'plain-course') {
    composition.push('plain-course');
  } else if (input.quantity == 'touch') {
    //check for errors in the composition
    errors = errors.concat(touchComp(input.touch)[0]);
    //turn composition into an array
    composition.push('touch', touchComp(input.touch)[1]);
    //add call info to place notation array
    if (knownMethod == undefined || knownMethod == '') {
      bobInfo = touchInfo(input)[1][0];
      singleInfo = touchInfo(input)[1][1];
      callLoc = Number(input.bobStart);
      leadLength = Number(input.bobFreq);
      console.log('bob info', bobInfo);
      console.log('single info', singleInfo);
      let addBob = completePN(placeNotArray, bobInfo, numBells);
      console.log('addBob', addBob);
      errors = errors.concat(addBob[0]);
      placeNotArray = addBob[1];
      let addSingle = completePN(placeNotArray, singleInfo, numBells);
      errors = errors.concat(addSingle[0]);
      placeNotArray = addSingle[1];
    }
    
  }
  
  info.leadLength = leadLength;
  info.plainPN = placeNotArray[0];
  //console.log('bob info after', bobInfo);
  
  if (errors.length > 0) {
    return buildPage(errors, [], input);
  } else {
    let rowArray = buildRows(placeNotArray, rowZero, composition, callLoc);
    console.log(rowArray);
    if (type == 'graphs') {
      let svgs = buildSVGs(rowArray, width);
      return buildPage([], svgs, input);
    } else if (type == 'grid') {
      let svgs = bluelineSVGs(input, info, rowArray);
      return buildPageBL([], svgs, input);
    } 
  }
}
