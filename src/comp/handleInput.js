const parseLH = require('./leadhead.js');
const parseTouch = require('./composition.js');

//take compInput and generate compInfo object with rowZero (array), rowZeroObj, quantity, touch, touchType
module.exports = function compInfo(compInput, stage) {
  let compObject = {};
  compObject.quantity = compInput.quantity;
  
  compObject.rowZero = parseLH(compInput, stage).rowArray;
  compObject.rowZeroObj = parseLH(compInput, stage).rowObj;
  
  if (compInput.quantity == 'touch') {
    compObject.touch = parseTouch(compInput.touch, compInput.touchType);
    compObject.touchType = compInput.touchType;
  }
  
  return compObject;
}