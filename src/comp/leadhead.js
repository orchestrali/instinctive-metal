const rounds = require('../rounds.js');
const places = require('../places.js');

//take compInput and generate a row array of the leadhead
module.exports = function leadhead(compInput, stage) {
  
  let rowZero;
  //if leadhead is rounds, generate the correct length row array
  if (compInput.leadhead == 'rounds') {
    rowZero = rounds(stage);
    //console.log('leadhead is rounds', rowZero);
  } else if (compInput.otherLeadhead) {
    //if leadhead is not rounds, convert it to array of numbers
    let row = compInput.otherLeadhead.split('');
    rowZero = [];
    for (var i = 0; i < stage; ++i) {
      rowZero.push(places.indexOf(row[i])+1);
    }
    
  }
  /*
  //create rowZeroObj
  let rowZeroObj = {};
      rowZeroObj.rowNum = 0;
      rowZeroObj.bells = rowZero;
  leadhead.rowArray = rowZero;
  leadhead.rowObj = rowZeroObj;
      //add tenor to odd-bell methods
      if (stage % 2 == 1) {
        leadhead.rowObj.bells.push(stage + 1);
      }
  */
  
  //console.log(rowZero);
  //return leadhead;
  return rowZero;
}