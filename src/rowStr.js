const places = require('./places.js');

module.exports = function rowStr(row) {
  let str = "";
  
  for (var i = 0; i < row.length; i++) {
    str += places[row[i]-1];
  }
  
  return str;
}