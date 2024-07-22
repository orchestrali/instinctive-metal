

var svg;
var fixed = [[1,4],["x"],[1,2],["x"],[3,6]];
var placenot = [["x"],[3,6],["x"],["x"],[1,4],["x"],[5,6],["x"],[1,4],["x"],["x"],[3,6],["x"],[1,2]];
var rownums = [0,1,2,8,9,10,11,12,13,14,20,21,22,23];
var pnstring = ["x","36","x","x","14","x","56","x","14","x","x","36","x","12"];
var mb;
var hunts = [1];

var std41 = {
  Cambridge: ["x","36","x","x","14","x","56","12"],
  Primrose: ["x","36","x","x","14","x","56","16"],
  Ipswich: ["x","36","x","x","14","x","16","12"],
  Norfolk: ["x","36","x","x","14","x","16","16"],
  Bourne: ["x","36","x","x","34","x","36","12"],
  Hull: ["x","36","x","x","34","x","36","16"],
  Beverley: ["x","36","x","14","x","34","56","12"],
  Berwick: ["x","36","x","14","x","34","56","16"],
  Surfleet: ["x","36","x","14","x","12","56","12"],
  Hexham: ["x","36","x","14","x","12","56","16"],
  Durham: ["x","36","x","14","x","34","16","12"],
  York: ["x","36","x","14","x","14","36","12"],
  Carlisle: ["34","x","36","x","14","x","56","12"],
  Northumberland: ["34","x","36","x","14","x","16","12"],
  Whitley: ["34","x","36","x","14","x","16","16"],
  Sandiacre: ["34","x","36","x","34","x","36","12"],
  Wooler: ["34","x","36","x","34","x","36","16"],
  Munden: ["34","x","36","14","x","12","56","12"],
  Chester: ["34","x","36","14","x","34","56","12"],
  Newcastle: ["34","x","36","14","x","34","16","12"],
  Morpeth: ["34","x","36","14","x","34","16","16"],
  Alnwick: ["34","x","36","14","x","14","36","12"],
  Canterbury: ["34","x","36","14","x","14","36","12"],
  Norwich: ["x","34","x","x","34","x","16","16"],
  "Annable's London": ["x","34","x","x","14","x","36","16"],
  Netherseale: ["x","34","x","x","14","x","36","12"],
  Lightfoot: ["x","34","x","14","x","14","36","12"],
  Rossendale: ["x","34","x","14","x","14","36","16"],
  Wearmouth: ["x","34","x","14","x","34","16","12"],
  Stamford: ["x","34","x","14","x","34","16","16"],
  Warkworth: ["x","34","x","14","x","12","16","16"],
  Westminster: ["x","34","x","x","12","x","36","12"],
  Allendale: ["x","34","x","12","x","12","36","12"],
  Bacup: ["x","34","x","12","x","14","56","16"],
  Bamborough: ["x","34","x","12","x","14","56","12"],
  Cunecastre: ["36","x","36","x","14","x","36","12"],
  London: ["36","x","36","14","x","14","36","12"],
  Wells: ["36","x","36","14","x","34","16","12"],
  Lincoln: ["36","x","36","x","12","x","36","12"],
  Coldstream: ["36","x","36","12","x","12","36","12"],
  Kelso: ["36","x","36","12","x","14","56","12"]
}


$(function() {
  $("svg").svg({onLoad: (o) => {svg = o;}});
  $("#placenot g text").on("click", placenotclick);
  $("#minor circle,#minorr text").on("click", placebell);
});




function placenotclick(e) {
  
  let i = $(e.target).parent("g").index(); //index of <g>
  let pn = $(e.target).text();
  if (pn != pnstring[i]) {
    let row = rownums[i];
    let pna = pn === "x" ? ["x"] : pn.split("").map(a => Number(a));
    let dir = 1;
    for (let p = 1; p <= 6; p++) {
      let id = "#row"+row+"place"+p;
      if ($(id)) {
        let p2;
        if (pna.includes(p)) {
          p2 = p;
        } else {
          p2 = p+dir;
          dir*=-1;
        }
        let x = p2*20 - 10;
        $(id).animate({svgX2: x}, 600);
      }
    }
    placenot.splice(i,1,pna);
    pnstring = placenot.map(a => a.join(""));
    
    
    $(e.target).siblings().removeClass("selected");
    $(e.target).addClass("selected");
    
    let start = [1,5,6,3,4,2];
    let lh = leadhead();
    for (let j = 1; j <= 5; j++) {
      let b = start[j]
      let p = lh.indexOf(b);
      let cx = 20*p + 10;
      $("#minorend circle:nth-child("+(j)+")").animate({svgCx: cx}, 600);
      $("#minorrend text:nth-child("+(j)+")").animate({svgX: cx}, 600);
    }
    
    hunts = [];
    lh.forEach((b,j) => {
      if (b === j+1) hunts.push(b);
    });
    $("#minorlines path.hunt,#minorlinks line.hunt").removeClass("hunt");
    if (hunts.length > 1) {
      //add hunt class
      for (let j = 1; j < hunts.length; j++) {
        let b = hunts[j];
        highlightpath(b-2, true, "hunt");
      }
    }
    
    if (mb) {
      $("#minorlines path.highlight,#minorlinks line.highlight").removeClass("highlight");
      if (hunts.includes(mb)) {
        $("#minor circle,#minorend circle").attr("fill", "black");
        mb = null;
      } else {
        highlightpath(mb-2, true, "highlight");
      }
    }
    
    properties();
  }
  
}

