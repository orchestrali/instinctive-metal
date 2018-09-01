const buildLead = require("../rowArray/buildLead.js");
const rounds = require("../rounds.js");
const callNames = require("./callNames.js");

var testCallPos = [{placebell: 2, bobname: 'i', singlename: 3},{placebell: 4, bobname: 'h', singlename: 'h'},{placebell: 6, bobname: 'w', singlename: 'w'},{placebell: 5, bobname: 4, singlename: 4},{placebell: 3, bobname: 'b', singlename: 2}]

module.exports = function callPlaces(methodInfo) {
  let stage = methodInfo.stage;
  let calls = callNames(stage);
  let leadInfo = {};
    leadInfo.rowZero = rounds(stage);
    leadInfo.placeNot = methodInfo.placeNot.bob;
    leadInfo.rowNum = 1;
    leadInfo.leadType = {name: "b"};
  let bobEnd = buildLead(leadInfo)[methodInfo.leadLength-1].bells;
  let leadInfo2 = {};
  leadInfo2.rowZero = rounds(stage);
  leadInfo2.placeNot = methodInfo.placeNot.single;
  leadInfo2.rowNum = 1;
  leadInfo2.leadType = {name: "s"};
  let singleEnd = buildLead(leadInfo2)[methodInfo.leadLength-1].bells;
  
  let callplaces = [];
  for (var i = 1; i <= stage; i++) {
    let place = {};
    place.placebell = i;
    let bobPlace = bobEnd.indexOf(i)+1;
    place.bobname = calls.find(o => o.place == bobPlace).callname;
    let singlePlace = singleEnd.indexOf(i)+1;
    place.singlename = calls.find(o => o.place == singlePlace).callname;
    callplaces.push(place);
  }
  return callplaces;
}