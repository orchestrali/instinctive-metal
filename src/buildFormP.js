const display = ['numbers', 'huntBellw', 'huntColor', 'blueBell', 'blueBellw', 'blueBellc', 'pagination', 'blueGroup1', 'blueGroup1w', 'blueGroup1c', 'blueGroup2w', 'blueGroup2c', 'blueGroup2', 'huntbells', 'windowWidth', 'rowzero', 'mobile', 'keepscore', 'drawLH', 'tutorial'];

module.exports = function buildForm(input) {
  
  let blueOptions = '<option value disabled selected></option>';
  let huntbells = 'checked', drawLH = 'checked', showNums = 'checked';
  let score = '', tutorial = '';
  
  if (input.stage) {
    for (var i = 1; i <= input.stage; ++i) {
      //build dropdown menu for blue bell options
      var option = '<option value="' + i + '"' + function() {
        if (Number(input.blueBell) == i) {
          return 'selected';
        }
      }() + '>' + i + '</option>';
      blueOptions += option;
    }
  }
  
  if (input != 0 && display.some(e => Object.keys(input).includes(e))) {
    if (input.keepscore) {score = 'checked'};
    if (input.tutorial) {tutorial = 'checked'};
    if (!input.huntbells) {huntbells = ''};
    if (!input.drawLH) {drawLH = ''};
    if (!input.numbers) {showNums = ''};
    
    
  }
  
  
  let form = `
<div id="appearance" class="category">
  <p class="bold">
    Practice options
  </p>
  <div class="input">
    <label for="numbers">
    <input type="checkbox" ${showNums} id="show-nums" name="numbers" value="show" />
    Show numbers</label>
  </div>
  <div class="input">
    <span class="hunts">
      <label for="huntbells">
        <input type="checkbox" ${huntbells} id="huntbells" class="hunts" name="huntbells" value="draw" />
        Draw hunt bell line(s)
      </label>
    </span>
    <span>
      <label for="drawLH">
        <input type="checkbox" ${drawLH} id="drawLH" name="drawLH" value="yes" />
        Draw lead-end lines
      </label>
    </span>
  </div>
  <div class="input">
    <span>
      <label for="blueBell">
        Practice on bell:
      </label>
      <select id="blueBell" name="blueBell" required>
        ` + blueOptions + `
      </select>
    </span>
    <span>
      <label for="blueBellc">
        color:
      </label>
      <input type="text" id="blueBellc" name="blueBellc" value="blue"/>
    </span>
  </div class="input">
  <div class="input">
    <span>
    <label for="keepscore">
      <input type="checkbox" ${score} id="keepscore" name="keepscore" value="yes" />
      Keep score
    </label>
    </span>
    <span>
    <label for="tutorial">
      <input type="checkbox" ${tutorial} id="tutor" name="tutorial" value="yes" />
      Tutorial mode
    </label>
    </span>
  </div>
</div>
        
     `;
  
  return form;
}