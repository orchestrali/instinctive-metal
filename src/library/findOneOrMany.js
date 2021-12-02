const axios = require('axios');

module.exports = function findOne(query, s, cb) {
  let url = 'https://vivacious-port.glitch.me/method?'+(s ? serialize(query) : query);
  let timeout;
  let result;
  let timedout = false;
  
  //console.log(url);
  
  timeout = setTimeout(function() {
    //if (!result) {
    timedout = true;
      cb(['sorry, database access problem; try again later']);
    //}
  }, 15000);
  
  axios.get(url)
  .then(function (response) {
    if (response.data) {
      clearTimeout(timeout);
      cb(null, response.data);
    } else {
      clearTimeout(timeout);
      cb(['no methods match']);
    }
  })
  .catch(function (error) {
    // handle error
    if (!timedout) {
      console.log(error);
      clearTimeout(timeout);
      if (process.env.NAME !== "instinctive-metal") {
        axios.get("https://orchestrali-instinctive-metal.glitch.me/method?" + (s ? serialize(query) : query))
        .then((res) => {
          cb(null, res.data);
        })
        .catch((err) => {
          cb(['sorry, database access problem; try again later']);
        });
      } else {
        cb(['sorry, database access problem; try again later']);
      }
      
    }
  });
  
  
  function serialize(obj, prefix) {
    var str = [],
      p;
    for (p in obj) {
      if (obj.hasOwnProperty(p)) {
        var k = prefix ? prefix + "[" + p + "]" : p,
          v = obj[p];
        
        str.push(function() {if (v !== null && typeof v === "object") {
                                //console.log('embedded object');
                                return serialize(v, k);
                              } else {
                                return encodeURIComponent(k) + "=" + encodeURIComponent(v).replace(/%20/g, '+');
                              }
          
                            }()        
          );
      }
    }
    return str.join("&");
  }
  
}