
const fs = require('fs');
const path = require('path');
const buildForm = require('./buildForm');
const buildFormP = require('./buildFormP');
const buildTitle = require('./title');

var formBegin = `</div>
      <form action="/practice" method="post" autocomplete="off">`;

var formEnd = `<button type="submit">Submit</button>
      </form>
      </div>`;

var svgsBegin = `<div class="grid-container">`;
var svgsEnd = `</div>`;


module.exports = function buildPage(errors, svgs, input) {
  var header1 = fs.readFileSync(path.join(__dirname, '..', 'views/headerP.html'));
  var header2 = fs.readFileSync(path.join(__dirname, '..', 'views/headerP2.html'));
  var footerP = fs.readFileSync(path.join(__dirname, '..', 'views/footerP.html'));
  var foot = fs.readFileSync(path.join(__dirname, '..', 'views/footer.html'));
  var form = buildForm(input);
  var formP = buildFormP(input);
  var anchor;
  var title = '';
  var script = '';
  var svg = svgs.svg;;
  var footer;
  
  if (svgs.script) {
    console.log("script exists");
    script = svgs.script;
    //console.log(svg);
  }
  ///*
  if (input == 0 || errors.length > 0) {
    //form = fs.readFileSync(path.join(__dirname, '..', 'views/formBL.html'));
    anchor = '';
    footer = foot;
  } else {
    //form = buildForm(input);
    title = buildTitle(input);
    anchor = '<a name="svgs"></a>';
    footer = footerP;
  }
  //*/
  function joinErrors() {
    let errorsJoined = '';
    
    for (var j = 0; j < errors.length; ++j) {
      errorsJoined += '<p>' + errors[j] + '</p>';
    }
    return errorsJoined;
  }
  
  
  var page = header1 + script + header2 + joinErrors() + formBegin + form + formP + formEnd + anchor + title + svgsBegin + svg + svgsEnd + footer;

  
  return page;
}


