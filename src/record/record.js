const endpoints = ['/', '/graphs', '/staff', '/practice', '/method', '/methods', '/surpriseminor', '/performance', '/performances'];
const booleans = [{path: '/', fields: ['numbers', 'pagination']}, {path: '/practice', fields: ['numbers', 'huntbells', 'keepscore', 'drawLH', 'tutorial']}, {path: '/staff', fields: ['gap', 'includeTime', 'rowzero', 'mobile']}];
const numbers = ['stage', 'callLoc', 'tenors', 'blueBell'];

module.exports = function record(req, res) {
  if (endpoints.indexOf(req.path) > -1) {
    let record = {
      date: req._startTime,
      host: req.hostname,
      endpoint: req.path,
      resStatus: res.statusCode,
      query: {}
    };
    
    if (req.url.indexOf("?") > -1) {
      if (booleans.some((o) => o.path == req.path)) {
        let bools = booleans.find(o => o.path == req.path).fields;
        for (var i = 0; i < bools.length; i++) {
          record.query[bools[i]] = req.query[bools[i]] ? true : false;
        }
      }

      for (var key in req.query) {
        if (!record.query[key]) {
          if (numbers.indexOf(key) > -1) {
            record.query[key] = Number(req.query[key]);
          } else {
            record.query[key] = req.query[key];
          }
        }  
      }
    }
    
    return record;
  } else return null;
  
}