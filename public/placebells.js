
var x2 = {
  ph: [42, 26, 74, 58, 90],
  pb: [26, 58, 42, 90, 74],
  bb: [42, 26, 58, 90, 74],
  bs: [26, 42, 58, 90, 74]
};
var ts = {
  ph2: [2,3,4,5,6],
  pb2: [4,2,6,3,5],
  bb2: [2,3,6,4,5],
  bs2: [3,2,6,4,5]
};
var links = [1,0,3,2,4];
var svg;
var current = "ph";
var cur;
var bell;
var placenot = [[1,6],[1,6],[1,6],[1,6],[1,6],[1,6]];
var pnstring = ["16","16","16","16","16","16"];
var mb;

var library = {
  "Plain Hunt (Original)": ["16","16","16","16","16","16"],
  "Plain Bob": ["16","16","16","16","16","12"],
  "Reverse Bob": ["16","16","56","16","16","16"],
  "Double Bob": ["16","16","56","16","16","12"],
  "St Clement's College Bob": ["16","36","36","36","16","12"],
  "College Bob": ["16","36","36","36","16","16"],
  "Single Court Bob": ["14","16","16","16","14","16"],
  "Double Court Bob": ["14","36","16","36","14","16"],
  "Hereward Bob": ["14","36","16","36","14","12"],
  "Double Oxford Bob": ["14","36","56","36","14","12"],
  "Single Oxford Bob": ["14","16","16","16","14","12"],
  "London Bob": ["14","36","56","36","14","16"],
  "Anything Bob": ["14","16","56","16","14","12"],
  "Wenlock Bob": ["14","16","56","16","14","16"],
  "Aldington Pleasure Bob": ["16","36","16","36","16","12"],
  "Clemens Bob": ["16","36","56","36","16","12"],
  "Bridge's Pleasure Bob": ["16","36","16","36","16","16"],
  "Dewsbury Bob": ["16","36","56","36","16","16"],
  "London New Bob": ["16","16","36","16","16","12"],
  "Stanstead Bob": ["14","36","36","36","14","12"],
  "Single Cambridge Cyclic Bob": ["14","16","16","16","16","12"],
  "Union": ["16","16","16","16","14","12"],
  "Islington New Bob": ["16","36","16","16","16","12"],
  "Hornsey New Bob": ["16","16","16","36","16","12"],
  "Calvary Bob": ["16","16","16","36","14","12"],
  "Yorkshire Court Bob": ["14","36","16","16","16","12"],
  "Evening Exercise Bob": ["14","36","16","16","16","16"],
  "Evening Delight Bob": ["16","16","16","36","14","16"],
  "Sandiacre Bob": ["16","36","16","36","14","16"],
  "Ockbrook Cyclic Bob": ["14","16","16","36","14","16"],
  "Eddie Martin Bob": ["14","36","56","16","16","16"],
  "Reverse Union": ["16","36","56","16","16","16"],
  "Annable's Hampton Bob": ["14","36","56","16","16","12"],
  "Longparish Bob": ["14","36","36","16","16","16"],
  "Tottenham Bob": ["16","36","36","16","16","12"],
  "Beresford Dale Bob": ["16","16","56","16","14","16"],
  "Hartington Bob": ["16","16","56","36","14","16"],
  "Surfleet Reverse Bob": ["16","16","56","36","16","16"],
  "Laurance Bob": ["16","16","56","36","14","12"],
  "Peasemore Bob": ["16","16","36","36","14","16"],
  "Enfield Bob": ["16","16","36","36","16","12"],
  "Fairfield Bob": ["14","36","16","16","14","16"],
  "Chiswick Bob": ["14","36","56","16","14","12"],
  "Double Union": ["16","36","56","16","14","12"],
  "Hackney Bob": ["14","36","36","16","14","12"],
  "Greenwich Bob": ["14","16","56","36","14","12"],
  "Double Cambridge Cyclic Bob": ["14","16","56","36","16","12"],
  "Camberwell Bob": ["14","16","36","36","14","12"],
  "Etwall Bob": ["14","36","16","36","16","16"],
  "Pearl Bob": ["14","36","56","36","16","12"],
  "Battersea Bob": ["14","36","36","36","16","16"],
  "Annable's Diamond Bob": ["16","36","56","36","14","12"],
  "Annable's Chelsea Bob": ["16","36","36","36","14","16"]
}

$(function() {
  $("svg").svg({onLoad: (o) => {svg = o;}});
  $("button.le").on("click", button);
  $("button.le2").on("click", button2);
  $("#ready").on("click", ready);
  $(".placebells .bellnums circle,.placebells .bellnums text").on("click", placebell);
  $("#placenot g text").on("click", placenotclick);
  $("#minor circle,#minorr text").on("click", placebell2);
});

function button(e) {
  //console.log(e.target.id);
  if (e.target.id != current) {
    for (let i = 0; i <= 4; i++) {
      $("#link"+i).animate({svgX2: x2[e.target.id][i], svgY2: 70}, 600);
    }
    current = e.target.id;
  } 
  
}

