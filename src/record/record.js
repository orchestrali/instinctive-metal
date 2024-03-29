const endpoints = ['/', '/raw', '/graphs', '/staff', '/practice', '/surpriseminor', '/stedman'];
const booleans = [{path: '/', fields: ['numbers', 'pagination']}, {path: '/practice', fields: ['numbers', 'huntbells', 'keepscore', 'drawLH', 'tutorial']}, {path: '/staff', fields: ['gap', 'includeTime', 'rowzero', 'mobile']}];
const numbers = ['stage', 'callLoc', 'tenors', 'blueBell'];
const exclude = [process.env.MAC_VAN, process.env.PHONE_VAN, process.env.PHONE_UBC, process.env.MAC_UBC, process.env.MAC_UMASS, process.env.PHONE_UM, process.env.PHONE_UM2];

module.exports = function record(req, res) {
  let ip = req.headers["x-forwarded-for"].split(',')[0];
  if (endpoints.indexOf(req.path) > -1) {
    if (exclude.indexOf(ip) > -1) {
      console.log("test request");
      return null;
    } else {
      let type = req.query.type;
      let record = {
        date: req._startTime,
        host: req.hostname,
        endpoint: ['/','/raw'].includes(req.path) ? "/"+(type === "graph" ? "graphs" : type === "grid" ? "" : type) : req.path,
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
    }
    
  } else return null;
  
}