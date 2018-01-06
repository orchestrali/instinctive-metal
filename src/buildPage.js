
const fs = require('fs');
const path = require('path');
const buildForm = require('./buildForm');


module.exports = function buildPage(errors, svgs, input) {
  var header = fs.readFileSync(path.join(__dirname, '..', 'views/header.html'));
  var footer = fs.readFileSync(path.join(__dirname, '..', 'views/footer.html'));
  var form;
  ///*
  if (input == 0) {
    form = fs.readFileSync(path.join(__dirname, '..', 'views/form.html'));
  } else {
    form = buildForm(input);
  }
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
  
  var page = header + joinErrors() + form + loopSVG() + footer;

  
  return page;
}


