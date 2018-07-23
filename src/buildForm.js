
const findMethod = require('./findMethod.js');
const stages = require('./stages.js');
const methodNames = require('../methodNames.json');


module.exports = function buildForm(input) {
  let rounds = 'checked';
  let other = '';
  let otherLeadhead = '';
  let oneLead = 'checked';
  let plainCourse = '';
  let touch = '';
  let composition = '';
  let bobPN = 'disabled';
  let bobStart = 'disabled';
  let singlePN = 'disabled';
  let singleStart = 'disabled';
  let placeNot = '';
  let placeNotReq = '';
  var classOptions = '';
  var methodOptions = '';
  var methodPlaceholder = '';
  let calloptions = "hidden";
  //stage options
  let options = '';
  
  if (input != 0) {
    options += '<option value disabled>required</option>';
    //build dropdown menu for stage
    for (var i = 0; i < stages.length; ++i) {
      var option = '<option value="' + stages[i].num + '"' + function() {
        if (Number(input.stage) == stages[i].num) {
          return 'selected';
        }
      }() + '>' + stages[i].num + ' - ' + stages[i].name + '</option>';
      options += option;
    }
    placeNot = 'value="' + input.placeNotation + '"';
    //select radio button for starting row
    if (input.leadhead == 'rounds') {
      rounds = 'checked ';
      other = '';
      otherLeadhead = '';
    } else if (input.leadhead == 'other') {
      rounds = '';
      other = 'checked ';
      otherLeadhead = 'value="' + input.otherLeadhead + '"';
    }
    //select radio button for quantity
    if (input.quantity == 'one-lead') {
      oneLead = 'checked ';
      plainCourse = '';
      touch = '';
    } else if (input.quantity == 'plain-course') {
      oneLead = '';
      plainCourse = 'checked ';
      touch = '';
    } else if (input.quantity == 'touch') {
      oneLead = '';
      plainCourse = '';
      touch = 'checked ';
      composition = 'value="' + input.touch + '"';
      calloptions = "";
      bobPN = "";
      bobStart = "";
      singlePN = "";
      singleStart = "";

      if (input.bobPlaceNot) {
        bobPN = 'value="' + input.bobPlaceNot + '"';
        bobStart = 'value="' + input.bobStart + '"';
      }
      if (input.singlePlaceNot) {
        singlePN = 'value="' + input.singlePlaceNot + '"';
        singleStart = 'value="' + input.singleStart + '"';
      }

    }
    var classArray = methodNames.find(o => o.stage == Number(input.stage)).classes;
    var classes = [];
    for (var i = 0; i < classArray.length; i++) {
        if (classArray[i].methods.length > 0) {
          classes.push(classArray[i].class);
        }
      }
    
    if (input.methodClass == "") {
      methodPlaceholder = "Select a stage and class to search methods";
    }
    //var methods = findMethod(input).methods;

    for (var i = 0; i < classes.length; ++i) {
        classOptions += '<option value="' + classes[i] + '"' + function() {
          if (classes[i] == input.methodClass) {
            return 'selected';
          }
        }() + '>' + classes[i] + '</option>';
      }
/*
    for (var i = 0; i < methods.length; ++i) {
      methodOptions += '<option value="' + methods[i].name + '"' + function() {
        if (methods[i].name == input.methodName) {
          return 'selected';
        }
      }() + '>' + methods[i].name + '</option>';
    }
    */
    if (input.methodName != undefined && input.methodName != '') {
      placeNotReq = '';
    }
  } else if (input == 0) {
    options += '<option value disabled selected>required</option>'
    methodPlaceholder = "Select a stage and class to search methods";
    //build dropdown menu for stage
    for (var i = 0; i < stages.length; ++i) {
      var option = '<option value="' + stages[i].num + '">' + stages[i].num + ' - ' + stages[i].name + '</option>';
      options += option;
    }
  }
  
  
  
  
  
  let form = `
        <div id="method-info">
          <p class="bold">
            Method info
          </p>
          <p>
            <label for="stage">
              <span>Stage:</span>
            </label>
            <select id="stage" name="stage" required>` + options + `
            </select>
            <label for="methodClass">
              <span>Method class:</span>
            </label>
            <select id="class" name="methodClass" >
              <option value= disabled selected></option>
              ` + classOptions + `
            </select>
          </p>
          <p id="methodSearch">
            
            <label for="methodName">
              <span class="methodName">Search for a method:</span>
            </label>
            <input type="text" id="methodName" name="methodName" placeholder="`+ methodPlaceholder +`" autocomplete="off"/>
              <ul id="methodList">
                
              </ul>
          </p>
          <p>
            <label for="placeNotation">
              <span>Place notation:</span>
            </label>
            <input type="text" ` + placeNot + ` id="place-notation" name="placeNotation" ` + placeNotReq + ` minlength="1" autocomplete="off"/>
          </p>
          
          <fieldset>
            <legend>
              Leadhead to begin from
            </legend>
            <ul>
              <li>
                <label for="rounds">
                  <input type="radio" id="rounds" name="leadhead" value="rounds" ` + rounds + `
/>
                  Rounds
                </label>
              </li>
              <li>
                <label for="leadhead">
                  <input type="radio" id="other" name="leadhead" value="other" ` + other + `
/>
                  Other: 
                  <input type="text" ` + otherLeadhead + ` id="leadhead" name="otherLeadhead" />
                </label>
              </li>
            </ul>
          </fieldset>
          
        </div>
        <div id="quantity">
          <fieldset>
            <legend>
              Quantity
            </legend>
          
          <ul>
            <li>
              <label for="one-lead">
                <input type="radio" id="one-lead" name="quantity" value="one-lead" ` + oneLead + `/>
                One lead
              </label>
            </li>
            <li>
              <label for="plain-course">
                <input type="radio" id="plain-course" name="quantity" value="plain-course" ` + plainCourse + `/>
                Plain course
              </label>
            </li>
            <li>
            
              <label for="touch">
                <input type="radio" id="touch" name="quantity" value="touch" ` + touch + ` />
                Touch (lead end notation): 
                <input type="text" id="touchNot" name="touch" ` + composition + `/>
              </label>
            </li>
          </ul>
        </fieldset>
        </div>
        <div id="call-info" `+calloptions+`>
          <p class="bold">
            Call details
          </p>
          <fieldset id="calls">
            <legend>Common Calls</legend>
            <ul>
            <li><label for="typea">
                <input type="radio" id="typea" name="callType" value="a" />
                4th place bob<br/>234 single (23 on doubles)
              </label>
            </li>
            <li><label for="typeb">
                <input type="radio" id="typeb" name="callType" value="b" />
                n-2 bob<br/>n-2, n-1 single
              </label>
            </li>
            <li><label for="typed">
                <input type="radio" id="typed" name="callType" value="d" />
                early 3rds bob<br/>long 3rds & 2nds single
              </label>
            </li>
          </ul>
          </fieldset>
          <p>Custom Calls</p>
          <ul>
            <li id="bob">
              Bob info
              <ul>
                <li>
                  <label for="bobPlaceNot">
                    Place notation:
                  </label>
                  <input type="text" class="bob" id="bobPlaceNot" name="bobPlaceNot" ` + bobPN + ` />
                </li>
                
                <li>
                  <label for="bobStart">
                    Starting at row
                  </label>
                  <input type="number" class="bob" id="bobStart" name="bobStart" ` + bobStart + ` />
                </li>
              </ul>
            </li>
            <li id="single">
              Single info
              <ul>
                <li>
                  <label for="singlePlaceNot">
                    Place notation:
                  </label>
                  <input type="text" class="single" id="singlePlaceNot" name="singlePlaceNot" ` + singlePN + ` />
                </li>
                
                <li>
                  <label for="singleStart">
                    Starting at row
                  </label>
                  <input type="number" class="single" id="singleStart" name="singleStart" ` + singleStart + ` />
                </li>
              </ul>
            </li>
          </ul>
          
        </div> 
        
        `;
  
  return form;
}