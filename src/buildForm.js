
const formInfo = require('./fillForm.js');
const stages = require('./stages.json');



module.exports = function buildForm(input) {
  let info = formInfo(input);
  
  //console.log("input: ", input);
  
  //method stage and class
  let form = `
<div id="method-info" class="category">
  <p class="bold">
    Method info
  </p>
  <div class="input">
    <span>
      <label for="stage">
        Stage:
      </label>
      <select id="stage" name="stage" required>` + info.options + `
      </select>
    </span>
    <span>
      <label for="methodClass">
        Method class:
      </label>
      <select id="class" name="methodClass" >
        
        ` + info.classOptions + `
      </select>
    </span>
  </div>
`;
  
  //method name or place notation
  form += `<div class="input" id="methodSearch">
    
    <label for="methodName">
      Search for a method:
    </label>
    <div>
      <input type="text" id="methodName" name="methodName" placeholder="`+ info.methodPlaceholder +`" ${info.methodName} autocomplete="off"/>
      <ul id="methodList">
      </ul>
    </div>
  </div>
  <div class="input">
    <label for="placeNotation">
      Place notation:
    </label>
    <input type="text" ` + info.placeNotation + ` id="place-notation" name="placeNotation" minlength="1" autocomplete="off"/>
  </div>      
</div>
`;

  //starting leadhead
form += `<div id="quantity" class="category">
  <p class="bold">
    Composition info
  </p>
  <fieldset>
    <legend>
      Leadhead to begin from
    </legend>
    <ul>
      <li>
        <label for="rounds">
          <input type="radio" id="rounds" name="leadhead" value="rounds" ` + info.rounds + `/>
          Rounds
        </label>
      </li>
      <li>
        <label for="leadhead">
          <input type="radio" id="other" name="leadhead" value="other" ` + info.other + `/>
          Other: 
          <input type="text" ` + info.otherLeadhead + ` id="leadhead" name="otherLeadhead" />
        </label>
      </li>
    </ul>
  </fieldset>
`;

//quantity
  form += `<fieldset>
    <legend>
      Quantity
    </legend>
    <ul>
      <li>
        <label for="one-lead">
          <input type="radio" id="one-lead" name="quantity" value="onelead" ` + info.onelead + `/>
          One lead
        </label>
      </li>
      <li>
        <label for="plain-course">
          <input type="radio" id="plain-course" name="quantity" value="plaincourse" ` + info.plaincourse + `/>
          Plain course
        </label>
      </li>
      <li>
        <label for="touch">
          <input type="radio" id="touch" name="quantity" value="touch" ` + info.touch + ` />
          Touch
        </label>
      </li>
`;


//composition and type
  form += `    <li id="compinfo" class="${info.touchinfo}">
        <div class="input">
          <fieldset class="borderless">
            <legend>Touch type</legend>
            <ul id="touchtype">
              <li>
                <label for="leadEnd"><input type="radio" id="leadEnd" name="touchType" value="leadend" ${info.leadend}/>
                Lead end </label>
              </li>
              <li>
                <label for="callPlace"><input type="radio" id="callPlace" name="touchType" value="callplace" ${info.callplace}/>
                Call place</label>
              </li>
            </ul>
          </fieldset>
          <div>
            <label for="touchComp">
              <div>Composition:</div>
            </label>
            <textarea id="touchComp" name="comp" rows="3" cols="30" autocomplete="off">${info.comp}</textarea>
          </div>
        </div>
      </li>
    </ul>
  </fieldset>
</div>
`;

//calls
form += `<div id="call-info" class="category ${info.touchinfo}">
  <p class="bold">
    Call details
  </p>
  <fieldset id="calls" class="borderless">
    <ul class="row">
      <li>
        <label for="typea">
          <input type="radio" id="typea" name="callType" value="a" ${info.a}/>
          4th place bob<br/>234 single (23 on doubles)
        </label>
      </li>
      <li>
        <label for="typeb">
          <input type="radio" id="typeb" name="callType" value="b" ${info.b}/>
          n-2 bob<br/>n-2, n-1 single
        </label>
      </li>
      <li>
        <label for="typed">
          <input type="radio" id="typed" name="callType" value="d" ${info.d}/>
          early 3rds bob<br/>2nds & long 3rds single
        </label>
      </li>
    </ul>
    <p><label for="cust">
          <input type="radio" id="cust" name="callType" value="cust" ${info.cust}/>
          Custom calls
        </label></p>
  </fieldset>
  
  <ul class="row">
    <li id="bob">
      <ul>
        <li>
          <label for="bobPlaceNot">
            Bob place notation:
          </label>
          <input type="text" class="bob" id="bobPlaceNot" name="bobPlaceNot" ` + info.bobPlaceNot + ` />
        </li>
        <li>
          <label for="singlePlaceNot">
            Single place notation:
          </label>
          <input type="text" class="single" id="singlePlaceNot" name="singlePlaceNot" ` + info.singlePlaceNot + ` />
        </li>
      </ul>
    </li>
    <li id="single">
      <ul>
        <li>
          <label for="callLoc">
            Starting at row
          </label>
          <input type="number" class="single" id="callLoc" name="callLoc" ` + info.callLoc + ` />
        </li>
      </ul>
    </li>
  </ul>
</div>
        `;
  
  return form;
}