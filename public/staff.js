

$(function() {
  var stage = Number($('select#stage option:checked').val());
  console.log(stage);
  
  $('#stage').change(function() {
    stage = Number($('select#stage option:checked').val());
    let numBells = Number($('input#tenors').val()) + stage;
    let keysig = $('select#keysig option:checked').val();
    
    adjustTime(numBells);
    tenOpts(keysig, numBells);
  });
  
  $('#time-sig').change(function() {
    if (!$('#time-sig').is(':checked')) {
      $('div#timeOpts').slideUp(1000, "swing");
    } else if (stage > 0) {
      let numBells = Number($('input#tenors').val()) + stage;
      adjustTime(numBells);
      //$('div#timeOpts').slideDown(1000, "swing");
    }
    
  });
  
  $('#handstroke-gap').change(function() {
    
    
    stage = Number($('select#stage option:checked').val());
    let numBells = Number($('input#tenors').val()) + stage;
    
    adjustTime(numBells);
    
  });
  
  $('#tenors').change(function() {
    stage = Number($('select#stage option:checked').val());
    let numBells = Number($('input#tenors').val()) + stage;
    let keysig = $('select#keysig option:checked').val();
    
    adjustTime(numBells);
    tenOpts(keysig, numBells);
  });
  
  $('#keysig').change(function() {
    stage = Number($('select#stage option:checked').val());
    let numBells = Number($('input#tenors').val()) + stage;
    let keysig = $('select#keysig option:checked').val();
    
    if (stage > 0) {
      tenOpts(keysig, numBells);
    }
    
  });
  
  
  
  function tenOpts(keysig, numBells) {
    const sharps = ['G', 'D', 'A', 'E', 'B', 'F♯'];
    const flats = ['F', 'B♭', 'E♭', 'A♭', 'D♭', 'G♭'];
    const sds = [4, 1, 5, 2, 6, 3, 7];
    let numChoices = Math.min(13 - numBells, 7);
    let numS = sharps.indexOf(keysig)+1;
    let numF = flats.indexOf(keysig)+1;
    
    let options = '';
    let letter = getChar(keysig, numChoices-1);
    for (var i = 0; i < numChoices; i++) {
      let selected = i == numChoices-1 ? "selected" : "";
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
    options += `        <option value="${keysig[0]}P">${keysig} pentatonic</option>`;
    
    $('select#actTenor > option').remove();
    
    $('select#actTenor').append(options);
    
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
  
  function adjustTime(stage) {
    $('div#timeOpts > fieldset > ul > li').remove();
    
    let gap;
    if ($('#handstroke-gap').is(':checked')) {
      gap = true;
      //console.log('include handstroke gap');
    }
    
    let handTS = buildTime(stage);
    let backTS = gap ? buildTime(stage+1) : [];
    
    if ($('#time-sig').is(':checked')) {
      
      
      $('div#timeOpts > fieldset > ul').append(timeOpts(handTS, backTS));
    
      $('div#timeOpts').slideDown(1000, "swing");
    }
    
  }
  
  
  function timeOpts(hand, back) {
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
      let dispvalh = `${handT} <br/> ${handB}`; //needs updating
      let dispvalb = backT && backB ? `${backT} <br/> ${backB}` : '';
      
      options += `<li class="time">
        <label for="${ids[i]}">
          <ul class="row">
            <li>
              <input type="radio" id="${ids[i]}" name="timesig" value="${value}" />
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
  
  
  
});