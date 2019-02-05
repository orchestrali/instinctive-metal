const places = require('../places');

//the rowArray needs to include rowZero
//I was going to produce an array of objects with instructions and rowNums but maybe I should just add the instructions to the rowArray??
module.exports = function describe(rowArray, bell, stage) {
  console.log("starting description");
  console.log("rowArray length " + rowArray.length);
  let i = 0;
  
  let work = [];
  
  while (i < rowArray.length-2) {
    //console.log("i equals " + i);
    let s = getPlace(i);
    let t = getPlace(i+1);
    let u = getPlace(i+2);
    //console.log("s: "+s+", t: "+t+", u: "+u);
    
    if (t == s && u == s) {
      //console.log("3+ blows");
      let count = 3;
      while (checkPlace(i+count, s)) {
        count++;
      }
      work.push(count + " blows in " + placeName(s));
      rowArray[i].instruction = count + " blows in " + placeName(s);
      i += count-1;
    } else if (t == s) {
      //console.log("Make place");
      work.push(makePlace(s, rowArray[i].rowNum));
      rowArray[i].instruction = makePlace(s, rowArray[i].rowNum);
      i++;
    } else if (t-s == u-t) {
      //console.log("Hunt");
      let dir = t-s;
      let dirName = dirname(dir);
      rowArray[i].instruction = "Hunt " + dirName;
      let place = u;
      while (getPlace(i+3)-place == dir) {
        i++;
        place+=dir;
      }
      
      //if ((s != 1 && s != stage) || Math.abs(place-s) > 3 ) {}
      work.push("Hunt " + dirName);
      i++;
      //console.log("i is now "+i);
    } else if (t == u) {
      //console.log("also make place");
      //let last = i > 0 ? work[work.length-1].substring(0, 4) : "";
      //let last2 = i > 0 ? work[work.length-1].indexOf("blows") : -1;
      //let x = last == "Make" || last == "Lead" || last == "Lie " || i == 0 || last2 > -1 ? i : i+1;
      let last = i > 0 ? work[work.length-1] : "";
      let x = last.indexOf("Point") == -1 || last.indexOf("Fish") == -1 ? i : i+1;
      let v = rowArray[i+3] ? getPlace(i+3) : null;
      if (v != u) {
        work.push(makePlace(t, rowArray[i+1].rowNum));
        rowArray[x].instruction = makePlace(t, rowArray[i+1].rowNum);
        i+=2;
      } else {
        let count = 3;
        while (checkPlace(i+count+1, t)) {
          count++;
        }
        work.push(count + " blows in " + placeName(t));
        rowArray[x].instruction = count + " blows in " + placeName(t);
        i += count;
      }
    } else {
      //point, fishtail, or dodge
      let dir1 = t-s;
      let v = rowArray[i+3] ? getPlace(i+3) : null;
      
      if (v == u || v-u != dir1) {
        let stroke = rowArray[i+1].rowNum % 2 == 1 ? " at hand" : " at back";
        work.push("Point " + placeName(t));
        rowArray[i].instruction = "Point " + placeName(t);
        i+=2;
      } else {
      let count = 1;
        let starti = i;
        i+=3;
        while (getPlace(i) == t && getPlace(i+1) == s) {
          count++;
          i+=2;
        }
        if (getPlace(i) == s || getPlace(i) == s+dir1*-1) {
          let points = count > 2 ? ", " + count + " points " + placeName(t) : "";
          let places = s > t ? t + "-" + s : s + "-" + t;
          work.push("Fishtail " + places + points);
          rowArray[starti].instruction = "Fishtail " + places + points;
          //if (getPlace(i) == s) 
          i--
        } else if (getPlace(i+1) == t || getPlace(i+1) == t+dir1 || getPlace(i+1) == null) {
          let places = s > t ? t + "-" + s : s + "-" + t;
          work.push(dodgeNum(count) + places + " " + dirname(dir1));
          rowArray[starti].instruction = dodgeNum(count) + places + " " + dirname(dir1);
        }
        
      }
      
    }
    
  }
  
  let poss = ["Make", "blows", "full", "Lie", "wrong"]
  var match = function (element) {
    return work[work.length-1].indexOf(element) > -1;
  }
  let penult = getPlace(rowArray.length-2);
  let ult = getPlace(rowArray.length-1);
  //if (poss.some(match)) {
  if (i == rowArray.length-2) {
    let dir = ult-penult;
    if (dir != 0) {
      work.push("Hunt " + dirname(dir));
      rowArray[rowArray.length-2].instruction = "Hunt " + dirname(dir);
    } else if (ult == penult) {
      work.push(makePlace(ult));
      rowArray[rowArray.length-2].instruction = makePlace(ult);
    }
  } //else if (["odge", "Point", "Fish"].some(match) && ult == penult) {
    
  
  function getPlace(j) {
    return rowArray[j] ? rowArray[j].bells.indexOf(bell)+1 : null;
  }
  
  var fakeGetPlace = function(bell) {
    return function(j) {
      return rowArray[j] ? rowArray[j].bells.indexOf(bell)+1 : null;
    }
  };
  
  function checkPlace(row, value) {
    if (getPlace(row) == value) return true;
    else return false;
  }
  
  function makePlace(num, rownum) {
    if (num == 1 && rownum % 2 == 0) return "Lead wrong";
    else if (num == 1 ) return "Lead full";
    else if (num == stage) return "Lie behind";
    else return "Make " + placeName(num);
  }
  
  
  //return work;
  return rowArray;
}

function dodgeNum(num) {
  if (num == 1) return "Dodge ";
  else if (num == 2) return "Double dodge ";
  else return num + " dodges ";
}

function dirname(dir) {
  let val = dir == 1 ? "up" : "down";
  return val;
}



function placeName(num) {
  //console.log("num to place " + num);
  if (0 < num && num < 4) {
    return placeNames[num-1].name;
  } else {
    return num + "ths";
  }
}

const placeNames = [{num: 1, name: "lead"}, {num: 2, name: "2nds"}, {num: 3, name: "3rds"}]