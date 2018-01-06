var stages = [
  {
    num: 4,
    name: 'Minimus',
  },
  {
    num: 5,
    name: 'Doubles',
  },
  {
    num: 6,
    name: 'Minor',
  },
  {
    num: 7,
    name: 'Triples',
  },
  {
    num: 8,
    name: 'Major',
  },
  {
    num: 9,
    name: 'Caters',
  },
  {
    num: 10,
    name: 'Royal',
  },
  {
    num: 11,
    name: 'Cinques',
  },
  {
    num: 12,
    name: 'Maximus',
  },
  ];

module.exports = function buildForm(input) {
  let rounds;
  let other;
  let otherLeadhead;
  let oneLead;
  let plainCourse;
  let placeNot = 'value="' + input.placeNotation + '"';
  let options = '<option value disabled>required</option>';
  
  for (var i = 0; i < stages.length; ++i) {
    var option = '<option value="' + stages[i].num + '"' + function() {
      if (Number(input.stage) == stages[i].num) {
        return 'selected';
      }
    }() + '>' + stages[i].num + ' - ' + stages[i].name + '</option>';
    options += option;
  }
  
  if (input.leadhead == 'rounds') {
    rounds = 'checked ';
    other = '';
    otherLeadhead = '';
  } else if (input.leadhead == 'other') {
    rounds = '';
    other = 'checked ';
    otherLeadhead = 'value="' + input.otherLeadhead + '"';
  }
  
  if (input.quantity == 'one-lead') {
    oneLead = 'checked ';
    plainCourse = '';
  } else if (input.quantity == 'plain-course') {
    oneLead = '';
    plainCourse = 'checked ';
  }
  
  let form = `</div>
      <form action="/" method="post">
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
          </p>
          <p>
            <label for="placeNotation">
              <span>Place notation:</span>
            </label>
            <input type="text" ` + placeNot + ` id="place-notation" name="placeNotation" required minlength="1"/>
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
            (Touches coming soon!)
            </li>
          </ul>
          </fieldset>
          
        </div>
        
        <!--<input type="text" cols="80" rows="30" maxlength="5000" /> -->
        <button type="submit">Submit</button>
      </form>
      </div>`;
  
  return form;
}