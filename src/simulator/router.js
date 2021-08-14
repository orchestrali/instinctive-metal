const assemble = require("./assemble.js");
const bells = require("../library/bells.js");
const rounds = require("../rounds.js");
const words = ["call","type","name"];

module.exports = function router(numbells, rowArr, rowzero, method) {
  let current = bells.filter(b => b.type === "tower");
  let bellarr = [];
  for (let i = numbells; i > 0; i--) {
    let bell = {
      bell: current[numbells-i].bell,
      num: i,
      url: current[numbells-i].url,
      stroke: 1
    }
    bellarr.push(bell);
  }
  let rows = [{row: rowzero.map(b => [b])},{row: rowzero.map(b => [b])}];
  if (rowArr[0].rowNum === 0 && rowArr[0].call) {
    rows[0].call = rowArr[0].call;
  } else {
    rows[0].call = "Go "+(method.name.length ? method.name : "next time");
  }
  for (let i = 0; i < rowArr.length; i++) {
    if (rowArr[i].rowNum > 0) {
      let row = {
        row: rowArr[i].bells.map(b => [b])
      }
      words.forEach(w => {
        if (rowArr[i][w]) {
          row[w] = rowArr[i][w];
        }
      });
      rows.push(row);
    }
  }
  let script = `<link rel="stylesheet" href="/simulator.css" class="results" />
  <script class="results">window.rowArray = ${JSON.stringify(rows)};
    window.bells = ${JSON.stringify(bellarr)}
    window.numbells = ${numbells};
    window.hunts = ${JSON.stringify(method.hunts)};
    window.methodstage = ${method.stage};
  </script>`;
  let results = {
    script: script,
    html: assemble(numbells)
  }
  return results;
}