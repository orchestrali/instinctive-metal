const fs = require('fs');
var convert = require('xml-js');
const buildMethod = require('./buildMethod');

//given a methodSet array, extract the methods into objects in an array
module.exports = function methodArray(sets) {
  let methods = [];

  
  
  for (var i = 0; i < sets.length; ++i) {
    let set = sets[i];
     //console.log('adding methods');
    if (Array.isArray(set.methods)) {
      //console.log('this methodset has multiple methods');
        for (var j = 0; j < set.methods.length; ++j) {
          let method = buildMethod(set, set.methods[j]);
          methods.push(method);
        }
        
      } else {
        //console.log('this methodset has only one method');
        let method = buildMethod(set, set.methods);
        methods.push(method);
      }
  }

  
  //console.log('number of methods: ', methods.length);
  return methods;
}