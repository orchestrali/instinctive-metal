const calls = [1,'i','o','f','v','x','s','e','n'];

module.exports = function callNames(stage) {
  let calls = [];
  
  for (var i = 1; i <= stage; i++) {
    let call = {};
    call.place = i;
    
    if (i == 2) {
      call.callname = "i";
    } else if (i == 3) {
      call.callname = "b";
    } else if (i == stage) {
      call.callname = "h";
    } else if (i == stage-1) {
      if (stage % 2 == 0 && stage > 5) {
        call.callname = "w";
      } else if (stage > 6) {
        call.callname = "m";
      }
    } else if (i == stage-2) {
      if (stage % 2 == 0 && stage > 5) {
        call.callname = "m";
      } else if (stage > 6) {
        call.callname = "w";
      }
    } else {
      call.callname = i;
    }
    calls.push(call);
  }
  
  return calls;
}