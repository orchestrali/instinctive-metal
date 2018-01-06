const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

const lexer = require('./parse/lexer.js');
const buildPage = require('./buildPage.js');
const parsePN = require('./parsePlaceNotation.js');
const buildRows = require('./build/rowArray.js');
const parseLH = require('./parse/leadhead.js');
const rounds = require('./rounds.js');
const buildSVGs = require('./buildSVGs.js');
const touchInfo = require('./parse/touchInfo.js');
const completePN = require('./parse/touchPN.js');

module.exports = function handleInput(input) {
  var numBells = Number(input.stage);
  //console.log(input);
  var errors = lexer(input.placeNotation, numBells)[0];
  var tokens = lexer(input.placeNotation, numBells)[1];
  var rowZero;
  var bobInfo = 'none';
  var singleInfo = 'none';
  var composition = [];
  var width = 270;
  var placeNotArray = [parsePN(tokens, numBells)];
  console.log(placeNotArray);
  
  if (input.leadhead == 'rounds') {
    rowZero = rounds(numBells);
  } else if (input.leadhead == 'other') {
    errors = errors.concat(parseLH(input.otherLeadhead, numBells)[0]);
    rowZero = parseLH(input.otherLeadhead, numBells)[1];
  }
  
  console.log(rowZero);
  console.log('quantity', input.quantity);
  //console.log('bob info first', bobInfo);
  
  if (input.quantity == 'one-lead') {
    composition.push('one-lead');
  } else if (input.quantity == 'plain-course') {
    composition.push('plain-course');
  } else if (input.quantity == 'touch') {
    errors = errors.concat(touchInfo(input)[0]);
    bobInfo = touchInfo(input)[1][0];
    singleInfo = touchInfo(input)[1][1];
    console.log('bob info', bobInfo);
    console.log('single info', singleInfo);
    composition.push('touch', touchInfo(input)[2]);
    
    let addBob = completePN(placeNotArray, bobInfo, numBells);
    console.log('addBob', addBob);
    errors = errors.concat(addBob[0]);
    placeNotArray = addBob[1];
    let addSingle = completePN(placeNotArray, singleInfo, numBells);
    errors = errors.concat(addSingle[0]);
    placeNotArray = addSingle[1];
  }
  
  //console.log('bob info after', bobInfo);
  
  
  if (errors.length > 0) {
    return buildPage(errors, []);
  } else {
    //let placeNotArray = completePN(parsePN(tokens, numBells), bobInfo, numBells)[1];
    let rowArray = buildRows(placeNotArray, rowZero, composition);
    let svgs = buildSVGs(rowArray, width);
  //console.log(results);
    return buildPage([], svgs, input);
  }
}
