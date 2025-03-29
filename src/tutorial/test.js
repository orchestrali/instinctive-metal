const places = require('../places');

//the rowArray needs to include rowZero
//I was going to produce an array of objects with instructions and rowNums but maybe I should just add the instructions to the rowArray??
module.exports = function describe(rowArray, bell, stage, hunts, early) {
  console.log("starting description");
  console.log("rowArray length " + rowArray.length);
  rowArray[0].description = true;
  let i = 0;
  
  let work = [];
  let placearr = rowArray.map(r => r.bells.indexOf(bell)+1);
  //console.log(placearr);
  let wtreble = false;
  
  //place bells
  if (hunts.length && !hunts.includes(bell)) {
    rowArray.forEach((r, i) => {
      if (r.name === "leadhead" && r.rowNum > 0) {
        let p = getPlace(r.rowNum);
        let text = "Become "+placeName(p)+" place bell";
        if (early) {
          rowArray[i-1].instruction = text;
        } else {
          r.instruction = text;
        }
      }
    });
  }
  
  while (i < rowArray.length-2) {
    //console.log("i equals " + i);
    let s = getPlace(i);
    let t = getPlace(i+1);
    let u = getPlace(i+2);
    
    //console.log("s: "+s+", t: "+t+", u: "+u);
    
    if (t == s && u == s) {
      //console.log("3+ blows");
      if (i > 0 && hunts.length && hunts[0] === 1) {
        let dir = s-placearr[i-1];
        let treble = rowArray[i-1].bells[s-1] === 1;
        if (treble) {
          if (rowArray[i-1].instruction) {
            rowArray[i-1].instruction += ",";
            rowArray[i-1].instruction2 = "pass treble in "+(s-dir)+"-"+s;
          } else {
            rowArray[i-1].instruction = "Pass treble in "+(s-dir)+"-"+s;
          }
        }
      }
      let count = 3;
      while (checkPlace(i+count, s)) {
        count++;
      }
      work.push(count + " blows in " + placeName(s));
      let text = count + " blows in " + placeName(s);
      if (rowArray[i].instruction) {
        rowArray[i].instruction += ", ";
        rowArray[i].instruction2 = text;
      } else {
        rowArray[i].instruction = text;
      }
      
      i += count-1;
    } else if (t == s) {
      //console.log("Make place");
      if (i > 0 && hunts.length && hunts[0] === 1) {
        let dir = s-placearr[i-1];
        let treble = rowArray[i-1].bells[s-1] === 1;
        if (wtreble) {
          wtreble = false;
        } else if (treble) {
          console.log("make place");
          if (rowArray[i-1].instruction) {
            rowArray[i-1].instruction += ",";
            rowArray[i-1].instruction2 = "pass treble in "+(s-dir)+"-"+s;
          } else {
            rowArray[i-1].instruction = "Pass treble in "+(s-dir)+"-"+s;
          }
        }
      }
      let text = makePlace(s, rowArray[i].rowNum);
      work.push(text);
      if (rowArray[i].instruction) {
        rowArray[i].instruction += ", ";
        rowArray[i].instruction2 = text;
      } else {
        rowArray[i].instruction = text;
      }
      i++;
    } else if (t-s == u-t) {
      //console.log("Hunt");
      let dir = t-s;
      let dirName = dirname(dir);
      let text = "Hunt " + dirName;
      if (rowArray[i].instruction) {
        rowArray[i].instruction += ", "+text;
      } else {
        rowArray[i].instruction = text;
      }
      let treble, place;
      if (hunts.length && hunts[0] === 1) {
        place = s;
        let j = 0;
        while (j < 2) {
          treble = rowArray[i+j].bells[place-1+dir] === 1;
          if (treble) {
            if (j === 0) {
              rowArray[i].instruction += ",";
              rowArray[i].instruction2 = "pass treble in "+s+"-"+t;
              if (s === 1 && t === 2) {
                rowArray[i].instruction2 += " (treble takes you off lead)";
              } else if (s === stage && t === stage-1) {
                rowArray[i].instruction2 += " (treble takes you off the back)";
              }
            } else {
              rowArray[i+j].instruction = "Pass treble in "+place+"-"+(place+dir);
            }
          }
          place += dir;
          j++;
        }
      }
      place = u;
      while (getPlace(i+3)-place == dir) {
        i++;
        place+=dir;
        if (hunts.length && hunts[0] === 1) {
          treble = getBell(i+1, place) === 1;
          if (treble) {
            rowArray[i+2].instruction = "Pass treble in "+placearr[i+1]+"-"+placearr[i+2];
          }
        }
      }
      
      
      work.push("Hunt " + dirName);
      i++;
      //console.log("i is now "+i);
    } else if (t == u) {
      //console.log("also make place");
      if (hunts.length && hunts[0] === 1) {
         
        
        let treble = rowArray[i].bells[t-1] === 1;
        if (wtreble) {
          wtreble = false;
        } else if (treble) {
          let j = early ? i : i+1;
          let key = rowArray[j].instruction ? "instruction2" : "instruction";
          //console.log("also make place");
          rowArray[j][key] = "Pass treble in "+s+"-"+t;
          if (s === 2 && t === 1) {
            rowArray[j][key] += " (take treble off lead)";
          } else if (s === 1 && t === 2) {
            rowArray[j][key] += " (treble takes you off lead)";
          } else if (s === stage-1 && t === stage) {
            rowArray[j][key] += " (take treble off the back)";
          } else if (s === stage && t === stage-1) {
            rowArray[j][key] += " (treble takes you off the back)";
          }
        }
        
        
      }
      
      let last = i > 0 ? work[work.length-1] : "";
      let x = (last.indexOf("Point") == -1 && last.indexOf("Fish") == -1 && early) ? i : i+1;
      let v = rowArray[i+3] ? getPlace(i+3) : null;
      if (v != u) {
        let text = makePlace(t, rowArray[x].rowNum);
        work.push(text);
        if (rowArray[x].instruction) {
          rowArray[x].instruction2 = text;
        } else {
          rowArray[x].instruction = text;
        }
        i+=2;
      } else {
        let count = 3;
        while (checkPlace(i+count+1, t)) {
          count++;
        }
        let text = count + " blows in " + placeName(t);
        work.push(text);
        if (rowArray[x].instruction) {
          rowArray[x].instruction2 = text;
        } else {
          rowArray[x].instruction = text;
        }
        i += count;
      }
    } else {
      //point, fishtail, or dodge
      let dir1 = t-s;
      let v = rowArray[i+3] ? getPlace(i+3) : null;
      
      if (v == u || v-u != dir1) {
        let stroke = rowArray[i+1].rowNum % 2 == 1 ? " at hand" : " at back";
        let text = "Point " + placeName(t) + stroke;
        work.push(text);
        let j = early ? i : i+1;
        if (rowArray[j].instruction) {
          //if the point happens in the leadhead row, it needs to come before the new place bell
          rowArray[j].instruction2 = rowArray[j].instruction;
          rowArray[j].instruction = text;
        } else {
          rowArray[j].instruction = text;
        }
        rowArray[j].with = getBell(i+1,s);
        i+=2;
      } else {
        let count = 1;
        let starti = i;
        let j = early ? i : i+1;
        i+=3;
        while (getPlace(i) == t && getPlace(i+1) == s) {
          count++;
          i+=2;
        }
        if (getPlace(i) == s || getPlace(i) == s+dir1*-1) {
          let points = count > 2 ? ", " + count + " points " + placeName(t) : "";
          let places = s > t ? t + "-" + s : s + "-" + t;
          let text = "Fishtail " + places + points;
          work.push(text);
          if (rowArray[j].instruction) {
            rowArray[j].instruction2 = text;
          } else {
            rowArray[j].instruction = text;
          }
          rowArray[j].with = getBell(starti+1,s);
          i--
        } else if (getPlace(i+1) == t || getPlace(i+1) == t+dir1 || getPlace(i+1) == null) {
          let places = s > t ? t + "-" + s : s + "-" + t;
          let text = dodgeNum(count) + places + " " + dirname(dir1);
          work.push(text);
          if (!early) j += 1;
          if (rowArray[j].instruction) {
            if (rowArray[starti+2].name === "leadhead") {
              rowArray[j].instruction2 = rowArray[j].instruction;
              rowArray[j].instruction = text;
            } else {
              rowArray[j].instruction2 = text;
            }
          } else {
            rowArray[j].instruction = text;
          }
          rowArray[j].with = getBell(starti+1,s);
          if (rowArray[j].with === 1) {
            wtreble = true;
          }
        }
        
      }
      
    }
    
  }
  
  
  let penult = getPlace(rowArray.length-2);
  let ult = getPlace(rowArray.length-1);
  
  if (i == rowArray.length-2) {
    let dir = ult-penult;
    if (dir != 0 && !work[work.length-1].startsWith("Hunt")) {
      work.push("Hunt " + dirname(dir));
      rowArray[rowArray.length-2].instruction = "Hunt " + dirname(dir);
    } else if (ult == penult) {
      work.push(makePlace(ult));
      rowArray[rowArray.length-2].instruction = makePlace(ult);
    }
  } 
  
  //Stedman whole turns
  i = 0;
  while (i < rowArray.length-6) {
    let set = placearr.slice(i, i+7);
    let opt0 = [set[0],set[1],set[3],set[4]];
    let opt1 = [set[1],set[2],set[4],set[5]];
    if (opt0.every(n => n === set[0])) {
      let p = set[0];
      let j = i+3;
      let c = 0;
      let three = set[2];
      while (three != p) {
        c++;
        if (placearr[j] === p && placearr[j+1] === p) {
          three = placearr[j+2];
        } else {
          three = p;
        }
        j += 3;
      }
      
      if (c === 2) {
        let instruct = " (Stedman whole turn";
        if (![1,stage].includes(set[0])) {
          instruct += " " + set[0] + "-" + set[2];
        }
        instruct += ")";
        let j = i;
        let n = 0;
        do {
          if (rowArray[j].instruction) {
            rowArray[j].instruction2 = instruct;
            n++;
          }
          j++;
        } while (n < 3 && j < i+6);
        i += 6;
      } else {
        i = j;
      }
    } else if (opt1.every(n => n === set[1]) && set[0] != set[1]) {
      let p = set[1];
      let j = i+4;
      let c = 0;
      let three = set[3];
      while (three != p) {
        c++;
        if (placearr[j] === p && placearr[j+1] === p) {
          three = placearr[j+2];
        } else {
          three = p;
        }
        j += 3;
      }
      if (c === 2) {
        let instruct = " (Stedman whole turn";
        if (![1,stage].includes(set[1])) {
          instruct += " " + set[1] + "-" + set[3];
        }
        instruct += ")";
        let j = i+1;
        let n = 0;
        do {
          if (rowArray[j].instruction) {
            rowArray[j].instruction2 = instruct;
            n++;
          }
          j++;
        } while (n < 3 && j < i+6);
        i += 6;
      } else {
        i = j;
      }
    } else {
      i++;
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

const placeNames = [{num: 1, name: "lead"}, {num: 2, name: "2nds"}, {num: 3, name: "3rds"}];