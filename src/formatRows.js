const fs = require('fs');

var template = {
  rowNum: 1,
  handBack: 'hand',
  bells: [],
};



module.exports = function formatRows() {
  var inputRows = fs.readFileSync(__dirname + '/rows3.txt', 'utf8');
  var numBells = inputRows.indexOf('\n');
  var rowArray = [];
  
  //console.log(inputRows[4]);
  for (var i = 0; i < inputRows.length /(numBells + 1); ++i) {
    let row = {};
    row.rowNum = i + 1;
    
    if (i % 2 == 0) {
      row.handBack = 'hand';
    } else if (i % 2 == 1) {
      row.handBack = 'back';
    }
    
    let inputRow = inputRows.slice((numBells+1)*i, (numBells+1)*i + numBells);
    
    row.bells = inputRow.split('');
    
    row.bells = row.bells.map(function(x) {
      if (x == '0') {
        return 10;
      } else if (x == 'E') {
        return 11;
      } else if (x == 'T') {
        return 12;
      } else {
        return x*1;
      }
    });
    
    /* for (var j = 0; j < numBells; ++j) {
      let bellNum = inputRows[(numBells+1)*i + j];
      if (bellNum == 0) {
        row.bells.push(10);
      } else if (bellNum == 'E') {
        row.bells.push(11);
      } else if (bellNum == 'T') {
        row.bells.push(12);
      } else {
      row.bells.push(inputRows[(numBells+1)*i + j]);
      }
    } */
    //console.log(row);
    rowArray.push(row);
  }
  return rowArray;
  //console.log(rowArray);
  //console.log(fs.readFileSync(__dirname + '/rows.txt', 'utf8'));
};