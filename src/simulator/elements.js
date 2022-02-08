
module.exports = [
  `
  <div id="options" class="results">
    <label for="volume">Volume</label>
    <input type="range" id="volume" min="0" max="2" value="1" step="0.01" class="block"/>
    <label for="duration">Stroke duration in seconds: </label>
    <input id="duration" type="number" value="1.3" step="0.1" />
    <label for="handgap">Handstroke gap in bells: </label>
    <input id="handgap" type="number" value="1" step="1" min="0" />
    <ul id="simulatoropts">
      <li>
        Pealspeed: 
        <input type="number" min="1" step="1" name="hours" id="hours" value="`,
  //hours
  `"/><label for="hours">hours</label>
      <input type="number" min="0" max="59" step="1" name="minutes" id="minutes" value="`,
  //minutes
  `"/><label for="minutes">minutes</label>
      </li>
      <li>
        <label for="roundsrows">Rows of rounds to start: </label>
        <input type="number" min="2" step="1" name="roundsrows" id="roundsrows" value="2" />
      </li>
      <li>
        <input type="checkbox" name="stopatrounds" id="stopatrounds" checked /><label for="nthrounds">Stop at the <input type="number" name="nthrounds" id="nthrounds" min="1" step="1" value="1" />th occurence of rounds</label>
      </li>
      <li>
        <input type="checkbox" name="waitforgaps" id="waitforgaps" checked /><label for="waitforgaps">Wait for human ringer</label>
      </li>
      <li>
        <input type="checkbox" name="standbehind" id="standbehind" /><label for="standbehind">Give robot my bell</label>
      </li>
      <li>
        <input type="checkbox" name="melouder" id="melouder" /><label for="melouder">Play my bell louder</label>
      </li>
    </ul>
    <label for="myrope">My rope:</label>
    <select id="myrope">
      <option value="1" selected>1</option>
      `,
  //bell/rope options
  `
    </select>

    <ul>
    `,`
      <li><input type="checkbox" name="solidme" id="solidme" />Give my rope a solid-color sally</li>
      <li><input type="checkbox" name="solidtreble" id="solidtreble" />Give the treble a solid-color sally</li>
      <li class="following"><input type="checkbox" name="highlightunder" id="highlightunder" />Highlight the rope I should follow (lead when my rope is highlighted)</li>
      <li class="following"><input type="checkbox" name="fadeabove" id="fadeabove" />Fade the ropes above me</li>
      <li class="displayplace"><input type="checkbox" name="displayplace" id="displayplace" />Display the place I should be in</li>
      <li class="displayplace"><input type="checkbox" name="instructions" id="instructions" />Display method instructions</li>
    </ul>
    <label for="mykeys">
      Keyboard controls
    </label>
    <input type="text" id="mykeys" value="1j" />
    <ul id="conduct">
      <li id="start">Start</li>
      <li id="reset" class="disabled">Reset</li>
    </ul>

  </div>
  <div id="room" class="results">
    <div id="display">

    </div>
    <div id="bells">
      <div id="callcontainer">

      </div>
      `,
  //bells!
  `
    </div>
    <div id="display2">
      <div id="roomzoom">
        <ul>
          <li>
            <label for="left-right">Left-right</label>
            <input type="range" id="left-right" min="0" max="600" step="5" value="180"/>
          </li>
          <li>
            <label for="up-down">Up-down</label>
            <input type="range" id="up-down" min="0" max="500" step="5" value="250"/>
          </li>
          <li>
            <label for="zoom">Zoom</label>
            <input type="range" id="zoom" min="0" max="200" step="5" value="0"/>
          </li>
          <li>
            <label for="depth">Depth</label>
            <input type="range" id="depth" min="50" max="1100" step="5" />
          </li>
        </ul>

      </div>
    </div>
  </div>`
];