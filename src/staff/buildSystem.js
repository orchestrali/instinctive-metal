

//number of bells should probably include a tenor for odd-bell methods
module.exports = function buildSystem(rows, numBells, last) {
  let noteheads = '';
  let stems = '';
  let barlines = '';
  let ledgers = '';
  
  //noteheads
  //cycle through rows
  for (var i = 0; i < rows.length; ++i) {
    
    //cycle through bells in row
    for (var j = 0; j < numBells; ++j) {
      let current = rows[i].bells[j]; //bell number
      //margin 60, 30 for each place after 1, 40 between bars, width of previous bars, 
      let cx = j*30+70+i*40+i*(numBells-1)*30; 
      let b = 60-5*(numBells-4); //height of bell 0
      let cy = 5*current + b; //bigger bells are lower on the staff which means higher y value
      let stemx;
      let stemdir;
      //right now C is always the tenor
      //so stems go up unless there are 8+ bells, when those above A go down
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
        ledgers += `<path d="M `+(cx-11)+` 80
           h 22"/>
    `
      }
    }
    //90 (60 clef, 10 time sig, 20 after last note) plus barwidth*numBars + between-bar width
    let barEnd = 90+(numBells-1)*30*(i+1)+i*40;
    
    if (last && i == rows.length-1) {
      barlines += `<path d="M ${barEnd+1} 29.5
             v 41" stroke-width="3" />
          `
    } else {
      barlines += `<path d="M ${barEnd} 30
             v 40" />
          `
    }
    
          
    
    if (rows[i].rowNum % 2 == 0) {
      barlines += `<path d="M ${barEnd-3} 30
             v 40" />
          `
    }
    
    
  }
  
  let things = {
    noteheads: noteheads,
    stems: stems,
    barlines: barlines,
    ledgers: ledgers
  };
  
  
  return things;
}