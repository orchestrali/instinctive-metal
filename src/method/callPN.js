

module.exports = function leadPN(plainPN, pn, loc) {
  
  //slice the plainPN from start to callStart
  let callLead = plainPN.slice(0, loc - 1)
  //add pn to callLead
  for (var i = 0; i < pn.length; ++i) {
    callLead.push(pn[i]);
  }
  //add the slice of plainPN from startRow+callPNlength to end
  callLead = callLead.concat(plainPN.slice(loc+pn.length-1))
  
  return callLead;
}


/*
  //divide the plainPN into chunks of length callFreq
  for (var j = 0; j < plainPN.length / callInfo.howOften; ++j) {
    //slice the plainPN from start of chunk to callStart
      callLead = callLead.concat(plainPN.slice(j*callInfo.howOften, callInfo.startRow - 1 + j*callInfo.howOften));
      //add callPN to callLead
      for (var i = 0; i < callPN.length; ++i) {
        callLead.push(callPN[i]);
      }
      //add the slice of plainPN from startRow+callPNlength to next chunk
      callLead = callLead.concat(plainPN.slice((j+1)*callInfo.startRow+callPN.length-1, (j+1)*callInfo.howOften));
      
    } */