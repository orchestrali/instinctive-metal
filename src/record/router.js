const record = require('./record.js');
const connect = require('./connect.js');
const model = require('./models/getrequest.js');

module.exports = function router(req, res, cb) {
  let r = record(req, res);
  //console.log(r);
  if (r) {
    connect(process.env.DB, (db) => {
      model.create(r, (err, doc) => {
        if (err) cb(err);
        else cb("record added");
      });

    });
  } else {
    cb("no r");
  }
  
}