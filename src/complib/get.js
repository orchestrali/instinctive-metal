const axios = require("axios");
const places = require('../places');
const methods = require('./methods.js');
const comp = require('./rowArr.js');
var url = "https://api.complib.org/composition/";

module.exports = function complibget(id, cb) {
  axios.get(url + id)
  .then(function (response) {
    if (response.data) {
      //console.log("got composition info");
      axios.get(url + id + "/rows")
      .then(function (res) {
        if (res.data) {
          //console.log("got rows");
          cb(comp(methods(response.data), res.data));
        } else {
          cb();
        }
      })
      .catch(function (error) {
        // handle error
        console.log(error);
        cb();
      });
    } else {
      cb();
    }
  })
  .catch(function (error) {
    // handle error
    console.log(error);
    cb();
  });
  
}