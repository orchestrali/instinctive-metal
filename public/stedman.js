var pborder = [1,7,11,8,4,3,2,5,9,10,6];
var pbstage = 11;
var pcstage = 5;
var pn = [3,1,"n",3,1,3,1,3,"n",1,3,1];
var bluebell = 1;
var qs = [0, 1, -1, -1, -1, 1, 1, -1, -1, 1, 1, -1];

var sixes = [
  {name: "quick", paths: [{color: "lightblue", x: "104", path: "v20 l32,40 v20 l-16,20"},
                         {color: "lightblue", x: "120", path: "l16,20 v20 l-32,40 v20"}]},
  {name: "45 up slow"},
  {name: "67 up quick", stages: 7},
  {name: "89 up slow", stages: 9},
  {name: "0E up quick", stages: 11},
  {name: "0E down slow", stages: 11},
  {name: "89 down quick", stages: 9},
  {name: "67 down slow", stages: 7},
  {name: "45 down quick"},
  {name: "monday", paths: [{color: "pink", x: "104", path: "l32,40 v20 l-32,40 l16,20"}]},
  {name: "tuesday", paths: [{color: "pink", x: "120", path: "l16,20 v20 l-32,40 v20 l16,20"},
                           {color: "lightblue", x: "136", path: "l-32,40 v20 l32,40"}]},
  {name: "wednesday", paths: [{color: "pink", x: "120", path: "l-16,20 v20 l32,40 v 20"},
                             {color: "pink", x: "136", path: "v20 l-32,40 v20 l16,20 l-16,20"}]},
  {name: "thursday", paths: [{color: "lightblue", x: "136", path: "l-32,40 v20 l32,40"},
                            {color: "pink", x: "104", path: "v20 l32,40 v20 l-32,40"}]},
  {name: "friday", paths: [{color: "pink", x: "104", path: "l32,40 v20 l-32,40"}]},
  {name: "45 up quick"},
  {name: "67 up slow", stages: 7},
  {name: "89 up quick", stages: 9},
  {name: "0E up slow", stages: 11 },
  {name: "0E down quick", stages: 11},
  {name: "89 down slow", stages: 9},
  {name: "67 down quick", stages: 7},
  {name: "45 down slow"}
];
//drawpath(1);
var startpaths = ["",
  `<path stroke="lightblue" d="M120,35 l-16,20 v20" /><path stroke="lightblue" d="M136,35 v20 l-16,20" />`,
  `<path stroke="lightblue" d="M104,35 l32,40" /><path stroke="pink" d="M136,35 v20 l-32,40" />`,
  `<path stroke="lightblue" d="M104,35 l32,40" /><path stroke="pink" d="M120,35 l-16,20 v20 l16,20" />`
];

placebellcircle(11);
plaincourse(5);

