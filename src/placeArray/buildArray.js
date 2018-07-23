

module.exports = function buildArray(rowArray, bell) {
  let places = [];
  for (var i = 0; i < rowArray.length; ++i) {
    let place = rowArray[i].bells.indexOf(bell)+1;
    places.push(place);
  }
  return places;
}