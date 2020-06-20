const request = require('request');

module.exports = function findOne(query, s, cb) {
  let url = 'https://vivacious-port.glitch.me/method'+s+'?'+serialize(query);
  let timeout;
  let result;
  let timedout = false;
  
  console.log(url);
  
  timeout = setTimeout(function() {
    //if (!result) {
    timedout = true;
      cb(['sorry, database access problem; try again later']);
    //}
  }, 15000)
  
  request({url: url, form: query}, function (err, response, body) {
    if (body) {
      try {
        result = JSON.parse(body);
        clearTimeout(timeout);
        cb(null, result);
      } catch (err) {
        console.log(err);
        console.log(body);
        if (!timedout) {
          clearTimeout(timeout);
          cb(['sorry, database access problem; try again later']);
        }
        
      }
      
    } else {
      if (!timedout) {
          clearTimeout(timeout);
          cb(['no methods match']);
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