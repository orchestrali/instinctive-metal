

module.exports = function buildForm(input) {
  
  let blueOptions = '<option value disabled selected></option>';
  
  if (input != 0) {
    
    for (var i = 1; i <= input.stage; ++i) {
      //build dropdown menu for blue bell options
      var option = '<option value="' + i + '">' + i + '</option>';
      blueOptions += option;
      
  
    }
  }
  
  
  let form = `
        <div id="appearance">
          <p class="bold">
            Practice options
          </p>
          <div id="practice-options">
            
              
              <ul>
                <li>
                  <input type="checkbox" checked id="huntbells" name="huntbells" value="draw-hunts" />
                  <label for="huntbells">Draw hunt bell line(s)</label>
                  
                </li>
              </ul>
            
          
          <p>
            <label for="blueBell">
              <span>Practice on bell:</span>
            </label>
            <select id="blueBell" name="blueBell" >
              ` + blueOptions + `
            </select>
            <label for="blueBellc">
              color:
            </label>
            <input type="text" id="blueBellc" name="blueBellc" value="blue"/>
          </p>
       
          </div>
          
        </div>
        
     `;
  
  return form;
}