function button2(e) {
  //console.log("click");
  if (e.target.id != cur) {
    let x = e.target.id.slice(0,2);
    //console.log(x);
    let next, link;
    if (bell) {
      next = ts[e.target.id][bell-2];
      link = links[bell-2];
    }
    for (let i = 0; i <= 4; i++) {
      if (cur) {
        $("#link1"+i).animate({svgX2: x2[x][i]}, 600);
      } else {
        $("#link1"+i).attr({x2: x2[x][i]});
        $("#link1"+i).css("stroke", (link && i === link) ? "blue" : "gray");
        
        if (next) $("#copypaths path:nth-child("+(i+2)+")").attr("stroke", i+2 === next ? "blue" : "black");
      }
      
    }
    cur = e.target.id;
  }
}

function findmethod() {
  let keys = Object.keys(library);
  let i = 0;
  let method;
  do {
    let key = keys[i];
    if (pnstring.every((s,j) => library[key][j] === s)) {
      method = key;
    }
    i++;
  } while (i < keys.length && !method);
  return method;
}

function placenotclick(e) {
  //where was the click? row & pn
  let i = $(e.target).parent("g").index(); //index of <g>
  let pn = $(e.target).text();
  if (pn != pnstring[i]) {
    let row = i*2+1;
    let pna = pn.split("").map(a => Number(a));
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
        let x = p2*16 - 6;
        $(id).animate({svgX2: x}, 600);
      }
    }
    placenot.splice(i,1,pna);
    pnstring = placenot.map(a => a.join(""));
    
    
    $(e.target).siblings().removeClass("selected");
    $(e.target).addClass("selected");
    
    let lh = leadhead();
    //console.log(lh);
    for (let j = 2; j <= 6; j++) {
      let p = lh.indexOf(j);
      let cx = 16*p + 10;
      $("#minorend circle:nth-child("+(j-1)+")").animate({svgCx: cx}, 600);
      $("#minorrend text:nth-child("+(j-1)+")").animate({svgX: cx}, 600);
    }
    
    if (mb) {
      highlightpath(mb-2, true);
    }
    let method = findmethod();
    $("#methodname").text(method ? "Method: "+ method : " ");
  }
  //update place notation
  //move lines
  //move corresponding lines???
  //
}

function leadhead() {
  let row = [1,2,3,4,5,6];
  let arr = [row];
  for (let r = 0; r < placenot.length; r++) {
    let next = [];
    let dir = 1;
    for (let p = 0; p < 6; p++) {
      next.push(row[p+dir]);
      dir*=-1;
    }
    arr.push(next);
    row = next;
    next = [];
    let pn = placenot[r];
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
  return row;
}

function placebell(e) {
  let i = $(e.target).index();
  
  if (i > 0) {
    for (let n = 2; n <= 6; n++) {
      let c = (n === i+1 && i+2 != bell) ? "blue" : "black";
      $("#paths path:nth-child("+n+")").attr("stroke", c);
      $("#plainbob circle:nth-child("+n+")").attr("fill", c);
      if (cur) {
        let next = ts[cur][i-1];
        let cc = (n === next && i+2 != bell) ? "blue" : "black";
        $("#copypaths path:nth-child("+n+")").attr("stroke", cc);
      }
    }
    bell = bell === i+2 ? null : i+2;
  }
}

function placebell2(e) {
  let i = $(e.target).index();
  
  for (let n = 1; n <=5; n++) {
    let color = (i+2 != mb && n === i+1) ? "blue" : "black";
    $("#minor circle:nth-child("+n+")").attr("fill", color);
    $("#minorend circle:nth-child("+n+")").attr("fill", color);
  }
  
  if (i+2 === mb) {
    $("#minorlines path.highlight,#minorlinks line.highlight").removeClass("highlight");
    mb = null;
  } else {
    highlightpath(i, mb != i+2);
  }
  
  //mb === i+2 ? null : i+2;
}

function highlightpath(i, yes) {
  $("#minorlines path.highlight,#minorlinks line.highlight").removeClass("highlight");
  
  if (yes) {
    let path = [i+2];
    let c = i+2;

    for (let j = 0; j < 6; j++) {
      let p = nextplace(c, "x");
      path.push(p);
      c = p;
      let pn = placenot[j];
      p = nextplace(c, pn);
      path.push(p);
      c = p;
    }
    
    for (let j = 0; j < path.length; j++) {
      let id = "#row"+j+"place"+path[j];
      if ($(id)) {
        $(id).addClass("highlight");
      }
    }
    
    mb = i+2;
  }
}


function nextplace(p, pn) {
  let p2, dir;
  if (pn === "x") {
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

function ready() {
  $("#copy").show();
  $("#copy").animate({svgY: 240}, 1400);
  $("#ready").hide();
  $(".le2").show();
}