

module.exports = function buildForm(input) {
  
  let blueOptions = '<option value disabled selected></option>';
  let advLines = '';
  
  if (input != 0) {
    
    for (var i = 1; i <= input.stage; ++i) {
      //build dropdown menu for blue bell options
      var option = '<option value="' + i + '"' + function() {
        if (Number(input.blueBell) == i) {
          return 'selected';
        }
      }() + '>' + i + '</option>';
      blueOptions += option;
      //build options for blue lines for every bell
      var li = '<li><label for="bell' + i + 'w" >Line for bell ' + i + ': </label><select id="bell' + i + 'w" name="bell' + i + `w">
              <option value="1" selected>thin</option>
              <option value="2">thick</option>`
      + `</select>
          <label for="bell` + i + `c">
              color:
            </label>
            <input type="text" id="bell` + i + `c" name="bell` + i + `c" /></li>`;
      advLines += li;
      
    }
  }
  
  
  let form = `
<div id="appearance" class="category">
  <p class="bold">
    Display options
  </p>
  <p>
    <input type="checkbox" checked id="show-nums" name="numbers" value="show" />
    <label for="numbers">Show numbers</label>
  </p>
  <div id="basic-lines">
    <div class="input" id="hunt-bells">
      <span>
        <label for="huntBellw">
          Draw hunt bell line(s): 
        </label>
        <select id="huntBellw" name="huntBellw">
          <option value="1" selected>thin</option>
          <option value="2">thick</option>
        </select>
      </span>
      <span>
        <label for="huntColor">
          color:
        </label>
        <input type="text" id="huntColor" name="huntColor" value="red"/>
      </span>
    </div>
    <div class="input">
      <span>
        <label for="blueBell">
          Draw path for bell:
        </label>
        <select id="blueBell" name="blueBell" >
          ` + blueOptions + `
        </select>
        <label for="blueBellw">
        </label>
        <select id="blueBellw" name="blueBellw">
          <option value="1">thin</option>
          <option value="2" selected>thick</option>
        </select>
      </span>
      <span>
        <label for="blueBellc">
          color:
        </label>
        <input type="text" id="blueBellc" name="blueBellc" value="blue"/>
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
  <div id="bellgroups">
    <button class="return-basic" id="from-groups" type="button">
    Return to basic options
    </button>
    <p>
      Draw lines for: 
    </p>
    <ul>
      <li id="group1">
        <span>
          <label for="blueGroup1"></label>
          <select id="blueGroup1" name="blueGroup1">
          </select>
          <label for="blueGroup1w"></label>
          <select id="blueGroup1w" name="blueGroup1w">
          </select>
        </span>
        <span>
          <label for="blueGroup1c">
            color:
          </label>
          <input type="text" id="blueGroup1c" name="blueGroup1c" disabled/>
        </span>
      </li>
      <li id="group2">
        <span>
          <label for="blueGroup2"></label>
          <select id="blueGroup2" name="blueGroup2">
          </select>
          <label for="blueGroup2w"></label>
          <select id="blueGroup2w" name="blueGroup2w">
          </select>
        </span>
        <span>
          <label for="blueGroup2c">
            color:
          </label>
          <input type="text" id="blueGroup2c" name="blueGroup2c" disabled/>
        </span>
      </li>
    </ul>
  </div>
  <div id="everyline">
    <button class="return-basic" id="from-all" type="button">
    Return to basic options
    </button>
    <ul>
      
    </ul>
  </div>
  <p>
    <input type="checkbox" id="pagination" name="pagination" value="paginate">
    <label for="pagination">Include page breaks</label>
  </p>
</div>
     `;
  
  return form;
}