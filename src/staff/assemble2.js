const buildNotes = require('./buildNotes.js');
const lines = require("./stafflines.js");
const clef = require("./clef.js");
const keysigs = require('./keysigs.js');
const timesig = require('./timesig.js');
const barline = require('./barlines.js');

module.exports = function assemble(rows, numBells, displayInfo, first, last) {
  let keyInfo = keysigs(displayInfo.keysig);
  let startx = keyInfo.startx;
  let time = '';
  
  if (first && displayInfo.timesig) {
    let results = timesig(displayInfo.timesig, startx)
    startx = results.startx;
    time = results.text;
    //do the timesig function, sending keyInfo.startx? should get back an updated startx
  }
  
  let things = buildNotes(displayInfo.actTenor, startx, displayInfo.gap, rows, numBells);
  let width = things.barEnds[things.barEnds.length-1];
  let stafflines = lines(width);
  let barlines = barline(things.barEnds, last);
  let barNum = rows[0].rowNum;
  
  let svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${width+5}" height="120" class="staff">
  <!--staff lines-->
    <g style="stroke:black; stroke-width:1; fill:none; ">
      ${stafflines} 
    </g>
    <!--clef-->
    ${clef}
    <!--keysig-->
    ${keyInfo.sig}
    <!--time sig would go here-->
    ${time}
    <!--noteheads-->
    <g style="stroke:black; stroke-width:1; fill:black; " class="noteheads">
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
    <!--rests-->
    <g style="stroke:black; stroke-width:1; fill:black; ">
      ${things.rests}
    </g>
    <!--bar lines-->
    <g style="stroke:black; stroke-width:1; fill:black; " class="barlines">
      ${barlines}
    </g>
    <!--bar number-->
    <text x="2" y="10" style="font-family:Verdana; font-size:10px">${barNum}</text>

</svg>
`
  return svg;
}