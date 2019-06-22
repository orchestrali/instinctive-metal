const parseLH = require('./leadhead.js');
const parseTouch = require('./composition.js');
const addTenor = require('../rowArray/addTenor.js');

//take compInput and generate compInfo object with rowZero (array), rowZeroObj, quantity, touch, touchType
module.exports = function compInfo(compInput, stage) {
  let compObject = {
    quantity: compInput.quantity,
    tenors: Number(compInput.tenors)
  };
  
  let rowZero = parseLH(compInput, stage);
  compObject.rowZero = rowZero;
  //console.log("comp handleinput", rowZero);
  
  let rowZeroObj = {
    rowNum: 0,
    bells: []
  };
  
  for (var i = 0; i < stage; i++) {
    rowZeroObj.bells.push(rowZero[i]);
  }
  
  if (compObject.tenors > 0) {
    addTenor(stage, [rowZeroObj], compObject.tenors)
  }
  
  compObject.rowZeroObj = rowZeroObj;
  
  if (compInput.quantity == 'touch') {
    compObject.touch = parseTouch(compInput.comp, compInput.touchType);
    compObject.touchType = compInput.touchType;
    //right now obsbell is always the tenor
    compObject.obsBell = stage;
    //compObject.touchType = 'leadend';
  }
  
  console.log(compObject);
  return compObject;
}