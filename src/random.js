const axios = require("axios");
var url = "https://api.complib.org/method/search?";
const serialize = require("./library/serialize.js");

module.exports = function random(end) {
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