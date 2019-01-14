

module.exports = function staffLines(width) {
  let lines = '';
  
  for (var i = 0; i < 5; i++) {
    let liney = i*10+30;
    let line = `<path d="M 2 ${liney}
             H ${width}"/>
            `;
    
    lines += line;
  }
  
  return lines;
}