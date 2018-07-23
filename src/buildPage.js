
const fs = require('fs');
const path = require('path');
const buildForm = require('./buildForm');
const buildTitle = require('./title');

var formBegin = `</div>
      <form action="/graphs" method="post" autocomplete="off">`;

var formEnd = `<button type="submit">Submit</button>
      </form>
      </div>`;


module.exports = function buildPage(errors, svgs, input) {
  var header = fs.readFileSync(path.join(__dirname, '..', 'views/header.html'));
  var footer = fs.readFileSync(path.join(__dirname, '..', 'views/footer.html'));
  var form = buildForm(input);
  var anchor;
  var title = '';
  var page;
  ///*
  
  if (input == 0 || errors.length > 0) {
    //form = fs.readFileSync(path.join(__dirname, '..', 'views/form.html'));
    anchor = '';
  } else {
    title = buildTitle(input);
    anchor = '<a name="svgs"></a>';
  }
  page = header + joinErrors() + formBegin + form + formEnd + anchor + title + loopSVG() + footer;
  //*/
  function joinErrors() {
    let errorsJoined = '';
    
    for (var j = 0; j < errors.length; ++j) {
      errorsJoined += '<p>' + errors[j] + '</p>';
    }
    return errorsJoined;
  }
  
  function loopSVG() {
    let body = '';
    for (var j = 0; j < svgs.length; ++j) {
     //console.log('svg ' + (j + 1) + ' added');
      body += svgs[j];  
    }
    return body;
  }
  
  //var page = header + joinErrors() + formBegin + form + formEnd + anchor + title + loopSVG() + footer;

  
  return page;
}


