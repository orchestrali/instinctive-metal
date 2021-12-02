const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const uri = 'mongodb+srv://'+process.env.USER+':'+process.env.PASS+'@'+process.env.HOST+'/';


module.exports = function connect(dbName, cb) {
  console.log('attempting to connect to mongoDB');
  mongoose.connect(uri+dbName+'?retryWrites=true', {dbName: dbName, useNewUrlParser: true, useUnifiedTopology: true});
  let db = mongoose.connection;
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));
  
  cb(db);
}