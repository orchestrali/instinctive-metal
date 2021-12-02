const classes = ['Bob', 'Place', 'Slow Course', 'Treble Bob', 'Treble Place', 'Delight', 'Surprise', 'Alliance', 'Hybrid', 'Differential', 'Principle'];
const connect = require('../record/connect.js');
const model = require('./methodModel.js');
const fs = require('fs');
const names = [];
const stages = require('../stages.json');
var s = require('stream');
var moo = [];
const map = {title: "name", pnFull: "plainPN", class: "class", classification: "plain", leadLength: "leadLength", huntBells: "hunts", leadHeadCode: "leadHeadCode", pbOrder: "pbOrder"};


module.exports = function methodNames(cb) {
  let x = 4;
  let y = 0;
  
  connect(process.env.DB2, (db) => {
    getMethods(x, y, []);
  });
  //console.log(stages[0]); .find(o => o.stage == x).classes
  //cb(); 
  
    
  function getMethods(i, j, stageClasses) {
    let methods = [];
    let query = {query: {stage: i, class: classes[j]}, fields: 'title pnFull class classification leadLength huntBells leadHeadCode pbOrder' };
    if (j === 0) {
      names.push({stage: i, classes: []})
    }
      model.find(query.query, query.fields, (err, results) => {
        if (results.length > 0) {
          stageClasses.push(classes[j]);
          for (var k = 0; k < results.length; k++) {
            methods.push(results[k].title);
            let obj = {stage: i};
            for (let key in results[k]) {
              if (map[key]) {
                obj[map[key]] = key === "classification" ? results[k].classification.plain : results[k][key];
              }
            }
            moo.push(obj);
          }
          //console.log(j);
          names.find(o => o.stage == i).classes.push({class: classes[j], methods: [methods]});
        }
        j++;
        if (i <= 16 && j < classes.length) { //if there are still more classes in the stage
          getMethods(i, j, stageClasses);
        } else if (i < 16 && j == classes.length) { //if the last class has been completed
          console.log('done with stage ' + i);
          j = 0;
          stages.find(o => o.num == i).classes = stageClasses;
          stageClasses = [];
          i++;
          getMethods(i, j, stageClasses);
        } else if (i == 16 && j == classes.length) { //if the last stage is completed
          console.log('done with stage ' + i);
          stages.find(o => o.num == i).classes = stageClasses;
          methods = null;
          let stream = new s.Readable();
          stream.push(JSON.stringify(stages, null, 2));
          stream.push(null);
          let nameStream = new s.Readable();
          nameStream.push(JSON.stringify(names, null, 2));
          nameStream.push(null);
          let moostream = new s.Readable();
          moostream.push(JSON.stringify(moo, null, 2).replace(/\n      +/g, "").replace(/\n    \]/g, "]"));
          moostream.push(null);
          moo = null;
          //fs.writeFileSync('src/stages.js', 'module.exports = ' + JSON.stringify(stages));
          stream.pipe(fs.createWriteStream('src/stages.json'));
          nameStream.pipe(fs.createWriteStream('public/methodNames.json'));
          moostream.pipe(fs.createWriteStream('src/methods.json'))
          console.log('done');
          cb();
        }
        
      });
  }
      
      

  
}