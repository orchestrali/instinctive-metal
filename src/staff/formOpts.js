


module.exports = function formOpts(input) {
  let stage = Number(input.stage);
  let numBells = Number(input.tenors) + stage;
  
  let formInput = {
    tenOpts: tenOpts(input.keysig, numBells, input.actTenor),
    timeOpts: ''
  }
  
  if (input.includeTime) {
    let gap = input.gap ? true : false;
    let handTS = buildTime(numBells);
    let backTS = gap ? buildTime(numBells+1) : [];
    formInput.timeOpts = timeOpts(handTS, backTS, input.timesig);
  }
  
  return formInput;
}

function tenOpts(keysig, numBells, actTen) {
    const sharps = ['G', 'D', 'A', 'E', 'B', 'F♯'];
    const flats = ['F', 'B♭', 'E♭', 'A♭', 'D♭', 'G♭'];
    const sds = [4, 1, 5, 2, 6, 3, 7];
    let numChoices = Math.min(13 - numBells, 7);
    let numS = sharps.indexOf(keysig)+1;
    let numF = flats.indexOf(keysig)+1;
    
    let options = `<option value disabled></option>
`;
    let letter = getChar(keysig, numChoices-1);
    for (var i = 0; i < numChoices; i++) {
      let selected = letter == actTen ? 'selected' : '';
      let sd = numChoices-i;
      let a = '';
      
      if (numS > 0) {
        if (sds.reverse().slice(0, numS).indexOf(sd) > -1) {
          a = '♯';
        }
        sds.reverse();
      }
      if (numF > 0 && sds.slice(0, numF).indexOf(sd) > -1) {
        a = '♭';
      }
      
      
      options += `          <option value="${letter}" ${selected}>${letter}${a}</option>
            `;
      letter = getChar(letter, -1);
    }
    let selected = keysig[0]+'P' == actTen ? 'selected' : '';
    options += `        <option value="${keysig[0]}P" ${selected}>${keysig} pentatonic</option>`;
    
    
    return options;
  }


function getChar(char, dir) {
    let current = char.charCodeAt(0);
    let next = current + dir;
    
    while (next < 65) {
      next += 7;
    }
    
    while (next > 71) {
      next -= 7;
    }
    
    return String.fromCharCode(next);
  }
  

function timeOpts(hand, back, timesig) {
    var length = Math.max(hand.length, back.length);
    let options = '';
    let denoms = ['4', '2', '1'];
    let ids = ['quarter', 'half', 'whole']
    
    for (var i = 0; i < length; i++) {
      let handT = hand[i] ? hand[i] : hand[0];
      let handB = hand[i] ? denoms[i] : '4';
      let backT, backB;
      if (back[i]) {
        backT = back[i];
        backB = denoms[i];
      } else if (back[0]) {
        backT = back[0];
        backB = '4';
      } 
      let value = handT + '-' + handB + function() {
        return backT && backB ? `-${backT}-${backB}` : '';
      }();
      let selected = value == timesig ? 'checked' : '';
      let dispvalh = `${handT} <br/> ${handB}`; 
      let dispvalb = backT && backB ? `${backT} <br/> ${backB}` : '';
      
      options += `<li class="time">
        <label for="${ids[i]}">
          <ul class="row">
            <li>
              <input type="radio" id="${ids[i]}" name="timesig" value="${value}" ${selected}/>
            </li>
            <li>
              ${dispvalh}
            </li>
            <li>
              ${dispvalb}
            </li>
          </ul>
        </label>
      </li>`;
    }
    return options;
  }

function buildTime(num) {
    let options = [num];
    if (num % 2 == 0) {
      options.push(num/2);
    }
    if (num % 4 == 0) {
      options.push(num/4);
    }
    return options;
  }