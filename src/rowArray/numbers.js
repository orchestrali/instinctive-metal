var leadEnds = [{name: 'b',fullname: 'bob'},{name: 's',fullname: 'single'}];
var sample = [{lead: 1, call: "b"}]

module.exports = function numbers(compInfo) {
  //console.log(compInfo.touch);
  let comp = [];
  let current = 1;
  let touch = compInfo.touch;
  
  for (var i = 0; i < touch.length; i++) {
    while (current < touch[i].unit) {
      comp.push("p");
      current++;
    }
    if (current == touch[i].unit) {
      comp.push(touch[i].call);
      if (touch[i].last) {
        current = 1;
      } else {
        current++;
      }
    }
  }
  console.log(comp)
  return comp;
}