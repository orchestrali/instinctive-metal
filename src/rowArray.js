const sortInput = require('./sortInput.js');
const checkError = require('./checkError.js');
const methodParse = require('./method/handleInput.js');
const compParse = require('./comp/handleInput.js');
const rowGen = require('./rowArray/handleInput2.js');
const complib = require('./complib/get.js');

module.exports = function rowArray(input, cb) {
  let sortedInput = sortInput(input);
  let methodInput = sortedInput.methodInfo;
  let compInput = sortedInput.composition;
  let stage = Number(input.stage);
  if (compInput.complibid) {
    complib(compInput.complibid, res => {
      if (res) {
        cb(res.rowArray);
      } else {
        cb(null);
      }
    });
  } else {
    let errResults = checkError(methodInput, compInput);
    methodInput.nameLower = errResults.realName ? errResults.realName : null;

    let compInfo = compParse(compInput, stage);

    //parse methodInput, get methodInfo object
    let methodInfo; // = methodParse(methodInput);
    //return next();
    ///*
    methodParse(methodInput, (err, obj) => {
      methodInfo = obj;
      //console.log('methodInfo', methodInfo);
      cb(next());
    });


    function next() {
      if (methodInfo) {
        let r = rowGen(methodInfo, compInfo);
        let rowArray = r.array;
        rowArray.unshift(compInfo.rowZeroObj);

        return rowArray;
      } else {
        return null;
      }

    }
    
  }
  
  
}