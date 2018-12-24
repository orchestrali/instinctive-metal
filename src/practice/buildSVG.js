const places = require('../places');

//info needed: bluebell, blue color, rowZero
module.exports = function buildSVG(bluebell, color, rowZero) {
  let rowZeroStr = "";
  for (var i = 0; i < rowZero.length; i++) {
    rowZeroStr += places[rowZero[i]-1] + " ";
  }
  
  let cx = 120 - 8*(rowZero.length-6) + (bluebell-1)*16;
  let textx = 115 - 8*(rowZero.length-6);
  
  let svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="320" height="400">
  
  <rect x="0" y="0" width="320" height="400" style="stroke: #000; fill: none;" />
    
  <svg id="container" viewBox="0 0 320 400">
    
    
    <g id="numbers" style="font-family: Verdana; fill: #000;">
      <text x="`+textx+`" y="40">` + rowZeroStr + `
      
      </text>

    </g>
    <g id="callMarkers" style="font-family: Verdana; fill: #000;">
    </g>
    <g id="treblepath" style="stroke: red; stroke-width: 1; fill:none;">
      
    </g>
    <g id="bluepath" style="stroke: ` + color + `; stroke-width:2; fill:none;">
      
    </g>
    <circle id="bluecircle" cx="`+cx+`" cy="34" r="3" fill="` + color + `">
      
    </circle>
  </svg>
</svg>

<div class="buttons">
<button class="direction" id="down" type="button" value="-1">Down</button>
<button class="direction" id="stay" type="button" value="0">Stay</button>
<button class="direction" id="up" type="button" value="1">Up</button>
</div>
<div id="arrows">
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="160" height="30">
<g style="stroke:black; stroke-width:2; fill:none;">
  <path d="M40,15 l-20,0 m7,7 l-7,-7 l7,-7" ></path>
  <path d="M88,7 l0,17 m7,-7 l-7,7 l-7,-7">
  </path>
  <path d="M128,15 l20,0 m-7,-7 l7,7 l-7,7">
  </path>
  </g>
</svg>
</div>
<div class="finished">Finished!
<button id="restart" type="button">Restart</button>
</div>
<div id="errors"></div>`;

  return [svg];
}