const fillForm = require("./bluelines/formOpts.js");

module.exports = function buildForm(input) {
  
  let formInfo = fillForm(input);
  
  
  let form = `
<div id="appearance" class="category">
  <p class="bold">
    Display options
  </p>
  <p>
    <input type="checkbox" ${formInfo.numbers} id="show-nums" name="numbers" value="show" />
    <label for="numbers">Show numbers</label>
    <input type="checkbox" ${formInfo.pn} id="show-pn" name="pn" value="show" />
    <label for="pn">Show place notation</label>
  </p>
`
  //basic lines
  form += `<div id="basic-lines" ${formInfo.basicDisplay}>
    <div class="input hunts" id="hunt-bells">
      <span>
        <label for="huntBellw">
          Draw hunt bell line(s): 
        </label>
        <select class="weight hunts" id="huntBellw" name="huntBellw">
          ${formInfo.huntW}
        </select>
      </span>
      <span>
        <label for="huntColor">
          color:
        </label>
        <input type="text" id="huntColor" class="hunts" name="huntColor" ${formInfo.huntC}/>
      </span>
    </div>
    <div class="input">
      <span>
        <label for="blueBell">
          Draw path for bell:
        </label>
        <select id="blueBell" name="blueBell" >
          ${formInfo.blueOptions}
        </select>
        <label for="blueBellw">
        </label>
        <select id="blueBellw" name="blueBellw">
          ${formInfo.blueW}
        </select>
      </span>
      <span>
        <label for="blueBellc">
          color:
        </label>
        <input type="text" id="blueBellc" name="blueBellc" ${formInfo.blueC}/>
      </span>
    </div>
    <p>
    Advanced options: 
      <button id="line-groups" type="button">
        Set lines for bell groups
      </button>
      <button id="every-line" type="button">
        Set line for each bell
      </button>
    </p>
  </div>
  `
  //lines for bell groups
  form += `<div id="bellgroups" ${formInfo.groupDisplay}>
    <button class="return-basic" id="from-groups" type="button">
    Return to basic options
    </button>
    <p>
      Draw lines for: 
    </p>
    <ul>
      ${formInfo.bellGroups}
    </ul>
  </div>
  `
  //lines for every bell
  form += `<div id="everyline" ${formInfo.everyDisplay}>
    <button class="return-basic" id="from-all" type="button">
    Return to basic options
    </button>
    <ul>
      ${formInfo.everyline}
    </ul>
  </div>
  <p>
    <input type="checkbox" ${formInfo.pagination} id="pagination" name="pagination" value="paginate">
    <label for="pagination">Include page breaks</label>
  </p>
</div>
     `;
  
  return form;
}