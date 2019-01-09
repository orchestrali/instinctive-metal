const places = require('../places');

//given a leadhead, produce the coursing order
module.exports = function courseOrder(LH) {
  let stage = LH.length;
  let prevPlace = LH.indexOf(places[stage-1]);
  let CO = places[stage-1];
  
  for (var i = 0; i < stage-2; ++i) {
    //console.log(prevPlace);
    if (prevPlace == stage-1) {
      CO += LH[prevPlace-1];
      prevPlace = prevPlace-1;
    } else if (prevPlace == 2) {
      CO += LH[1];
      prevPlace = 1;
    } else if (prevPlace % 2 == 1) {
      CO += LH[prevPlace+2];
      prevPlace = prevPlace+2;
    } else if (prevPlace % 2 == 0) {
      CO += LH[prevPlace-2];
      prevPlace = prevPlace-2;
    }
  }
  
  return CO;
}