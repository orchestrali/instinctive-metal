

const buildTitle = require('./title.js');
const headers = require('./index.js');
const stages = require('./stages.json');
const buildplayer = require('./svgs/player.js');

//new streamlined page?? June 18 2020
module.exports = function buildPage(errors, results, input, type) {
  
  let anchor = '';
  let title = '';
  let errStr = '';
  let stuff = '';
  if (errors.length > 0) {
    errStr = '<p>' + errors.join('</p><p>') + '</p>';
  }
  //console.log("error string", errStr);
  
  let header = headers[0] + `<script> window.stages = ${JSON.stringify(stages)} </script>` + (results.script ? results.script : "") + headers[1];
  
  let footer = headers[3];
  
  
  if (results.SVGs && errors.length === 0) {
    //console.log("there is input and no errors");
    
    title = buildTitle(input);
    if (input.player) {
      title += results.player;
    }
    anchor = '<a name="svgs" class="anchor"></a>';
    //stuff = (type === "graph" ? "" : type === "practice" ? '<div id="grid-container">' : '<div class="grid-container">') + results.SVGs.join('') + (type === "graph" ? "" : '</div>');
    stuff = (type === "practice" ? '<div id="grid-container">' : '<div class="grid-container">') + results.SVGs.join('') + '<div id="highlight"></div></div>';
  }
  
  var page = header + errStr + headers[2] + anchor + title + stuff + footer;
  
  return page;
}