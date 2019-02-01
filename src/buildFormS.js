const collections = [{tenor: 'G♭', keysig: '6 flats'},{tenor: 'G', keysig: '1 sharp'},{tenor: 'A♭', keysig: '4 flats'},{tenor: 'A', keysig: '3 sharps'},{tenor: 'B♭', keysig: '2 flats'},{tenor: 'B', keysig: '5 sharps'},{tenor: 'C', keysig: '0'},{tenor: 'D♭', keysig: '5 flats'},{tenor: 'D', keysig: '2 sharps'},{tenor: 'E♭', keysig: '3 flats'},{tenor: 'E', keysig: '4 sharps'},{tenor: 'F', keysig: '1 flat'},{tenor: 'F♯', keysig: '6 sharps'}];
const checked = ['gap', 'includeTime', 'rowzero', 'mobile'];
const formOpts = require('./staff/formOpts.js');

module.exports = function buildFormS(input) {
  //form with staff notation options will go here
  let checkboxes = {
    gap: "checked",
    includeTime: "checked",
    rowzero: "checked",
    mobile: "",
    tenors: 0
  };
  let formInput = {
    tenOpts: '<option value disabled selected></option>',
    timeOpts: ''
  }
  
  let time = `class="hidden"`;
  
  if (input != 0) {
    formInput = formOpts(input);
    for (var i = 0; i < checked.length; i++) {
      if (input[checked[i]]) {
        checkboxes[checked[i]] = "checked";
      } else {
        checkboxes[checked[i]] = "";
      }
    }
    checkboxes.tenors = input.tenors;
    if (input.includeTime) {
      time = '';
    }
  }
  
  
  
  let form = `<div id="appearance" class="category">
  <p class="bold">
    Display options
  </p>
  `
  //tenor(s)
  form += `<p>
    <label for="tenors">Tenor(s) behind: </label>
    <input type="number" id="tenors" name="tenors" value="${checkboxes.tenors}" />
  </p>`
  
  //handstroke gap
  form += `<p>
    <input type="checkbox" ${checkboxes.gap} id="handstroke-gap" name="gap" value="yes" />
    <label for="gap">Include handstroke gap</label>
  </p>
`
  
  //time sig
  form += `<div id="timesig" class="input">
    <p>
      <input type="checkbox" ${checkboxes.includeTime} id="time-sig" name="includeTime" value="yes" />
      <label for="includeTime">Include time signature</label>
    </p>
    <div id="timeOpts" ${time}>
              <fieldset>
                <legend>
                  Time signature
                </legend>
                <ul>
                  ${formInput.timeOpts}
                </ul>
              </fieldset>
            </div>
  </div>`
  
  let keyOpts = '';
  for (var i = collections.length-1; i >= 0; i--) {
    let option = '<option value="' + collections[i].tenor + '" ' + function() {
      if (input.keysig == collections[i].tenor || (!input.keysig && collections[i].tenor == 'C')) {
        return 'selected';
      } else {
        return '';
      }
    }() + '>' + collections[i].tenor + ' / ' + collections[i].keysig + '</option>';
    keyOpts += option;
  }
  
  //tenor/key sig
  form += `<div class="input">
    <span>
      <label for="keysig">
        Tenor/key signature:
      </label>
      <select id="keysig" name="keysig">
        ${keyOpts}
      </select>
    </span>
    <span>
      <label for="actTenor">
        Acting tenor: 
      </label>
      <select id="actTenor" name="actTenor">
        ${formInput.tenOpts}
      </select>
    </span>
  </div>`
  
  //include rowZero
  form += `<p>
    <input type="checkbox" ${checkboxes.rowzero} id="rowzero" name="rowzero" value="yes" />
    <label for="rowzero">Include starting leadhead</label>
  </p>
`;
  
  //mobile view
  form += `<p>
    <input type="checkbox" ${checkboxes.mobile} id="mobile" name="mobile" value="yes" />
    <label for="mobile">Mobile version</label>
  </p>
</div>`;
  
  return form;
}