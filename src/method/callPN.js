

module.exports = function leadPN(plainPN, callInfo) {
  let callPN = callInfo.placeNot;
  
  //slice the plainPN from start to callStart
  let callLead = plainPN.slice(0, callInfo.startRow - 1)
  //add callPN to callLead
  for (var i = 0; i < callPN.length; ++i) {
    callLead.push(callPN[i]);
  }
  //add the slice of plainPN from startRow+callPNlength to end
  callLead = callLead.concat(plainPN.slice(callInfo.startRow+callPN.length-1))
  
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