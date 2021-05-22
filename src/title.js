const stages = require('./stages.json');

module.exports = function buildTitle(input) {
  let html = `<h1 class="results">`;
  
  if (input.methodName == undefined || input.methodName == '') {
    html += input.placeNotation;
  } else {
    let stageName = stages.find(o => o.num == Number(input.stage)).name;
    html += input.methodName + " " + stageName;
    
  }
  
  if (input.quantity == 'plain-course') {
    html += ' - Plain course';
  } else if (input.quantity == 'touch') {
    html += ' - Touch';
  }
  
  html += `</h1>`;
  if (input.complibid && input.complibid.length) {
    html += `<a href="https://complib.org/composition/${input.complibid}" target="blank" class="results">View on complib</a>`;
  }
  return html;
}