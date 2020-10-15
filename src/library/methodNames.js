const classes = ['Bob', 'Place', 'Slow Course', 'Treble Bob', 'Treble Place', 'Delight', 'Surprise', 'Alliance', 'Hybrid', 'Differential', 'Principle'];
const findMethods = require('./findPost.js');
const fs = require('fs');
const names = [];
const stages = require('../stages.json');
var s = require('stream');

module.exports = function methodNames(cb) {
  let x = 4;
  let y = 0;
  
  //console.log(stages[0]); .find(o => o.stage == x).classes
  //cb(); 
  getMethods(x, y, []); 
    
  function getMethods(i, j, stageClasses) {
    let methods = [];
    let query = {query: {stage: i, class: classes[j]}, fields: 'title' };
    if (j === 0) {
      names.push({stage: i, classes: []})
    }
      findMethods(query, 's', (results) => {
        if (results.length > 0) {
          stageClasses.push(classes[j]);
          for (var k = 0; k < results.length; k++) {
            methods.push(results[k].title);
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
          //fs.writeFileSync('src/stages.js', 'module.exports = ' + JSON.stringify(stages));
          stream.pipe(fs.createWriteStream('src/stages.json'));
          nameStream.pipe(fs.createWriteStream('methodNames2.json'));
          console.log('done');
          cb();
        }
        
      });
  }
      
      

  
}