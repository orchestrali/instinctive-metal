module.exports = function buildFormG(input) {
  let form = `<div id="appearance" class="category">
  <p class="bold">
    Display options
  </p>
`
  //tenor(s)
  form += `<p>
    <label for="tenors">Tenor(s) behind: </label>
    <input type="number" id="tenors" name="tenors" value="${input.tenors}" />
  </p>`
  
  return '';
}