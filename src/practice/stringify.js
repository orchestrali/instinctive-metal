const places = require('../places');

module.exports = function stringify(rowArray, huntpaths, bluepath) {
  rowArray.shift();
  let rows = [];
  for (var i = 0; i < rowArray.length; i++) {
    let row = [];
    for (var j = 0; j < rowArray[i].bells.length; ++j) {
      
      //take each number in the array of bells and find the character that represents it in the places string
      let number = rowArray[i].bells[j];
      row.push(places[number-1]);
    }
    rows.push(row);
  }
  
  let script = `<script> window.rowObjArr = ${JSON.stringify(rowArray)}
                        window.rowArray = ${JSON.stringify(rows)}
                        window.huntpaths = ${JSON.stringify(huntpaths)}
                        window.bluepath = ${JSON.stringify(bluepath)}
                </script>`
  
  return script;
}