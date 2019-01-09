const buildCompare = require('./buildInputs.js');

module.exports = function display() {
  let comparisons = buildCompare(8, 31);
  
  let page = `<!DOCTYPE html>
<html>
  <head>
    <title>Change Ringing Stuff</title>
  </head>
  <body>
    <table>
      <thead>
        <tr>
          <th>Method 1</th>
          <th>Method 2</th>
          <th>Rows shared</th>
        </tr>
      </thead>`
  
  for (var i = 0; i < comparisons.length; ++i) {
    let comp = comparisons[i];
    let tr = `<tr><td>${comp.method1}</td><td>${comp.method2}</td><td>${comp.numSame}</td></tr>`
    page += tr;
  }
  
  page += `</table></body></html>`
  
  
  return page;
}