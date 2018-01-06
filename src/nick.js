function nextRowFromPlaces(row, places) {
  let direction = 1; // this variable's value should alternate between -1 and 1 as we loop through the row
  let nextRow = [];
  for (let p = 0; p < row.length; p++) {
    if (places.indexOf(p+1) > -1) {
      nextRow.push(row[p]);
    } else {
      nextRow.push(row[p+direction]);
      direction *= -1;      
    }
  }
  return nextRow;
};

function bellNumberFromChar(char) {
  switch (char.toUpperCase()) {
    case "1": case "2": case "3": case "4": case "5": case "6": case "7": case "8": case "9":
              return Number(char);
    case "0": return 10;
    case "E": return 11;
    case "T": return 12;
    default:  return 0;
  }
}

function rowFromString(string) {
  let row = [];
  for (let i = 0; i < string.length; i++) {
    row.push(bellNumberFromChar(string.charAt(i)));
  }
  if (row.indexOf(1) === -1) row.unshift(1); // Allow omitting treble in first place.
  return row;
}

module.exports = nextRowFromPlaces;