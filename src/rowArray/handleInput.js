const buildLead = require('./buildLead.js');
const plainCourse = require('./plainCourse.js');
const leadend = require('./leadend.js');

module.exports = function handleInput(methodInfo, compInfo, tenor) {
  //if quantity is one lead, generate that
  if (compInfo.quantity == 'one-lead') {
    console.log('building one lead', compInfo.rowZero);
    let leadInfo = {};
    leadInfo.rowZero = compInfo.rowZero;
    leadInfo.placeNot = methodInfo.placeNot.plain;
    leadInfo.rowNum = 1;
    leadInfo.leadType = {name: 'p'};
    leadInfo.tenor = tenor;
    return buildLead(leadInfo);
  } else if (compInfo.quantity == 'plain-course') {
  //if quantity is plain course, generate that
    return plainCourse(methodInfo);
  } else if (compInfo.touchType == 'leadend') {
  //if touchType is 'leadend', use the leadend generator function
    return leadend(methodInfo, compInfo);
  }
  //if touchType is 'callplace', use the callplace generator function (not quite functional yet)
  
}