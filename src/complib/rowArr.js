const places = require('../places');
const stages = require('../stages.json');

module.exports = function organize(info, obj) {
  let res = {
    methodInfo: {stage: obj.stage},
    compInfo: {title: info.title, tenors: 0},
    rowArray: []
  };
  let stage = obj.stage;
  console.log(stage);
  let method;
  let pn = [];
  let comp = "";
  let prevrow;
  let leadpos = -1;
  let start = info.start+1;
  let hunts = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16].slice(0,stage);
  obj.rows.forEach((r,i) => {
    let row = {
      rowNum: i === 0 ? i : i-1,
      bells: r[0].split('').map(s => places.indexOf(s)+1)
    }
    if (obj.rows[i][1].length) row.call = obj.rows[i][1];
    if (i-2 > -1) {
      let call = obj.rows[i-2][1];
      if (i === 2) call = call.slice(3);
      if (call.length) {
        if (["Bob", "Single", "Extreme", "Double"].includes(call)) {
          row.type = call[0].toLowerCase();
          comp += call[0].toLowerCase();
        } else {
          method = info.methods.find(m => call.replace(/ ?Little$/, "") === m.name);
          //console.log(method);
          row.method = method.title;
          leadpos = start;
        }
      }
    }
    if (i === 0) {
      res.compInfo.rowZeroObj = row;
      
    } else if (i > 1) {
      
      let current = [];
      for (let p = 0; p < obj.stage; p++) {
        if (row.bells[p] === prevrow[p]) {
          current.push(p+1);
        }
      }
      pn.push(current.length ? current : "x");
      let stage = stages.find(s => s.num === method.stage).name;
      if (["Stedman "+stage, "Erin "+stage].includes(method.title)) {
        if (!current.includes(1) && !current.includes(3)) row.name = "new six";
      } else {
        let pos = method.leadPos.find(o => o.position === leadpos);
        if (pos) {
          //console.log(pos);
          row.name = pos.name;
        }
      }
      res.rowArray.push(row);
    }
    
    prevrow = row.bells;
    leadpos++;
    if (method && leadpos > method.leadLength) {
      comp += "p";
      leadpos = 1;
      start = 1;
      if (i-2 > method.leadLength && hunts.length) {
        for (let b = 1; b <= stage; b++) {
          let earlier = i-2-method.leadLength === -1 ? res.compInfo.rowZero : res.rowArray[i-2-method.leadLength];
          if (hunts.includes(b) && row.bells.indexOf(b) !== earlier.bells.indexOf(b)) {
            let j = hunts.indexOf(b);
            hunts.splice(j, 1);
          }
        }
      }
    }
    if (method && info.halfleads && leadpos > method.leadLength/2) {
      start = method.leadLength/2;
    }
  });
  res.compInfo.leadendcomp = comp;
  res.compInfo.hunts = hunts;
  res.methodInfo.hunts = hunts;
  return res;
}