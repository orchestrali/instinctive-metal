
const fs = require('fs');
const path = require('path');
const buildForm = require('./buildForm');
const buildFormBL = require('./buildFormBL');
const buildTitle = require('./title');

var formBegin = `</div>
      <form action="/" method="post" autocomplete="off">`;

var formEnd = `<button type="submit">Submit</button>
      </form>
      </div>`;

var svgsBegin = `<div class="grid-container">`;
var svgsEnd = `</div>`;


module.exports = function buildPage(errors, svgs, input) {
  var header = fs.readFileSync(path.join(__dirname, '..', 'views/headerBL.html'));
  var footer = fs.readFileSync(path.join(__dirname, '..', 'views/footer.html'));
  var form = buildForm(input);
  var formBL = buildFormBL(input);
  var anchor;
  var title = '';
  ///*
  if (input == 0 || errors.length > 0) {
    //form = fs.readFileSync(path.join(__dirname, '..', 'views/formBL.html'));
    anchor = '';
  } else {
    //form = buildForm(input);
    title = buildTitle(input);
    anchor = '<a name="svgs"></a>';
  }
  //*/
  function joinErrors() {
    let errorsJoined = '';
    
    for (var j = 0; j < errors.length; ++j) {
      errorsJoined += '<p>' + errors[j] + '</p>';
    }
    return errorsJoined;
  }
  
  
  var page = header + joinErrors() + formBegin + form + formBL + formEnd + anchor + title + svgsBegin + svgs + svgsEnd + footer;

  
  return page;
}


