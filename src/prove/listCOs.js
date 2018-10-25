const findCO = require('./courseOrder.js');
const course = require('../minorInCourse.js');

//given LHs, list unique coursing orders, separating in-course and out-of-course
module.exports = function listCOs(LHs) {
  let CO1 = findCO(LHs[0]);
  let inCourse = [];
  let outCourse = [];
  
  function checkCourse(co) {
    if (course.includes(co)) {
    inCourse.push(co);
    } else {
      outCourse.push(co);
    }
  }
  
  checkCourse(CO1);
  
  for (var i = 1; i < LHs.length; ++i) {
    let order = findCO(LHs[i]);
    if (!inCourse.includes(order) && !outCourse.includes(order)) {
      checkCourse(order);
    }
  }
  
  return {"in course": inCourse, "out of course": outCourse};
}