const build = require("./buildSystem.js");
const lines = require("./stafflines.js");
const clef = require("./clef.js");

//assemble a single system
module.exports = function assemble(rows, numBells, width) {
  let stafflines = lines(width-5);
  let things = build(rows, numBells);
  
  let svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${width}" height="80">

    <!--staff lines-->
    <g style="stroke:black; stroke-width:1; fill:none; ">
      ${stafflines} 
    </g>
    <!--clef-->
    ${clef}

    <!--noteheads-->
    <g style="stroke:black; stroke-width:1; fill:black; ">
      ${things.noteheads}
    </g>
    <!--stems-->
    <g style="stroke:black; stroke-width:1.5; fill:none; ">
      ${things.stems}
    </g>
    <!--ledger lines-->
    <g style="stroke:black; stroke-width:1.2; fill:none; ">
      ${things.ledgers}
    </g>
    <!--bar lines-->
    <g style="stroke:black; stroke-width:1; fill:black; ">
      ${things.barlines}
    </g>

</svg>
`
  
  return svg;
}