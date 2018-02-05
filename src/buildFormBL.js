

module.exports = function buildForm(input) {
  
  let blueOptions = '<option value disabled selected></option>';
  
  if (input != 0) {
    //build dropdown menu for blue bell options
    for (var i = 1; i <= input.stage; ++i) {
      var option = '<option value="' + i + '">' + i + '</option>';
      blueOptions += option;
    }
  }
  
  
  let form = `
        <div id="appearance">
          <p class="bold">
            Display options
          </p>
          <p>
            <label for="blueBell">
              <span>Show blue line for bell:</span>
            </label>
            <select id="blueBell" name="blueBell" >
              ` + blueOptions + `
            </select>
          </p>
          <p>
            <input type="checkbox" id="pagination" name="pagination" value="paginate">
    <label for="pagination">Include page breaks</label>
          </p>
        </div>
        
     `;
  
  return form;
}