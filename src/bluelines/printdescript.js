
module.exports = function addInstruct(arr, x) {
  let instruct = '<g style="font-family: Verdana, sans-serif; fill: #000; font-size: 14px;">';
  
  arr.forEach(r => {
    if (r.instruction) {
      instruct += `<text x="${(x+(r.bells.length+1)*16)}" y="${(16+r.rowNum*20)}">${r.instruction}`;
      if (r.with) {
        instruct += " with "+r.with;
      }
      if (r.instruction2) {
        instruct += " "+r.instruction2;
      }
      if (r.name) {
        //instruct += " ("+r.name+")";
      }
      instruct += "</text>";
    } else if (r.name) {
      //instruct += `<text x="${(x+(r.bells.length+1)*16)}" y="${(16+r.rowNum*20)}">${r.name}</text>`;
    }
  });
  instruct += '</g>';
  return instruct;
}