function assemblepn() {
  let pn = [];
  for (let i = 0; i < 24; i++) {
    let arr;
    switch (i) {
      case 0: case 1: case 2:
        arr = placenot[i];
        break;
      case 3: case 4: case 5: case 6: case 7:
        arr = fixed[i-3];
        break;
      case 8: case 9: case 10: case 11: case 12: case 13: case 14:
        arr = placenot[i-5];
        break;
      case 15: case 16: case 17: case 18: case 19:
        arr = fixed[19-i];
        break;
      default:
        arr = placenot[i-10];
    }
    pn.push(arr);
  }
  return pn;
}


function placebell(e) {
  let i = $(e.target).index();
  if (!hunts.includes(i+2)) {
    let lh = [1,5,6,3,4,2];
    for (let n = 1; n <=5; n++) {
      if (!hunts.includes(n+1)) {
        let color = (i+2 != mb && n === i+1) ? "blue" : "black";
        $("#minor circle:nth-child("+n+")").attr("fill", color);
        let c = (lh[n] === i+2 && i+2 != mb) ? "blue" : "black"
        $("#minorend circle:nth-child("+n+")").attr("fill", c);
      }
    }

    $("#minorlines path.highlight,#minorlinks line.highlight").removeClass("highlight");
    if (i+2 === mb) {
      mb = null;
    } else {
      highlightpath(i, mb != i+2, "highlight");
    }
  }
  
  
}

//i is bell minus 2
function highlightpath(i, yes, cl) {
  
  //if (yes) {
    let path = [i+2];
    let c = i+2;
    let pnfull = assemblepn();
    //console.log(pnfull);
    
    for (let r = 0; r < pnfull.length; r++) {
      let pn = pnfull[r];
      let p = nextplace(c,pn);
      path.push(p);
      c = p;
    }
    
    for (let r = 0; r < path.length; r++) {
      let id = "#row"+r+"place"+path[r];
      if ($(id)) {
        $(id).addClass(cl);
      }
    }
    
    if (cl === "highlight") mb = i+2;
  //}
}

function nextplace(p, pn) {
  let p2, dir;
  if (pn.includes("x")) {
    dir = p%2 === 0 ? -1 : 1;
    p2 = p+dir;
  } else if (pn.includes(p)) {
    p2 = p;
  } else {
    dir = 1;
    let i = 1;
    do {
      if (i === p) {
        p2 = p+dir;
      } else {
        if (!pn.includes(i)) {
          dir*=-1;
        }
      }
      i++;
    } while (i <= p);
  }
  return p2;
}

function leadhead() {
  let arr = buildlead();
  return arr[arr.length-1];
}

function buildlead() {
  let row = [1,2,3,4,5,6];
  let arr = [row];
  let pnfull = assemblepn();
  for (let r = 0; r < pnfull.length; r++) {
    let next = [];
    let dir = 1;
    let pn = pnfull[r];
    for (let p = 0; p < 6; p++) {
      if (pn.includes(p+1)) {
        next.push(row[p]);
      } else {
        next.push(row[p+dir]);
        dir*=-1;
      }
    }
    arr.push(next);
    row = next;
  }
  return arr;
}

//truth, palindromic, right place, double, plain bob lh, single hunt, diff, st41
function properties() {
  
  let arr = buildlead();
  let lh = arr[arr.length-1];
  let props = [];
  //console.log(arr);
  //truth
  let r = 2;
  let equal;
  do {
    let row = arr[r];
    let i = 0;
    do {
      equal = row.every((e,j) => {
        return e === arr[i][j];
      });
      i++;
    } while (!equal && i < r);
    //console.log(r, i, equal);
    r++;
  } while (!equal && r < 24);
  //console.log(r);
  props.push(!equal);
  //palindromic
  let i = 0;
  let sym;
  do {
    sym = pnstring[i] === pnstring[pnstring.length-i-2];
    i++;
  } while (sym && i < 6);
  props.push(sym);
  //right place
  let right = [0,2,3,5,7,9,10,12].every(n => {
    return pnstring[n] === "x";
  });
  props.push(right);
  //props.push(null);
  //plain bob lh
  let str = lh.join("");
  props.push(["135264","156342","164523","142635"].includes(str));
  //single hunt
  props.push(hunts.length === 1);
  //diff
  let cycles = [];
  let cycle;
  let b;
  let next;
  let leftover = [];
  for (let n = 2; n <= 6; n++) {
    if (!hunts.includes(n)) leftover.push(n);
  }
  while (leftover.length) {
    cycle = [];
    next = leftover[0];
    do {
      b = next;
      cycle.push(b);
      let i = leftover.indexOf(b);
      leftover.splice(i,1);
      next = lh.indexOf(b)+1;
    } while (next != cycle[0]);
    cycles.push(cycle);
  };
  props.push(cycles.length && cycles.length > 1);
  //standard 41
  let std = false;
  if (props[1] && props[3]) {
    let mm = Object.keys(std41);
    let m = mm.find(n => {
      let i = 0;
      let eq;
      do {
        eq = pnstring[i === 7 ? 13 : i] === std41[n][i];
        i++;
      } while (eq && i < 8);
      return eq;
    });
    if (m) {
      std = true;
    }
  }
  props.push(std);
  //update checks
  for (let i = 0; i < props.length; i++) {
    let text = $("#properties text:nth-child("+(i+2)+")").text();
    //console.log(text);
    let str = (props[i] ? "☑︎" : "☐") + text.slice(1);
    $("#properties text:nth-child("+(i+2)+")").text(str);
  }
}