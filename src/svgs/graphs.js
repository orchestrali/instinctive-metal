

module.exports = function buildSVGs(rowArray, width) {
  var numBells = rowArray[0].bells.length;
  var measure = {};
  measure.containWidth = width;
  
  console.log('numBells', numBells);
  
  measure.containHeight = measure.containWidth * 216 / 335;
  measure.rectWidth = (measure.containWidth - 20)*100/measure.containWidth + '%';
  measure.rectHeight = (measure.containHeight - 20)*100/measure.containHeight + '%';
  measure.maxX = measure.containWidth - 20;
  measure.maxY = measure.containHeight - 20;
  measure.xIncrem = (measure.containWidth - 40) / (numBells - 1);
  measure.yIncrem = (measure.containHeight -40) / (numBells - 1);
  measure.rowNumX = (measure.containWidth - 20) / 2 + 10;
  
  //console.log(measure);
  if (numBells == 4) {
    measure.rowNumY = (numBells - 2)*measure.yIncrem + (measure.yIncrem/-5.985 + 19.2);
    measure.rowNumSize = measure.yIncrem;
  } else if (numBells < 7) {
      measure.rowNumY = (numBells - 2)*measure.yIncrem + (measure.yIncrem/-5.985 + 19.2);
      measure.rowNumSize = measure.yIncrem * 4;
    } else if (numBells > 6 && numBells < 11) {
      measure.rowNumY = (numBells - 3)*measure.yIncrem + (measure.yIncrem/-5.985 + 19.2);
      measure.rowNumSize = measure.yIncrem * (numBells - 4);
    } else if (numBells > 10) {
      measure.rowNumY = (numBells - 4)*measure.yIncrem + (measure.yIncrem/-5.985 + 19.2);
      measure.rowNumSize = measure.yIncrem * (numBells - 5);
    }
  
  var svgs = [];
  
  for (var i = 0; i < rowArray.length; ++i) {
    let row = rowArray[i].bells;
    //console.log(row);
    /*
    //attempting to fix exact arrangement of svgs on the page
    let constantx = function() {
      if (rowArray[i].rowNum % 2 == 0) {
        return 400;
      } else {
        return 20;
      }
    }();
    let constanty = function() {
      var remain = rowArray[i].rowNum % 8;
      if (remain > 0 && remain < 3) {
        return 20;
      } else if (remain < 5) {
        return 256;
      } else if (remain < 7) {
        return 492;
      } else if (remain ==7 || remain == 0) {
        return 728;
      }
    }; */
    
    var tile = `<svg class="contain" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="` + measure.containWidth + `" height="` + measure.containHeight + `" viewBox="0 0 ` + measure.containWidth + ` ` + measure.containHeight + `" preserveAspectRatio="xMaxYMax meet">
<defs>
<circle id="marker" cx="5" cy="5" r="3" style="stroke: none; fill:#90d;"/>
<g style="text-anchor: middle; font-family: Arial; font-size: 5px; fill: #fff; font-weight: 600;">` +
      function() {
        var markers = '';
        //console.log('markers var created');
        for (var j = 1; j <= numBells; ++j) {
          markers += `
            <marker id="marker` + j + `" markerWidth="8" markerHeight="8" refX="5" refY="5">
          <use xlink:href="#marker"/>
          <text x="5" y="7">` + j + `
            </text>
        </marker>`
        }
        //console.log('markers complete');
        return markers;
        
      }() + `</g>
    </defs>
    <rect x="10" y="10" width="` + measure.rectWidth + `" height="` + measure.rectHeight + `" style="stroke: #000; fill: none;" />
    <text x="` + measure.rowNumX + `" y="` + measure.rowNumY + `" style="text-anchor: middle; font-family: Garamond; font-weight: 600; font-size: ` + measure.rowNumSize + `px; fill: #ccc;">` + rowArray[i].rowNum + `</text>
    <svg>
      <g style="stroke: #aaa; stroke-width:2;">
        <line x1="20" y1="` + measure.maxY + `" x2="` + measure.maxX + `" y2="` + measure.maxY + `" style="stroke: #000000;"/>`

      + function() {
        var lines = '';
        for (var i = 0; i < (numBells - 1); ++i) {
          lines +=`
          <line x1="20" y1="` + (i*measure.yIncrem + 20) + `" x2="` + measure.maxX + `" y2="` + (i*measure.yIncrem + 20) + `" />`
        }
        //console.log(lines)
        return lines;
      }()
    + `
      </g>
      <g style="stroke: #90d; stroke-width:2; fill:none;">` +
        function() {
          var paths = '';
          //console.log(row.length);
          for (var j = 0; j < (row.length - 2); j += 2) {
            //console.log((row[j]-1)*25 + 20);
            let mid = row[j+1];
            let end = row[j+2];
            //console.log('mid ' + mid);
            paths += `<path d="M`
            + (j*measure.xIncrem + 20) + `,`
            + ((row[j]-1)*measure.yIncrem + 20) + ` 
               l` + measure.xIncrem + `,`
            + measure.yIncrem*(mid - row[j]) + `
               l` + measure.xIncrem + `,`
            + measure.yIncrem*(end - mid) + `"
            style="marker-start: url(#marker` + row[j] + `); marker-mid: url(#marker` + mid + `);"/>`
          } 
          paths += `<path d="M` + ((row.length - 2)*measure.xIncrem + 20) + `,` + ((row[row.length - 2]-1)*measure.yIncrem + 20) + ` 
               l` + measure.xIncrem + `,`
            + measure.yIncrem*(row[row.length - 1] - row[row.length - 2]) + `"
            style="marker-start: url(#marker`+ row[row.length - 2] + `); marker-end: url(#marker` + row[row.length - 1] + `);"
              />` 
          //console.log(paths);
          return paths;
          
        }() 
    + `
            </g>
          </svg>
        </svg>`;
    //console.log('tile complete');
    svgs.push(tile);
    //console.log(svgs.length);
  }
  
  
  return svgs;
  
}


var measure = {
  containWidth: 270,
  containHeight: 216,
  rectWidth: 250,
  rectHeight: 196,
  maxX: 315,
  maxY: 196,
  rowNumX: 167,
  rowNumY: 140,
  rowNumSize: 100,
  xIncrem: 42,
  yIncrem: 25,
};

var sampleRows = [
  {
    rowNum: 1,
    handBack: 'hand',
    bells: [1,5,3,2,4,7,6,8],
  },
  {
    rowNum: 2,
    handBack: 'back',
    bells: [1,3,5,4,2,6,7,8],
  },
  {
    rowNum: 3,
    handBack: 'hand',
    bells: [3,1,5,2,4,7,6,8],
    
  },
  {
    rowNum: 4,
    handBack: 'back',
    bells: [3,5,1,4,2,6,7,8],
    
  },
  {
    rowNum: 5,
    handBack: 'hand',
    bells: [5,3,4,1,6,2,7,8],
    
  },
  {
    rowNum: 6,
    handBack: 'back',
    bells: [5,4,3,6,1,7,2,8],
    
  },
  ];