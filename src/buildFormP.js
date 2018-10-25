

module.exports = function buildForm(input) {
  
  let blueOptions = '<option value disabled selected></option>';
  
  if (input != 0) {
    
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
  
  
  let form = `
<div id="appearance" class="category">
  <p class="bold">
    Practice options
  </p>
  
  <div class="input">
    <label for="huntbells">
      <input type="checkbox" checked id="huntbells" name="huntbells" value="draw-hunts" />
      Draw hunt bell line(s)
    </label>
  </div>
  <div class="input">
    <span>
      <label for="blueBell">
        Practice on bell:
      </label>
      <select id="blueBell" name="blueBell" >
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
  
</div>
        
     `;
  
  return form;
}