const buildLead = require("../rowArray/buildLead2.js");
const rounds = require("../rounds.js");
const callNames = require("./callNames.js");

var testCallPos = [{placebell: 2, bobname: 'i', singlename: 3},{placebell: 4, bobname: 'h', singlename: 'h'},{placebell: 6, bobname: 'w', singlename: 'w'},{placebell: 5, bobname: 4, singlename: 4},{placebell: 3, bobname: 'b', singlename: 2}]

module.exports = function callPlaces(methodInfo) {
  let stage = methodInfo.stage;
  let calls = callNames(stage);
  //console.log(methodInfo.placeNot);
  
  let bobEnd = buildLead(rounds(stage), methodInfo.placeNot.bob, 1)[methodInfo.leadLength-1].bells;
  let singleEnd = buildLead(rounds(stage), methodInfo.placeNot.single, 1)[methodInfo.leadLength-1].bells;
  
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
  //console.log(callplaces);
  return callplaces;
}