const request = require('request');

module.exports = function findOne(query, s, cb) {
  let url = 'https://vivacious-port.glitch.me/method'+s+'?'+serialize(query);
  
  
  console.log(url);
  
  request({url: url, form: query}, function (err, response, body) {
    if (body) {
      cb(JSON.parse(body));
    } else {
      cb('no methods match');
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