$(function() {
  var stages = ["doubles", "triples", "caters", "cinques"];
  var stage = 5;
  var stagename = "doubles";
  var six = 1;
  var single;
  var positions = [
    {name: "quick", top: "107px", left: "27px", start: 1},
    {name: "45 up slow", top: "27px", left: "147px", },
    {name: "45 down slow", top: "27px", left: "223px", start: 4},
    {name: "monday", top: "27px", left: "320px", },
    {name: "tuesday", top: "57px", left: "400px", start: 3},
    {name: "wednesday", top: "107px", left: "480px", },
    {name: "thursday", top: "157px", left: "400px", start: 2},
    {name: "friday", top: "187px", left: "320px", },
    {name: "45 up quick", top: "187px", left: "223px", start: 5},
    {name: "45 down quick", top: "187px", left: "147px", },
  ];
  positions.forEach(p => {
    if (p.start) p.bell = p.start;
  });
  
  $("#nav-options").click(function() {
    $("#nav-options ul").slideToggle(600, "swing");
    $(".arrow").toggleClass("rotate");
    
  });
  
  $("#nextsix").click(function() {
    for (let i = 1; i <= stage; i++) {
      let idx = positions.findIndex(p => p.bell === i);
      let next = idx === positions.length-1 ? 0 : idx+1;
      $("#bell"+i).css({top: positions[next].top, left: positions[next].left});
      positions[idx].bell = null;
      positions[next].bell = i;
    }
    six *= -1;
    if (stage === 5 && single) {
      single = false;
      $("#single").attr("style", "");
    }
  });
  
  $("#bob").click(function() {
    if (stage > 5) {
      for (let i = 1; i <= stage; i++) {
        let idx = positions.findIndex(p => p.bell === i);
        let num = Number(positions[idx].name[0]);
        if (num === 1) num = 10;
        let str = num ? positions[idx].name.slice(0, positions[idx].name.lastIndexOf(" ")) : null;
        let next = idx === positions.length-1 ? 0 : num === stage-3 && positions[idx].name.includes("up") ? idx+3 : num === stage-1 ? positions.findIndex((p,j) => p.name.startsWith(str) && j%2 !== idx%2) : idx+1;
        $("#bell"+i).css({top: positions[next].top, left: positions[next].left});
        positions[idx].bell = null;
        positions[next].bell = i;
      }
      six *= -1;
    }
    
  });
  
  $("#single").click(function() {
    if (stage > 5) {
      for (let i = 1; i <= stage; i++) {
        let idx = positions.findIndex(p => p.bell === i);
        let num = Number(positions[idx].name[0]);
        if (num === 1) num = 10;
        let next = idx === positions.length-1 ? 0 : num === stage-3 && positions[idx].name.includes("up") ? idx+3 : num === stage-1 && positions[idx].name.includes("down") ? idx-1 : idx+1;
        $("#bell"+i).css({top: positions[next].top, left: positions[next].left});
        positions[idx].bell = null;
        positions[next].bell = i;
      }
      six *= -1;
    } else {
      if (!single) {
        let idx = positions.findIndex(p => p.name.startsWith("4") && p.bell);
        let idx2 = positions.slice(idx+1).findIndex(p => p.name.startsWith("4") && p.bell) + idx+1;
        let bell1 = positions[idx].bell;
        let bell2 = positions[idx2].bell;
        $("#bell"+bell1).css({top: positions[idx2].top, left: positions[idx2].left});
        $("#bell"+bell2).css({top: positions[idx].top, left: positions[idx].left});
        positions[idx].bell = bell2;
        positions[idx2].bell = bell1;
        single = true;
        $("#single").css({color: "lightgray", "border-color": "gray"});
      }
      
    }
    
  });
  
  $("#reset").click(function() {
    for (let i = 1; i <= stage; i++) {
      let idx = positions.findIndex(p => p.bell === i);
      let next = positions.findIndex(p => p.start === i);
      $("#bell"+i).css({top: positions[next].top, left: positions[next].left});
      if (idx > -1) positions[idx].bell = null;
      positions[next].bell = i;
    }
    six = 1;
  });
  
  $("#pbstages > div").on("click", function() {
    if (!$(this).hasClass("selected")) {
      let nstage = Number(this.id.slice(5));
      if (nstage > pbstage) {
        for (let i = pbstage+1; i <= nstage; i++) {
          $("#circleanim .container").append(`<div class="number" id="n${i}">${i}</div>`);
        }
      } else if (nstage < pbstage) {
        for (let i = nstage+1; i <= pbstage; i++) {
          $("#n"+i).remove();
        }
      }
      pbstage = nstage;
      placebellcircle(pbstage);
      $("#pbstages .selected, .number.selected").removeClass("selected");
      $(this).addClass("selected");
      $(".number").css("border", "none");
    }
  });
  
  $(".number").on("click", function() {
    if (!$(this).hasClass("selected")) {
      $(".number.selected").removeClass("selected");
      $(this).addClass("selected");
      let mine = Number(this.id.slice(1));
      console.log(mine);
      let bells = pborder.filter(b => b <= pbstage).reverse();
      while (bells[0] != mine) {
        bells.push(bells.shift());
      }
      for (let i = 1; i < bells.length; i++) {
        let color;
        switch (i) {
          case 1: case 2:
            color = "blue";
            break;
          case pbstage-1: case pbstage-2:
            color = "red";
            break;
          default:
            color = "purple";
        }
        $("#n"+bells[i]).css("border", "2px solid "+color);
      }
    } else {
      $(".number.selected").removeClass("selected");
      $(".number").css("border", "none");
    }
  });
  
  $("#workstages > div").on("click", function() {
    if (!$(this).hasClass("selected")) {
      let newstage = stages.indexOf(this.id)*2+5;
      let diff = (newstage - stage)/2;
      if (diff > 0) {
        let start = (stage-5)/2;
        let html = `<div class="station slow"><div class="label"></div></div><div class="station quick"><div class="label"></div></div>`;
        for (let i = 0; i < diff; i++) {
          $("#dodgeslow,#dodgequick").prepend(html);
          let p = {
            name: ["67","89","1011"][start+i] + " up slow",
            top: "27px",
            left: 223 + (start+i)*76 + "px"
          };
          if (start+i === 0) p.start = 7, p.bell = 7;
          if (start+i === 2) p.start = 11, p.bell = 11;
          let p2 = {
            name: ["67","89","1011"][start+i] + " down slow",
            top: "27px",
            left: 223 + (start+i+1)*76 + "px"
          };
          if (start+i === 1) p2.start = 8, p2.bell = 8;
          positions.splice(2+start+i, 0, p, p2);
          for (let j = 2+start+i+2; j < positions.length-1-start-i; j++) {
            let current = positions[j];
            let oldleft = Number(current.left.slice(0,-2));
            let left = oldleft + 2*76;
            current.left = left + "px";
          }
          let q = {
            name: ["67","89","1011"][start+i] + " up quick",
            top: "187px",
            left: 223 + (start+i+1)*76 + "px"
          };
          if (start+i === 1) q.start = 9, q.bell = 9;
          let q2 = {
            name: ["67","89","1011"][start+i] + " down quick",
            top: "187px",
            left: 223 + (start+i)*76 + "px"
          };
          if (start+i === 0) q2.start = 6, q2.bell = 6;
          if (start+i === 2) q2.start = 10, q2.bell = 10;
          positions.splice(positions.length-1-start-i, 0, q, q2);
          for (let n = stage+1+i*2; n < stage+3+i*2; n++) {
            $("#bellcontainer").append(`<div class="bell" id="bell${n}">${n}</div>`);
          }
        }
      } else {
        let start = (stage-5)/2;
        for (let i = 0; i > diff; i--) {
          $("#dodgeslow,#dodgequick").children("div:nth-child(-n+2)").detach();
          positions.splice(1+start+i, 2);
          let index = positions.findIndex(p => p.name === "friday");
          positions.splice(index+1+start+i, 2);
          for (let j = 1+start+i; j < index+1+start+i; j++) {
            let current = positions[j];
            let oldleft = Number(current.left.slice(0,-2));
            let left = oldleft - 2*76;
            current.left = left + "px";
          }
        }
        for (let n = newstage+1; n <= stage; n++) {
          $("#bell"+n).remove();
        }
      }
      for (let n = 0; n < (newstage-3)/2; n++) {
        let places = (2*n+4)+"-"+(2*n+5);
        $("#dodgeslow > div:nth-child("+(n+1)+") .label").text(places+" up");
        $("#dodgeslow > div:nth-last-child("+(n+1)+") .label").text(places+" down");
        $("#dodgequick > div:nth-child("+(n+1)+") .label").text(places+" down");
        $("#dodgequick > div:nth-last-child("+(n+1)+") .label").text(places+" up");
      }
      stage = newstage;
      $("#reset").click();
      //console.log(positions);
      $("#workstages .selected").removeClass("selected");
      $(this).addClass("selected");
      if (stage === 5) {
        $("#bob").css({color: "lightgray", "border-color": "gray"});
      } else {
        $("#bob").attr("style", "");
      }
    }
  });
  
  $("#bluebell").on("change", (e) => {
    bluebell = Number($("#bluebell option:checked").val());
    plaincourse(pcstage);
  });
  
  $("#pcstages > div").on("click", (e) => {
    if (!$(e.target).hasClass("selected")) {
      $("#pcstages > div").removeClass("selected");
      $(e.target).addClass("selected");
      pcstage = Number($(e.target).attr("id").slice(1));
      if (bluebell > pcstage) bluebell = 1;
      plaincourse(pcstage);
    }
  });
  
});


