

//number of bells should probably include a tenor for odd-bell methods
module.exports = function buildSystem(rows, numBells) {
  let noteheads = '';
  let stems = '';
  let barlines = '';
  let ledgers = '';
  
  //noteheads
  //cycle through rows
  for (var i = 0; i < rows.length; ++i) {
    
    //cycle through bells in row
    for (var j = 0; j < numBells; ++j) {
      let current = rows[i].bells[j];
      let cx = j*30+60+i*40+i*(numBells-1)*30;
      let b = 50-5*(numBells-4);
      let cy = 5*current + b;
      let stemx;
      let stemdir;
      if (numBells > 7 && current < numBells-5) {
        stemx = cx-5;
        stemdir = 35;
      } else {
        stemx = cx+5;
        stemdir = -35
      }
      
      noteheads += `<ellipse cx="${cx}" cy="${cy}" rx="6" ry="4" transform="rotate(-35 ${cx} ${cy})"/>
                  `
      stems += `<path d="M ${stemx} ${cy}
             v ${stemdir}" />
    `
      if (current == numBells) {
        ledgers += `<path d="M `+(cx-11)+` 70
           h 22"/>
    `
      }
    }
    
    let barEnd = 80+(numBells-1)*30*(i+1)+i*40;
          barlines += `<path d="M ${barEnd} 20
             V 60" />
          `
    
    if (rows[i].rowNum % 2 == 0) {
      barlines += `<path d="M ${barEnd-2} 20
             V 60" />
          `
    }
    
    
  }
  
  let things = {};
  things.noteheads = noteheads;
  things.stems = stems;
  things.barlines = barlines;
  things.ledgers = ledgers;
  
  return things;
}