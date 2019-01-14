

module.exports = function timesig(timesig, startx) {
  let nums = timesig.split('-');
  let plus = ['5','8','9']
  let text = `<g style="font-family:Helsinki; fill:black; font-size:35px">
    `;
  let ex = `<text x="40" y="40" style="font-family:Helsinki; fill:black; font-size:36px">4</text>
    <text x="40" y="60" style="font-family:Helsinki; fill:black; font-size:36px">4</text>`
  
  for (var i = 0; i < nums.length; i++) {
    let x = i < 2 ? startx-1 : startx+29;
    if (plus.indexOf(nums[i]) > -1) x++;
    let y = 40 + (i%2)*20;
    
    text += `<text text-anchor="middle" x="${x}" y="${y}">${nums[i]}</text>
    `;
    
  }
  text += '</g>';
  startx += 27;
  if (nums.length > 2) {
    startx += 28;
  }
  return {text: text, startx: startx}
}