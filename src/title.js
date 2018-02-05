

module.exports = function buildTitle(input) {
  let html = `<h1>`;
  
  if (input.methodName == undefined || input.methodName == '') {
    html += input.placeNotation;
  } else {
    html += input.methodName;
  }
  
  if (input.quantity == 'plain-course') {
    html += ' - Plain course';
  } else if (input.quantity == 'touch') {
    html += ' - Touch';
  }
  
  html += `</h1>`;
  return html
}