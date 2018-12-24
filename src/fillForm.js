const stages = require('./stages.js');
const methodNames = require('../methodNames.json');

const defaults = {
  checkblank: {value: '', vars: ['other', 'plaincourse', 'touch', 'leadend', 'callplace', 'a', 'b', 'd', 'cust']},
  inputblank: {value: '', vars: ['placeNotation', 'methodName', 'otherLeadhead', 'comp']},
  checked: {value: 'checked', vars: ['rounds', 'onelead']},
  disabled: {value: 'disabled', vars: ['bobPlaceNot', 'bobStart', 'singlePlaceNot', 'singleStart']},
};

const categories = {
  option: ['stage', 'methodClass'],
  text: ['placeNotation', 'methodName', 'otherLeadhead', 'bobPlaceNot', 'bobStart', 'singlePlaceNot', 'singleStart'],
  check: [{key: 'callType', values: ['a', 'b', 'd', 'cust']}, {key:'leadhead', values: ['rounds', 'other']}, {key: 'quantity', values: ['onelead', 'plaincourse', 'touch']}, {key: 'touchType', values: ['leadend', 'callplace']}]
}



module.exports = function fillForm(input) {
  let formInput = {};
  //console.log('input: ', input);
  
  //no input
  if (Object.keys(input).length == 0) {
    //console.log('no input');
    for (var key in defaults) {
      for (var j = 0; j < defaults[key].vars.length; j++) {
        formInput[defaults[key].vars[j]] = defaults[key].value;
      }
    }
    
    formInput.touchinfo = 'hidden';
    formInput.options = buildStages(0);
    formInput.classOptions = '<option value disabled selected></option>';
    formInput.methodPlaceholder = "Select a stage and class to search methods";
  } else {
    //yes input
    //console.log('yes input');
    //stage options
    formInput.options = buildStages(Number(input.stage));
    //put input into text fields
    for (var i = 0; i < categories.text.length; i++) {
      formInput[categories.text[i]] = 'value="' + input[categories.text[i]] + '"';
    }
    formInput.comp = input.comp;
    //check appropriate boxes
    for (var i = 0; i < categories.check.length; i++) {
      let checkbox = categories.check[i];
      for (var j = 0; j < checkbox.values.length; j++) {
        if (checkbox.values[j] == input[checkbox.key]) {
          formInput[checkbox.values[j]] = "checked";
        } else {
          formInput[checkbox.values[j]] = "";
        }
      }
    }
    //touch stuff visible
    if (input.quantity == 'touch') {
      formInput.touchinfo = '';
    } else {
      formInput.touchinfo = 'hidden';
    }
    
    
    //classes
    if (input.methodClass == "") {
      formInput.methodPlaceholder = "Select a stage and class to search methods";
      formInput.classOptions = '';
    } else {
      formInput.methodPlaceholder = '';
      formInput.classOptions = '<option value="Plain">Plain</option>'
      
      //find class options for the stage
      var classArray = methodNames.find(o => o.stage == Number(input.stage)).classes;
      var classes = [];
      for (var i = 0; i < classArray.length; i++) {
        if (classArray[i].methods.length > 0) {
          classes.push(classArray[i].class);
        }
      }
      //add class options
      for (var i = 0; i < classes.length; ++i) {
        let text;
        if (classes[i] == "Bob" || classes[i] == "Place" || classes[i] == "Slow Course") {
          text = "- " + classes[i];
        } else {
          text = classes[i];
        }
        formInput.classOptions += '<option value="' + classes[i] + '" ' + function() {
          if (classes[i] == input.methodClass) {
            return 'selected';
          }
        }() + '>' + text + '</option>';
      }
    }
    
    
  }
  
  
  function buildStages(stage) {
    let options = '<option value disabled '+ function() {
        if (stage == 0) {
          return 'selected';
        }
      }() + '>required</option>';
    //build dropdown menu for stage
    for (var i = 0; i < stages.length; ++i) {
      var option = '<option value="' + stages[i].num + '"' + function() {
        if (stage == stages[i].num) {
          return 'selected';
        }
      }() + '>' + stages[i].num + ' - ' + stages[i].name + '</option>';
      options += option;
    }
    return options;
  }
  
  return formInput;
}