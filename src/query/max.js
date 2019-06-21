
module.exports = function max(methods, param) {
  let bid = methods[0][param];
  //console.log("starting bid", bid);
  
  while (methods.some(o => o[param] > bid)) {
    bid = methods.find(o => o[param] > bid)[param];
  }
  
  return {
    param: param,
    max: bid,
    oneMethod: methods.find(o => o[param] == bid).title
  }
}