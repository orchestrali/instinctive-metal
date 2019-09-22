

module.exports = function buildPath(rowArray, bell, x) {
  let bellNum = bell.bell;
  let weight = bell.weight;
  let color = bell.color;
  let bellIndex = rowArray[0].bells.indexOf(bellNum);
  let path = `<g style="stroke: `+ color +`; stroke-width: `+weight+`; fill:none;">
      <path d="M` + (bellIndex*16+x) + `,10`;;
  //console.log('building path for bell ' + bellNum)
  //console.log('path ' + path);
  for (var i = 1; i < rowArray.length; ++i) {
    let index = rowArray[i].bells.indexOf(bellNum);
    if (index == bellIndex) {
      path += 'l0,20';
    } else if (index > bellIndex) {
      path += 'l16,20';        
    } else if (index < bellIndex) {
      path += 'l-16,20';
    }
    bellIndex = index;
    //console.log('new bell index: ', bellIndex);
  }
  path += `"
/>
</g>`;
  return path;
}