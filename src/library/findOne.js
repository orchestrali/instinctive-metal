const request = require('request');

module.exports = function findOne(query, cb) {
  let url = 'https://vivacious-port.glitch.me/method?';
  
  for (var key in query) {
    url += key + '=' + encodeURIComponent(query[key]);
  }
  console.log(url);
  
  request({url: url, form: query}, function (err, response, body) {
    cb(JSON.parse(body));
  });
  
}