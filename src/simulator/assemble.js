const elements = require("./elements.js");
const addrope = require("./addrope.js");


module.exports = function assemble(numbells, co) {
  let arr = [];
  let pealspeed = Math.ceil((2*numbells+1)*2.3/numbells*252/6);
  let hours = Math.floor(pealspeed/60);
  let minutes = pealspeed % 60;
  arr.push(hours, minutes);
  let opts = '';
  let bells = ``;
  let start = Math.floor(numbells/2)+1;
  let j = start;
  for (let i = 1; i <= numbells; i++) {
    if (i > 1) {
      opts += `<option value="${i}">${i}</option>
      `;
    }
    bells += addrope(j);
    j += (i%2 === 1 ? -i : i);
  }
  let cosally = co ? `<li><input type="checkbox" name="cosallies" id="cosallies" />Color sallies based on coursing order</li>` : "";
  arr.push(opts, cosally, bells);
  let html = elements[0];
  for (let i = 0; i < arr.length; i++) {
    html += arr[i] + elements[i+1];
  }
  return html;
}