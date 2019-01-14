const build = require("./buildSystem.js");
const lines = require("./stafflines.js");
const clef = require("./clef.js");

//assemble a single system
module.exports = function assemble(rows, numBells, width, last) {
  let stafflines = lines(width-5);
  let things = build(rows, numBells, last);
  
  let svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${width}" height="90" class="staff">
    <!--test-->
    <text x="40" y="40" style="font-family:Helsinki; fill:black; font-size:36px">4</text>
    <text x="40" y="60" style="font-family:Helsinki; fill:black; font-size:36px">4</text>

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