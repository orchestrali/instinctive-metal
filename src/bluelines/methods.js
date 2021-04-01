
module.exports = function addMethods(arr, x) {
  let methods = '<g style="font-family: Verdana, sans-serif; fill: #000; font-size: 14px;">';
  
  arr.forEach(r => {
    if (r.method) {
      methods += `<text x="${(x+(r.bells.length+1)*16)}" y="${(16+r.rowNum*20)}">${r.method}</text>`;
    }
  });
  methods += '</g>';
  return methods;
}