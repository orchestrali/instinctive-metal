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
      
      
      work.push("Hunt " + dirName);
      i++;
      //console.log("i is now "+i);
    } else if (t == u) {
      //console.log("also make place");
      
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
        rowArray[i].with = getBell(i+1,s);
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
          rowArray[starti].with = getBell(starti+1,s);
          //if (getPlace(i) == s) 
          i--
        } else if (getPlace(i+1) == t || getPlace(i+1) == t+dir1 || getPlace(i+1) == null) {
          let places = s > t ? t + "-" + s : s + "-" + t;
          work.push(dodgeNum(count) + places + " " + dirname(dir1));
          rowArray[starti].instruction = dodgeNum(count) + places + " " + dirname(dir1);
          rowArray[starti].with = getBell(starti+1,s);
        }
        
      }
      
    }
    
  }
  
  let penult = getPlace(rowArray.length-2);
  let ult = getPlace(rowArray.length-1);
  
  if (i == rowArray.length-2) {
    let dir = ult-penult;
    if (dir != 0) {
      work.push("Hunt " + dirname(dir));
      rowArray[rowArray.length-2].instruction = "Hunt " + dirname(dir);
    } else if (ult == penult) {
      work.push(makePlace(ult));
      rowArray[rowArray.length-2].instruction = makePlace(ult);
    }
  } 
  
  i = 0;
  while (i < rowArray.length-6) {
    if (!rowArray[i].instruction || (!rowArray[i].instruction.startsWith("Make") && !rowArray[i].instruction.startsWith("L"))) {
      i++;
    } else {
      if ((rowArray[i].instruction.startsWith("M") || rowArray[i].instruction.startsWith("L")) && rowArray[i+2].instruction && rowArray[i+2].instruction.startsWith("Point") && rowArray[i+4].instruction && (rowArray[i+4].instruction.startsWith("M") || rowArray[i+4].instruction.startsWith("L")) && (!rowArray[i+5].instruction || !rowArray[i+5].instruction.startsWith("P"))) {
        let instruct = " (Stedman whole turn";
        if (rowArray[i].instruction.startsWith("M")) instruct += " "+rowArray[i].instruction[5]+"–"+rowArray[i+2].instruction[6];
        instruct += ")";
        rowArray[i].instruction2 = instruct;
        rowArray[i+2].instruction2 = instruct;
        rowArray[i+4].instruction2 = instruct;
        i+=5;
      } else {
        i++;
      }
    }
  }
    
  
  function getPlace(j) {
    return rowArray[j] ? rowArray[j].bells.indexOf(bell)+1 : null;
  }
  
  function getBell(row, place) {
    return rowArray[row].bells[place-1];
  }
  
  function checkPlace(row, value) {
    return getPlace(row) === value;
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