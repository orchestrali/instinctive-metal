const rounds = require('../rounds.js');

//take compInput and generate a row array and a row object of the leadhead
module.exports = function leadhead(compInput, stage) {
  let leadhead = {};
  //if leadhead is rounds, generate the correct length row array
  if (compInput.leadhead == 'rounds') {
    leadhead.rowArray = rounds(stage);
  } else if (compInput.otherLeadhead) {
    //if leadhead is not rounds, convert it to array of numbers
    let row = compInput.otherLeadhead.split('');
    let rowZero = [];
    for (var i = 0; i < stage; ++i) {
      if (row[i] == '0') {
        rowZero.push(10);
      } else if (row[i] == 'E') {
        rowZero.push(11);
      } else if (row[i] == 'T') {
        rowZero.push(12);
      } else if (row[i]*1 > 0 && row[i]*1 < 10) {
        rowZero.push(Number(row[i]));
      }
    }
    leadhead.rowArray = rowZero;
  }
  //create rowZeroObj
  let rowZeroObj = {};
      rowZeroObj.rowNum = 0;
      rowZeroObj.bells = leadhead.rowArray;
      //add tenor to odd-bell methods
      if (stage % 2 == 1) {
        rowZeroObj.bells.push(stage + 1);
      }
  leadhead.rowObj = rowZeroObj;
  
  return leadhead;
}