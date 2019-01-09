const request = require('request');

module.exports = function findOne(query, s, cb) {
  let url = 'https://vivacious-port.glitch.me/method'+s;
  
  
  //console.log(url);
  
  request.post({url: url, form: query}, function (err, response, body) {
    if (body) {
      cb(JSON.parse(body));
    } else {
      cb('no methods match');
    }
    
  });
  
  
}