function placebellcircle(n) {
  let r = 60;
  let th = 2*Math.PI/n;
  let bells = pborder.filter(b => b <= n);
  for (let i = 0; i < bells.length; i++) {
    let left = 135-r*Math.sin(i*th);
    let top = 60-r*Math.cos(i*th);
    $("#n"+bells[i]).css({left: left+"px", top: top+"px"});
  }
}

function plaincourse(n) {
  let textlength = 16*n-8;
  let html = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="375" height="${240*n+100}" >
  <text x="100" y="40" textLength="${textlength}">`;
  $("#bluebell option").remove();
  $("select#bluebell").append(`<option></option>`);
  let startrow = [];
  for (let b = 1; b <= n; b++) {
    startrow.push(b);
    $("select#bluebell").append(`<option value="${b}">${b}</option>`);
  }
  html += startrow.map(b => b === 10 ? "0" : b === 11 ? "E" : b).join(" ") + '</text>';
  let y = 60;
  let prevrow = startrow;
  for (let l = 0; l < n; l++) {
    for (let i = 0; i < pn.length; i++) {
      let change = pn[i];
      let row = [];
      let dir = 1;
      if (change === "n") {
        html += `
        <path stroke-width="1" stroke="black" fill="none" d="M95,${y-16} h${16*n+2}" />`;
      }
      for (let p = 1; p <= n; p++) {
        if (change === p || (change === "n" && p === n)) {
          row.push(prevrow[p-1]);
        } else {
          row.push(prevrow[p-1+dir]);
          dir *= -1;
        }
      }
      html += `
      <text x="100" y="${y}" textLength="${textlength}">` + row.map(b => b === 10 ? "0" : b === 11 ? "E" : b).join(" ") + '</text>';
      prevrow = row;
      y += 20;
    }
  }
  html += `
  ${drawpath(bluebell)}
  </svg>`;
  $("#plain-course-container").html(html);
}

function drawpath(b) {
  $('#bluebell option:nth-child('+(b+1)+')').prop("selected", true);
  let startx = b*16+88;
  let path = `<path stroke-width="2" stroke="blue" fill="none" d="M ${startx} 35`;
  let other = `<g stroke-width="4" fill="none" opacity="0.5">
  `;
  let six = 1;
  let sq = qs[b];
  let front = -1;
  switch (b) {
    case 1:
      front = 0;
      break;
    case 2:
      front = 12;
      break;
    case 3:
      front = 10;
      break;
  }
  if (startpaths[b]) other += startpaths[b];
  let place = b;
  for (let l = 0; l < pcstage; l++) {
    for (let i = 0; i < pn.length; i++) {
      let change = pn[i];
      if (change === "n") {
        six *= -1;
        if (place === 3) sq *= -1, front = -1;
        if (front > 0) front++;
        if (place === 4) front = six === 1 ? 0 : 9;
      }
      
      if (place === change || (change === "n" && place === pcstage)) {
        path += ` v20`;
        if (place === pcstage) {
          other += `<path stroke=${(sq === 1 && pcstage === 5) ? "pink" : sq === -1 ? "lightblue" : "lightgray"} d="M ${(place-1)*16+88} ${55+l*240+i*20} l 16 20 l -16 20 l 16 20 l -16 20 l 16 20" />`;
        }
      } else if ((change === 1 && place%2 === 0) || (change === "n" && place%2 === 1) || (change === 3 && (place === 1 || (place > 3 && place%2 === 0)))) {
        path += ` l 16 20`;
        place++;
        if (place > 3 && change === "n") {
          other += `<path stroke=${(place === 4 && sq === -1) ? "pink" : (sq === 1 && [pcstage-1,pcstage-3].includes(place)) ? "lightblue" : "lightgray"} d="M ${(place+1)*16+88} ${55+l*240+i*20} l -16 20 l 16 20 l -16 20 l 16 20 l -16 20" />`;
        }
        
      } else if ((change === 1 && place%2 === 1) || (change === "n" && place%2 === 0) || (change === 3 && (place === 2 || (place > 3 && place%2 === 1)))) {
        path += ` l -16 20`;
        place--;
        if (place > 3 && change === "n") {
          other += `<path stroke=${(place === 5 && sq === 1) ? "pink" : (sq === -1 && [pcstage, pcstage-2].includes(place)) ? "lightblue": "lightgray"} d="M ${(place-1)*16+88} ${55+l*240+i*20} l 16 20 l -16 20 l 16 20 l -16 20 l 16 20" />`;
        }
      }
      if (change === "n" && front > -1 && (l < pcstage-1 || i < 8)) {
        let obj = sixes[front].paths;
        obj.forEach(o => {
          other += `<path stroke="${o.color}" d="M${o.x},${55+l*240+i*20} ${o.path}" />`;
        });
      }
    }
  }
  path += `" />
  `;
  return path + other + "</g>";
  //$("#plain-course-container svg").append(path);
}