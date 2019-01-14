

module.exports = function barlines(barEnds, last) {
  let barlines = '';
  
  for (var i = 0; i < barEnds.length; i++) {
    if (last && i == barEnds.length-1) {
      barlines += `<path d="M ${barEnds[i]+1} 29.5
             v 41" stroke-width="3" />
              <path d="M ${barEnds[i]-3} 30
             v 40" />`
    } else {
      barlines += `<path d="M ${barEnds[i]} 30
             v 40" />`
    }
    
  }
  
  return barlines;
}