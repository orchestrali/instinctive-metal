const places = require('../places');

//info needed: bluebell, blue color, rowZero
module.exports = function buildSVG(rowZero, numRows, displayInput) {
  let bluebell = Number(displayInput.blueBell);
  let blueplace = rowZero.indexOf(bluebell)+1;
  let score = displayInput.keepscore ? true : false;
  
  let rowZeroStr = "";
  for (var i = 0; i < rowZero.length; i++) {
    rowZeroStr += places[rowZero[i]-1] + " ";
  }
  
  let cx = 120 - 8*(rowZero.length-6) + (blueplace-1)*16;
  let textx = 115 - 8*(rowZero.length-6);
  let scoreboard = '';
  let errY = 390;
  let placenumY = 370;
  if (score) {
    errY = 370;
    placenumY = 350;
    scoreboard = `    <rect class="translucent" x="50" y="375" width="220" height="24" />
      <g id="scoreboard" style="font-family: Verdana; fill: #000;">
        <text x="157" y="392" text-anchor="end" id="change-count">Changes: 0</text>
        <text x="183" y="392" id="err-count">Errors: 0</text>
      </g>`
  }
  
  let numbers = `<g id="numbers" style="font-family: Verdana; fill: #000;">
      <text x="`+textx+`" y="40">` + rowZeroStr + `</text>
    </g>
`;
  
  let height = numRows*20+370;
  let placelines = '';
  let placenums = '';
  
  if (!displayInput.numbers) {
    //numbers = '';
    placelines += `<g id="placelines" style="stroke: rgb(155,155,155); stroke-width: 1; fill: none;" stroke-dasharray="5 2">
`;
    for (var i = 0; i < rowZero.length; i++) {
      let x = textx+5+i*16;
      placelines += `  <path d="M ${x} 42
    v ${height}" />
`
    }
    placelines += `</g>`
    placenums += `  <rect fill="white" x="${textx}" y="${placenumY-10}" width="${rowZero.length*16}" height="13" />
  <g id="placenums" style="fill: rgb(155,155,155); font-family: Verdana; font-size: 10px" text-anchor="center">
`
    for (var i = 0; i < rowZero.length; i++) {
      placenums += `<text x="${textx+2+i*16}" y="${placenumY}">${i+1}</text>
`
    }
    placenums += `</g>`
  }
  
  
  let svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="320" height="400">
  
  <rect x="0" y="0" width="320" height="400" style="stroke: #000; fill: none;" />
  
  <svg id="container" viewBox="0 0 320 400" width="320">
    
    ${placelines}
  
    ${numbers}
  
    <g id="callMarkers" style="font-family: Verdana; fill: #000;">
    </g>
  
    <g id="LHlines" style="stroke: black; stroke-width: 1; fill: none;">
    </g>
  
    <g id="treblepath" style="stroke: red; stroke-width: 1; fill:none;">
    </g>
  
    <g id="bluepath" style="stroke: ` + displayInput.blueBellc + `; stroke-width:2; fill:none;">
    </g>
    <circle id="bluecircle" cx="`+cx+`" cy="34" r="3" fill="` + displayInput.blueBellc + `">
    </circle>
  
  </svg>
  ${placenums}
  <rect id="err-rect" class="invisible" x="50" y="${errY-17}" width="220" height="24" />
  <text x="87" y="${errY}" id="errors" style="font-family: Verdana; fill: crimson;"></text>
  ${scoreboard}
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
<div class="finished">
  <p>That's all! <button id="restart" type="button">Restart</button></p>
  <p></p>
</div>
`;

  return [svg];
}