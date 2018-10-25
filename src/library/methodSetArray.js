const fs = require('fs');
var convert = require('xml-js');
const buildSet = require('./buildMethodSet');

//given a stage and a filter, build an array of methodSet objects from the corresponding xml file
module.exports = function methodArray(stage, filter) {
  let methodSets = [];
  
  let xml = fs.readFileSync('methods' + stage + '.xml','utf8');
  let data = convert.xml2json(xml, {compact: true, spaces: 4});
  let info = JSON.parse(data).collection.methodSet;
  
  //if filter.plain, check if each set is plain and add it if so
  
  //else check if each set.class matches filter.class and add if so
  for (var i = 0; i < info.length; ++i) {
      let set = buildSet(info[i]);
    if (filter.plain && set.plain) {
      methodSets.push(set);
    } else if (set.class == filter.class) {
      methodSets.push(set);
    }
      
    }
  console.log('number of methodSets: ', methodSets.length);
  return methodSets;
}