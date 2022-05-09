const bells = require("../library/bells.js");
const rounds = require("../rounds.js");

module.exports = function buildplayer(stage, input, rowArr, rowzero) {
  //console.log("building player");
  //stage needs to actually be numbells
  console.log(rowArr[0]);
  let rowspeed = input.sounds === "hand" ? 2 : 2.4;
  let pealspeed = Math.ceil((2*stage+1)*rowspeed/stage*250/6); //peal speed in minutes assuming 2second row and including handstroke gap
  let hours = Math.floor(pealspeed/60);
  let minutes = pealspeed % 60;
  if (rowArr[0].rowNum === 0) rowArr.shift();
  for (let i = 0; i < Number(input.numrounds); i++) {
    let row = {
      rownum: 0-i,
      bells: rowzero
    }
    rowArr.unshift(row);
  }
  let current = bells.filter(b => b.type === input.sounds);
  let bellarr = [];
  for (let i = stage; i > 0; i--) {
    let bell = {
      bell: current[stage-i].bell,
      num: i,
      url: current[stage-i].url
    }
    bellarr.push(bell);
  }
  let script = `<script class="results">window.rowArray = ${JSON.stringify(rowArr)};
                        window.numrounds = ${input.numrounds};
                        window.bells = ${JSON.stringify(bellarr)};
                        window.numbells = ${stage}
                </script>`;
  let info = {
    rowArray: rowArr,
    numrounds: input.numrounds,
    bells: bellarr,
    numbells: stage
  }
  let player = `
      <div id="player" class="results">
        <img id="wait" alt="Loading..." src="https://cdn.glitch.com/0db7d9ca-f427-4a0a-8bb6-165118dc0eaf%2Fwait.gif?v=1602790171222" />
        <div id="playbutton" class="button"><div id="playarrow"></div><label>Play</label></div>
        <div id="pausebutton" class="button"><div id="pausesymbol"></div><label>Pause</label></div>
        <div id="playreset" class="button"><div id="rewindrect"></div><div id="rewindarrow"></div><label>Return to beginning</label></div>
        <div id="pealspeed">Pealspeed: <input type="number" min="1" step="1" name="hours" id="hours" value="${hours}"/><label for="hours">hours</label><input type="number" min="0" max="59" step="1" name="minutes" id="minutes" value="${minutes}"/><label for="minutes">minutes</label></div>
        <div><input type="checkbox" id="indicate" checked name="indicate" /><label for="indicate">Indicate current row</label></div>
      </div>
`;
  console.log("pealspeed "+hours+"h"+minutes);
  return {script: script, player: player};
}