const sharps = ['G', 'D', 'A', 'E', 'B', 'F♯'];
const flats = ['F', 'B♭', 'E♭', 'A♭', 'D♭', 'G♭'];
const sharpy = [19, 34, 14, 29, 44, 24]


module.exports = function keysigs(tenor) {
  let type;
  let results = {
    sig: '<g stroke="black" stroke-width="1" fill="black">'
  }
  
  if (sharps.indexOf(tenor) > -1) {
    type = 's';
  } else if (flats.indexOf(tenor) > -1) {
    type = 'f';
  } else if (tenor == 'C') {
    results.sig = '';
    results.startx = 60;
  }
  
  if (type == 's') {
    results.startx = 65 + sharps.indexOf(tenor)*10;
    for (var i = 0; i < sharps.indexOf(tenor)+1; i++) {
      results.sig += `<path d="M ${40+i*10} ${sharpy[i]}
             v 24
             m 4 -25
             v 24
             m -6 -14
             l 8 -3
             v -2
             l -8 3
             m 0 12
             l 8 -3
             v -2
             l -8 3"/>`;
    }
  } else if (type == 'f') {
    results.startx = 68 + flats.indexOf(tenor)*10;
    for (var i = 0; i < flats.indexOf(tenor)+1; i++) {
      let y = i*2.5 + 32.5 + (i%2)*-17.5;
      results.sig += `<path d="M ${40+i*10} ${y}
             v 23.5
             m 0 -10
             c 6 -4 10 0 5 6
             l -5 4
             c 6 -4 6 -13 0 -10"/>`;
    }
  }
  
  results.sig += '</g>'
  return results;
}