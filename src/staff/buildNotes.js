const dyPenta = [0, 5, 10, 20, 25, 35, 40, 45, 55, 60];

module.exports = function buildNotes(actTenor, startx, gap, rows, numBells) {
  let tenY = actTenor[0] == 'G' ? 95 : 90 - (actTenor.charCodeAt(0)-65)*5;
  let y;
  let things = {
    noteheads: '',
    stems: '',
    ledgers: '',
    rests: '',
    barEnds: []
  };
  
  if (actTenor.indexOf('P') > -1) {
    //deal with pentatonic
    let ys = dyPenta.slice(0, numBells).map(x => tenY-x).reverse();
    y = function (bell) {
      return ys[bell-1];
    };
  } else {
    let b = tenY - numBells*5;
    y = function (bell) {
      return 5*bell + b;
    };
  }
  
  for (var i = 0; i < rows.length; i++) {
    let barEnd;
    for (var j = 0; j < numBells; j++) {
      let current = rows[i].bells[j]; //bell number
      
      let cx = startx + j*30;
      let cy = y(current);
      
      things.noteheads += notehead(cx, cy);
      things.stems += stem(cx, cy);
      things.ledgers += ledger(cx, cy);
    }
    if (gap && rows[i].rowNum % 2 == 0) {
      let x = startx+numBells*30-4;
      things.rests += rest(x);
      barEnd = startx+numBells*30+22;
    } else {
      barEnd = startx+numBells*30-8;
    }
    things.barEnds.push(barEnd);
    startx = barEnd+18;
  }
 
  return things;
}


function notehead(x, y) {
  return `<ellipse cx="${x}" cy="${y}" rx="6" ry="4" transform="rotate(-35 ${x} ${y})"/>
`
}

function stem(x, y) {
  let stemx, stemdir;
  //just calculate stem direction based on absolute y
      
      if (y <= 50) {
        stemx = x-5;
        stemdir = 'v 35';
      } else {
        stemx = x+5;
        stemdir = 'v -35';
      }
  if (y == 10 || y >= 90) {
        stemdir = 'V 50';
      }
  return `<path d="M ${stemx} ${y}
             ${stemdir}" />
              `
}

function ledger(x, y) {
  let ledgers = '';
  if (y >= 80) {
    for (var i = 80; i <= y; i+=10) {
      ledgers += `<path d="M ${x-11} ${i}
           h 22"/>
`
    }
  } else if (y <= 20) {
    for (var i = 20; i >= y; i-=10) {
      ledgers += `<path d="M ${x-11} ${i}
           h 22"/>
`
    }
  }
  return ledgers;
}

function rest(x) {
  return `<path d="M ${x} 35
               l 6 8
               c -4 7 -4 7 2 15
               l -10 -11
               c 6 -7 5 -7 2 -12
               m 8 23
               a 4.0311 5 -55 0 0 -4 7
               a 4.032 5 -52 0 1 0 -11"/>
`
}