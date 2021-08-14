const axios = require("axios");
var url = "https://api.complib.org/method/search?";
const serialize = require("./library/serialize.js");
const rowGen = require("./rowArray.js");
const measure = require("./music/measure.js");

module.exports = calcmusic;
  
  
function random(end) {
  axios.get(url+serialize(end))
  .then(function (response) {
    // handle success
    console.log(response.data);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  });
  
}



function calcmusic(input) {
  rowGen(input, rowArr => {
    if (rowArr) {
      if (rowArr[0].rowNum === 0) rowArr.shift();
      console.log("num rows: "+rowArr.length);
      console.log(measure(rowArr.map(r => r.bells)));
    } else {
      console.log("error");
    }
    
  });
  
}