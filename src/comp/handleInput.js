const parseLH = require('./leadhead.js');
const parseTouch = require('./composition.js');
const addTenor = require('../rowArray/addTenor.js');

//take compInput and generate compInfo object with rowZero (array), rowZeroObj, quantity, touch, touchType
module.exports = function compInfo(compInput, stage) {
  let compObject = {
    quantity: compInput.quantity,
    tenors: compInput.tenors ? Number(compInput.tenors) : 0
  };
  
  let rowZero = parseLH(compInput, stage);
  
  
  let rowZeroObj = {
    rowNum: 0,
    bells: []
  };
  
  for (var i = 0; i < stage; i++) {
    rowZeroObj.bells.push(rowZero[i]);
  }
  
  if (compObject.tenors > 0) {
    for (let i = 0; i < compObject.tenors; i++) {
      rowZeroObj.bells.push(stage+1+i);
    }
  }
  compObject.rowZero = rowZero;
  compObject.rowZeroObj = rowZeroObj;
  
  if (compInput.quantity == 'touch') {
    compObject.touch = parseTouch(compInput.comp, compInput.touchType);
    compObject.touchType = compInput.touchType;
    //right now obsbell is always the tenor
    compObject.obsBell = stage;
    //compObject.touchType = 'leadend';
  }
  
  
  return compObject;
}