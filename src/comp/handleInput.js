const parseLH = require('./leadhead.js');
const parseTouch = require('./composition.js');

//take compInput and generate compInfo object with rowZero (array), rowZeroObj, quantity, touch, touchType
module.exports = function compInfo(compInput, stage) {
  let compObject = {};
  compObject.quantity = compInput.quantity;
  let rowZero = parseLH(compInput, stage);
  compObject.rowZero = rowZero;
  
  let rowZeroObj = {};
      rowZeroObj.rowNum = 0;
      rowZeroObj.bells = rowZero;
  
  compObject.rowZeroObj = rowZeroObj;
  
  if (compInput.quantity == 'touch') {
    compObject.touch = parseTouch(compInput.touch, compInput.touchType);
    compObject.touchType = compInput.touchType;
    //right now obsbell is always the tenor
    compObject.obsBell = stage;
    //compObject.touchType = 'leadend';
  }
  
  console.log(compObject);
  return compObject;
}