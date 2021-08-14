const axios = require('axios');

module.exports = function findOne(query, mod, cb) {
  let url = 'https://vivacious-port.glitch.me/find/'+mod+'?'+serialize(query);
  
  console.log(url);
  
  axios.get(url)
  .then(function(response) {
    if (response.data) {
      cb(response.data);
    } else {
      cb('no '+mod+' match');
    }
  })
  .catch(function (error) {
    // handle error
    console.log(error);
    cb();
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