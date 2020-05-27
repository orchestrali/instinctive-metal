const stages = require('./stages.json');
const methodNames = require('../methodNames2.json');

const defaults = {
  checkblank: {value: '', vars: ['validName', 'other', 'plaincourse', 'touch', 'leadend', 'callplace', 'a', 'b', 'd', 'cust']},
  inputblank: {value: '', vars: ['placeNotation', 'methodName', 'otherLeadhead', 'comp']},
  checked: {value: 'checked', vars: ['rounds', 'onelead']},
  disabled: {value: 'disabled', vars: ['bobPlaceNot', 'singlePlaceNot', 'callLoc']},
};

const categories = {
  option: ['stage', 'methodClass'],
  text: ['placeNotation', 'methodName', 'otherLeadhead', 'bobPlaceNot', 'bobStart', 'singlePlaceNot', 'singleStart'],
  check: [{key: 'callType', values: ['a', 'b', 'd', 'cust']}, {key:'leadhead', values: ['rounds', 'other'], default: 'rounds'}, {key: 'quantity', values: ['onelead', 'plaincourse', 'touch'], default: 'onelead'}, {key: 'touchType', values: ['leadend', 'callplace', 'numbers']}]
}



module.exports = function fillForm(input) {
  let formInput = {};
  //console.log('input: ', input);
  
  //no input
  if (Object.keys(input).length == 0) {
    console.log('no input');
    //set all the form inputs to their default values
    for (var key in defaults) {
      for (var j = 0; j < defaults[key].vars.length; j++) {
        formInput[defaults[key].vars[j]] = defaults[key].value;
      }
    }
    
    formInput.touchinfo = 'hidden';
    formInput.options = buildStages(0); //stage options
    formInput.classOptions = '<option value selected></option>';
    formInput.methodPlaceholder = "Select a stage and class to search methods";
  } else {
    
    //yes input
    //console.log('yes input');
    //stage options
    formInput.options = buildStages(Number(input.stage));
    formInput.validName = input.validName ? "checked" : "";
    //put input into text fields
    for (var i = 0; i < categories.text.length; i++) {
      let val = input[categories.text[i]];
      if (val) {
        formInput[categories.text[i]] = 'value="' + val + '"';
      } else {
        formInput[categories.text[i]] = '';
      }
    }
    formInput.comp = input.comp ? input.comp : '';
    //check appropriate boxes
    for (var i = 0; i < categories.check.length; i++) {
      let checkbox = categories.check[i];
      for (var j = 0; j < checkbox.values.length; j++) {
        if (!input[checkbox.key] && checkbox.default === checkbox.values[j]) {
          formInput[checkbox.values[j]] = "checked";
        } else if (checkbox.values[j] == input[checkbox.key]) {
          formInput[checkbox.values[j]] = "checked";
        } else {
          formInput[checkbox.values[j]] = "";
        }
      }
    }
    //touch stuff visible
    if (input.quantity == 'touch') {
      formInput.touchinfo = '';
      formInput.compStatus = '';
    } else {
      formInput.touchinfo = 'hidden';
      formInput.compStatus = 'disabled';
    }
    
    
    
    //classes
    if (!input.methodClass || input.methodClass == "") {
      formInput.methodPlaceholder = "Select a stage and class to search methods";
    } else {
      formInput.methodPlaceholder = '';
    }
    
    formInput.classOptions = buildclass(input.methodClass);
    
  }
  
  function buildclass(select) {
    let options = '<option value disabled '+ (select ? "" : "selected") + '></option>';
    if (Number(input.stage) > 0) {
      let classes = stages.find(o => o.num == Number(input.stage)).classes;
      options += '<option value="Plain" ' + (select==="Plain" ? "selected" : "") + '>Plain</option>';
      for (let i = 0; i < classes.length; i++) {
        let text = ["Bob", "Place", "Slow Course"].includes(classes[i]) ? "- "+classes[i] : classes[i];
        options += '<option value="'+classes[i]+'" ' + (select===classes[i] ? "selected" : "") + '>'+text+'</option>';
      }
      
    }
    return options;
  }
  
  
  function buildStages(stage) {
    let options = '<option value disabled '+ function() {
      return stage == 0 ? 'selected' : '';
      }() + '>required</option>';
    //build dropdown menu for stage
    for (var i = 0; i < stages.length; ++i) {
      var option = '<option value="' + stages[i].num + '"' + function() {
        return stage == stages[i].num ? 'selected' : '';
      }() + '>' + stages[i].num + ' - ' + stages[i].name + '</option>';
      options += option;
    }
    return options;
  }
  
  return formInput;
}