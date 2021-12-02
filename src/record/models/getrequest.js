var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const catIndexed = require('../../catIndexed.js');
const booleans = ['numbers', 'pagination', 'huntbells', 'gap', 'includeTime', 'rowzero', 'mobile', 'keepscore', 'drawLH', 'tutorial'];
const numbers = ['stage', 'callLoc', 'tenors', 'blueBell'];

var getSchema = new Schema({
  date: Date,
  host: String,
  endpoint: { type: String, enum: ['/', '/graphs', '/staff', '/practice', '/method', '/methods', '/surpriseminor', '/performance', '/performances'] },
  query: {},
  resStatus: Number
});

for (var key in catIndexed) {
  if (numbers.indexOf(key) > -1) {
    getSchema.query[key] = Number;
  } else if (booleans.indexOf(key) > -1) {
    getSchema.query[key] = Boolean;
  } else {
    getSchema.query[key] = String;
  }
}

module.exports = mongoose.model('getrequest', getSchema);