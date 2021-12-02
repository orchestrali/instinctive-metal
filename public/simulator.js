var audioCtx;
var gainNode;
var bells;
var numbells;
var mybells = [];
var mbells = [];
var duration = 1.3;
var speed = 2.3;
var delay;
var centerrope;
var zoom = 0;
var keysdown = [];

let highlightself = false;
let highlighttreble = false;

let robotopts = {
  hours: 3,
  minutes: 0,
  roundsrows: 2,
  stopatrounds: true,
  nthrounds: 1,
  waitforgaps: true
};
var method;
var comp;
var huntbells;
var playing = false;
var place = 0;
var nextBellTime = 0.0;
var stroke = 1;
var timeout;
var lookahead = 5.0;
var schedule = 0.02;
var rowArr;
var waiting;
var rownum = 0;
var waitgaps = true;
var lastplayed = 0;
var nthrounds = 0;
var roundscount = 0;
var firstcall;
var currentcall;
var callqueue = [];
var lastcall = "";
var lastcallrow = 0;
var thatsall;
var solidme;
var solidtreble;
var courseorder;
var cosallies = false;
var highlightunder;
var fadeabove;
var displayplace;
var placebells = false;
var standbehind = false;
var instruct;
var instructions = [];
var running;
const placeNames = [{num: 1, name: "lead"}, {num: 2, name: "2nds"}, {num: 3, name: "3rds"}];
var colors = ["#000080","#1a1ad6","#5c5ced","#758de6","#9198bf","#babfdb","#c8e6ce","#a4e0b0","#71d184","#3fa654","#007317"];

$(function() {
  let checked = 10;
  let timeout;
  check();
  
  $("#submit").on("click", () => {
    let type = $("#type input:checked").attr("id");
    //console.log(type);
    method = null, courseorder = null, cosallies = false, solidme = false, solidtreble = false;
    if (type === "simulator") {
      checked = 0;
      timeout = setTimeout(check, 100);
    }
  });
  
  function check() {
    //console.log("checking");
    if (window.bells && $(".results").length) {
      clearTimeout(timeout);
      simulator();
      
    } else {
      checked++;
      if (checked < 10) {
        timeout = setTimeout(check, 100);
      } else {
        clearTimeout(timeout);
      }
    }
  }
  
  
  function simulator() {
    //console.log($(".results").length);
    
    numbells = window.numbells;
    bells = window.bells;
    rowArr = window.rowArray;
    firstcall = rowArr[0].call;
    huntbells = window.hunts;
    if (window.courseorder) {
      let arr = window.courseorder;
      courseorder = [];
      method = {co: arr};
      //console.log(method);
      method.co.forEach(n => courseorder.push(n));
      $("#cosallies").on("click", function() {
        cosallies = $(this).prop("checked");
        if (cosallies) {
          let n = courseorder.includes(mybells[0]) ? mybells[0] : courseorder[0];
          colorsally(n);
        } else {
          sallycolor();
        }
      });
    }
    //console.log(rowArr[2]);
    if (!running) {
      start();
    }
    setupSample(0);
    calcspeed();
    centerrope = [1];
    for (let i = 0; i < numbells; i++) {
      position(i,i+1);
      let handstroke = document.getElementById("hand8b"+(i+1));
      handstroke.addEventListener("beginEvent", ring);
      let backstroke = document.getElementById("back11b"+(i+1));
      backstroke.addEventListener("beginEvent", ring);
    }
    assign(1);
    
    $("body").on("click", function() {
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
    });
    
    $("#hours,#minutes").change(calcspeed);
    
    $("#myrope").change(function() {
      let n = Number($("#myrope option:checked").val());
      assign(n);
    });
    
    $("#start").on("click", function() {
      if (!playing) {
        startplay();
      } else {
        thatisall();
      }
    });
    
    $("#reset").on("click", function() {
      //if (!$("#reset").hasClass("disabled")) {
        $("#reset").addClass("disabled");
        $("#display").text("");
        $("#callcontainer").text("");
      for (let i = 1; i <= numbells; i++) {
        pull({bell: i, stroke: -1},audioCtx.currentTime+i*delay);
      }
        rownum = 0;
        place = 0;
        roundscount = 0;
        lastcall = "";
        lastplayed = -1;
        stroke = 1;
        thatsall = false;
        currentcall = null;
      if (method && method.co && cosallies) {
        //console.log("resetting course order");
        courseorder = [];
        method.co.forEach(n => courseorder.push(n));
        if (courseorder.includes(mybells[0])) {
          colorsally(mybells[0]);
        }
      }
      for (let i = 0; i < rowArr.length; i++) {
        let o = rowArr[i];
        o.row.forEach(a => {
          if (a[1]) a[1] = false;
        });
      }
      
      if (instruct) $(".instruct").text("");
      //}
    });
    
    //change stroke duration
    $("#duration").change(function() {
      duration = Number($("#duration").val());
      for (let n = 0; n < numbells; n++) {
        for (let i = 0; i < 15; i++) {
          ["hand","back"].forEach(s => {
            let j = s === "hand" ? i+1 : i;
            document.getElementById(s+j+"b"+n).setAttributeNS(null, "dur", setdur(s,i)+"s");
          });
        }
      }
    });
    
    //prevent typing in inputs from triggering a bell ring
    $("body").on("keydown", "input", function(e) {
      //e.preventDefault();
      e.stopPropagation();
    });
    
    //prevent duplication in keyboard commands
    $("#keyboard").on("keypress", "input.keyboard", function(e) {
      if (mbells.find(o => o.keys.includes(e.key))) {
        e.preventDefault();
      }
    });

    //update keyboard commands
    $("#keyboard").on("keyup", "input.keyboard", function(e) {
      let b = mbells.find(o => o.num === Number(this.id.slice(4)));
      if (b) {
        b.keys = $(this).val();
      }
    });
    
    //ring with keyboard
    $("body").on("keydown", function(e) {
      let bell = mbells.find(o => o.keys.includes(e.key));
      if (bell && !bell.ringing && !keysdown.includes(e.key) && !standbehind) {
        keysdown.push(e.key);
        let stroke = bells.find(b => b.num === bell.num).stroke;
        let o = {bell: bell.num, stroke: stroke};
        pull(o);
      }
    });
    
    //remove keys from keysdown array
    $("body").on("keyup", function(e) {
      let i = keysdown.indexOf(e.key);
      if (i > -1) {
        keysdown.splice(i, 1);
      }
    });
    
    //change volume
    $("#volume").on("change", function(e) {
      gainNode.gain.value = this.value;
    });
    
    $('#simulatoropts input').on("change", function() {
      if (this.id === "stopatrounds") {
        robotopts.stopatrounds = $(this).prop("checked");
      } else if (this.id === "waitforgaps") {
        robotopts.waitforgaps = $(this).prop("checked");
        waitgaps = $(this).prop("checked");
      } else {
        if (this.id === "roundsrows") {
          let rows = Number($(this).val());
          let diff = rows - robotopts.roundsrows;
          for (let i = 0; i < diff; i++) {
            let row = [];
            rowArr[i+1].row.forEach(a => row.push([a[0]]));
            rowArr.unshift({row: row});
          }
          for (let i = 0; i > diff; i--) {
            rowArr.shift()
          }
          if (rownum >= robotopts.roundsrows) rownum += diff;
        }
        robotopts[this.id] = Number($(this).val());
        if (this.id === "nthrounds" && robotopts.nthrounds > 1) {
          robotopts.stopatrounds = true;
          $("#stopatrounds").prop("checked", true);
        }
      }
    });
    
    
    // change perspective on rope circle
    $("#left-right,#up-down").on("change", function() {
      let origin = $("#bells").css("-webkit-perspective-origin");
      if (origin) {
        let orig = origin.slice(0,-2).split("px ").map(n => Number(n));
        switch (this.id) {
          case "left-right":
            orig[0] = 600 - Number(this.value);
            break;
          case "up-down":
            orig[1] = this.value;
            break;
        }
        $("#bells").css("-webkit-perspective-origin", orig.join("px ")+"px");
      }
    });

    // change perspective on rope circle
    $("#depth").on("change", function() {
      $("#bells").css("-webkit-perspective", (1150 - this.value) + "px");
    });

    // change perspective on rope circle
    $("#zoom").on("change", function() {
      let to = Number(this.value);
      let change = to - zoom;
      let max = 0;
      for (let i = 1; i <= numbells; i++) {
        let current = $("#chute"+i).css("transform");
        if (current) {
          let arr = current.split(", ");
          let num = arr.length > 6 ? Number(arr[arr.length-2]) : 0;
          max = Math.max(max, change+num);
          $("#chute"+i).css("transform", "translateZ("+(change + num)+"px)");
        } else {

        }
      }
      zoom = max;
    });
    
    //change sally color
    $("#solidme,#solidtreble").on("click", sallycolor);
    
    //highlight the bell to follow or fade ropes above
    $("#highlightunder,#fadeabove").on("click", function() {
      highlightunder = $("#highlightunder").prop("checked");
      fadeabove = $("#fadeabove").prop("checked");
      if (!highlightunder && !fadeabove) {
        $("#fadeabove,#highlightunder").prop("disabled", false);
        for (let i = 1; i <= numbells; i++) {
          $("#chute"+i).css("opacity", 1);
        }
      } else if (highlightunder) {
        $("#fadeabove").prop("disabled", true);
        if (rownum === 0) {
          highlight(mybells[0]-1);
        }
      } else if (fadeabove) {
        $("#highlightunder").prop("disabled", true);
        if (rownum === 0) {
          let arr = bells.filter(b => b.num && b.num > mybells[0]).map(b => b.num);
          fadeout(arr);
        }
      }
    });

    $("#displayplace").on("click", function() {
      displayplace = $(this).prop("checked");
      if (displayplace) {
        mybells.forEach(b => {
          $("#chute"+b).append(`<div id="instruct${b}" class="instruct"></div>`);
          if (rownum === 0) {
            $("#instruct"+b).text(b === 1 ? "Lead" : b === 2 ? "2nd" : b === 3 ? "3rd" : b+"th");
          }
        });

      } else {
        $("div.instruct").remove();
      }
    });
    
    $("#instructions").on("click", function() {
      instruct = $(this).prop("checked");
      if (instruct && mybells[0]) {
        setupInstruct();
      } else {
        $("#displayplace").prop("disabled", false);
      }
    });
    
    $("#standbehind").on("click", function() {
      standbehind = $(this).prop("checked");
      listeners.forEach(l => {
        mybells.forEach(b => {
          standbehind ? document.getElementById(l.id+b).removeEventListener(l.event, l.f) : document.getElementById(l.id+b).addEventListener(l.event, l.f);
        });
      });
    });
    
    $("#reset").click();
  }
  
});

function start() {
  audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  gainNode = audioCtx.createGain();
  gainNode.gain.value = 0.75;
  running = true;
}

async function getFile(audioContext, filepath) {
  const response = await fetch(filepath);
  const arrayBuffer = await response.arrayBuffer();
  return arrayBuffer;
}

//create sound buffers for all the bells
async function setupSample(i) {
  let arrayBuffer = await getFile(audioCtx, bells[i].url);
  audioCtx.decodeAudioData(arrayBuffer, (buffer) => {
    bells[i].buffer = buffer;
    if (i < bells.length-1) {
      i++;
      setupSample(i);
    } else {
      console.log("finished setting up");

    }
  }, (e) => { console.log(e) });
}

function calcspeed() {
  let h = Number($("#hours").val());
  let m = Number($("#minutes").val());
  let minutes = h*60 + m;
  let wholepull = minutes / 2520;
  delay = wholepull * 60 / (numbells*2+1);
  speed = delay*numbells;
  console.log("delay "+delay);
}

function position(i, num) {
  
  let radius = 270; //update this for non-div by 4 stages
  let zrad = 200;
  let angle = 2*Math.PI/numbells*i;
  if (mybells.length > 1) {
    angle -= Math.PI/numbells;
    centerrope.push(centerrope[0] === numbells ? 1 : centerrope[0]+1);
  }
  let left = radius - radius * Math.sin(angle);
  let z = Math.cos(angle*-1) * zrad - zrad;
  let bell = bells.find(b => b.num === num);
  bell.left = left;
  bell.z = z;
  $("#chute"+num).css({"left": left+"px", transform: "translateZ("+z+"px)"});
}

function rotate(dir) {
  let pos = [];
  for (let i = 1; i <= numbells; i++) {
    let bell = bells.find(b => b.num === i);
    let o = {
      left: bell.left,
      z: bell.z
    }
    pos.push(o);
  }
  
  dir === 1 ? pos.push(pos.shift()) : pos.unshift(pos.pop());
  for (let i = 1; i <= numbells; i++) {
    let bell = bells.find(b => b.num === i);
    $("#chute"+i).css({"left": pos[i-1].left+"px", transform: "translateZ("+pos[i-1].z+"px)"});
    bell.left = pos[i-1].left;
    bell.z = pos[i-1].z;
  }
  /*
  let n = dir === 1 ? numbells-1 : numbells;
  let first = true;
  while (n > 0) {
    if (first) {
      $("#bells").append($(".chute:nth-child("+n+")").detach());
    } else {
      $(".chute:nth-child("+(n+2)+")").after($(".chute:nth-child("+n+")").detach());
    }
    
    n -= 2;
    first = false;
  }
  */
}

function remove(e) {
  if (e) {
    e.removeEventListener("click", emitring);
    e.removeEventListener("mouseenter", pointer);
  }
}

function pointer(e) {
  let num = this.id.startsWith("sally") ? Number(this.id.slice(5)) : Number(this.id.slice(4));
  let bell = bells.find(b => b.num === num);
  if ((this.id.startsWith("sally") && bell.stroke === 1) || (this.id.startsWith("tail") && bell.stroke === -1)) {
    this.style.cursor = "pointer";
  } else {
    this.style.cursor = "auto";
  }
}

var listeners = [
  {id: "hand15b", event: "endEvent", f: endpull},
  {id: "back14b", event: "endEvent", f: endpull},
  {id: "sally", event: "mouseover", f: pointer},
  {id: "sally", event: "click", f: emitring},
  {id: "tail", event: "mouseover", f: pointer},
  {id: "tail", event: "click", f: emitring},
  {id: "hand", event: "touchstart", f: emitring},
  {id: "back", event: "touchstart", f: emitring},
  {id: "hand", event: "touchend", f: prevent},
  {id: "back", event: "touchend", f: prevent}
];

function prevent(e) {
  e.preventDefault();
}

function assign(n) {
  listeners.forEach(l => {
    mybells.forEach(b => {
      document.getElementById(l.id+b).removeEventListener(l.event, l.f);
    });
    if (n && !standbehind) {
      document.getElementById(l.id+n).addEventListener(l.event, l.f);
    }
  });
  if (n) {
    mybells = [n];
    let keys = n < 10 ? n.toString() : n === 10 ? "0" : n === 11 ? "-" : "=";
    keys += "j";
    mbells = [{num: n, keys: keys}];
    $("#mykeys").val(keys);
    
    let diff1 = centerrope[0] - n;
    let diff2 = n-centerrope[0];
    if (diff1 < 0) diff1 += numbells;
    if (diff2 < 0) diff2 += numbells;
    let dir = diff1 <= diff2 ? 1 : -1;
    let diff = dir === 1 ? diff1 : diff2;
    if (diff > 0) {
      $("#myrope").prop("disabled", true);
      rotate(dir);
      diff--;
      let timer = setInterval(function() {
        if (diff > 0) {
          rotate(dir);
          diff--;
        } else {
          $("#myrope").prop("disabled", false);
          centerrope = [n];
          clearTimeout(timer);
        }
      }, 700);
    }
    if (instruct) setupInstruct();
    if (cosallies) {
      //console.log(courseorder);
      colorsally(courseorder.includes(n) ? n : Number(window.methodstage));
      
    }
  }
  
}

function colorsally(n) {
  $("#sally"+n).attr("fill", colors[0]);
  let i = courseorder.indexOf(n);
  for (let j = 1; j <= Math.floor(courseorder.length/2); j++) {
    let next = i+j;
    if (next >= courseorder.length) next -= courseorder.length;
    $("#sally"+courseorder[next]).attr("fill", colors[j]);
    if (courseorder.length%2 === 1 || j < Math.ceil(courseorder.length/2)) {
      let before = i-j;
      if (before < 0) before += courseorder.length;
      $("#sally"+courseorder[before]).attr("fill", colors[colors.length-j]);
    }

  }
}

//given animation event find the buffer to play
function ring(e) {
  //console.log(this.id);
  let bellnum = Number(this.id.startsWith("hand") ? this.id.slice(6) : this.id.slice(7));
  let bell = bells.find(b => b.num === bellnum);
  if (bell) {
    let pan = [];

    let x = (bell.left - 270)/135;
    let z = (bell.z)/100;
    pan.push(x, 10, z);

    let buffer = bell.buffer;
    playSample(audioCtx, buffer, pan);
  }
}

//play sound
function playSample(audioContext, audioBuffer, pan) {
  //console.log("playSample called");
  //console.log(audioBuffer);
  const sampleSource = audioContext.createBufferSource();
  sampleSource.buffer = audioBuffer;
  const panner = audioContext.createPanner();
  panner.panningModel = 'equalpower';
  panner.setPosition(...pan);
  sampleSource.connect(panner).connect(gainNode).connect(audioContext.destination);
  //sampleSource.connect(audioContext.destination);
  sampleSource.start();
  return sampleSource;
}

//emit ring from a click
function emitring(e) {
  let num = this.id.startsWith("sally") ? Number(this.id.slice(5)) : Number(this.id.slice(4));
  let bell = bells.find(b => b.num === num);
  let o = {bell: bell.num};
  if ((this.id.startsWith("sally") || this.id.startsWith("hand")) && bell.stroke === 1) {
    o.stroke = 1;

  } else if ((this.id.startsWith("tail") || this.id.startsWith("back")) && bell.stroke === -1) {
    o.stroke = -1;
  }
  
  pull(o);
}

function pull(obj, t) {
  if (bells) {
    //console.log(obj);
    let id = (obj.stroke === 1 ? "hand1b" : "back0b") + obj.bell;
    let bell = bells.find(b => b.num === obj.bell);
    
    if (bell && bell.stroke === obj.stroke) {
      //if (mybells.includes(obj.bell)) console.log(audioCtx.currentTime);
      let mbell = mbells.find(b => b.num === obj.bell);
      if (mbell) {
        mbell.ringing = true;
        if (playing && rowArr[rownum+1]) {
          let p = rowArr[rownum].row.findIndex(a => a[0] === obj.bell);
          
          let row = rowArr[rownum].row[p][1] ? rowArr[rownum+2] : rowArr[rownum+1];
          let i = row ? row.row.findIndex(a => a[0] === obj.bell) : -1;
          if (highlightunder) {
            let n = i > 0 ? row.row[i-1][0] : i === 0 ? obj.bell : null;
            if (n) highlight(n);
          } else if (fadeabove) {
            let fade = i > -1 ? row.row.slice(i+1).map(a => a[0]) : [];
            if (fade) fadeout(fade);
          }
          if (displayplace) {
            let b = i+1;
            $("#instruct"+obj.bell).text(b === 0 ? "???" : b === 1 ? "Lead" : b === 2 ? "2nd" : b === 3 ? "3rd" : b+"th");
          }
          if (instruct) {
            let j = rownum-robotopts.roundsrows+2;
            if (rowArr[rownum].row[p][1]) j++;
            if (instructions[j]) {
              let text = instructions[j].instruction;
              if (instructions[j].with) text += " with the "+instructions[j].with;
              $("#instruct"+obj.bell).text(text);
            }
          }
          

        }
      }

      //actually pull the rope
      t ? document.getElementById(id).beginElementAt(t-audioCtx.currentTime) : document.getElementById(id).beginElement();

      bell.stroke = obj.stroke * -1;

      let row = rowArr[rownum];
      
      if (playing && row && mybells.includes(obj.bell)) { //&& row[place][0] === bell.num
        let i = row.row.findIndex(a => a[0] === obj.bell);
        if (!row.row[i][1] && ((rownum%2 === 0 && obj.stroke === 1) || (rownum%2 === 1 && obj.stroke === -1))) {
          row.row[i][1] = true;
        } else if (row.row[i][1] && rowArr[rownum+1] && ((rownum%2 === 0 && obj.stroke === -1) || (rownum%2 === 1 && obj.stroke === 1))) {
          let j = rowArr[rownum+1].row.findIndex(a => a[0] === obj.bell);
          if (j > -1 && !rowArr[rownum+1].row[j][1]) rowArr[rownum+1].row[j][1] = true;
        }

      }
      
    }

    if (waiting) {
      waiting = false;
      nextBellTime = Math.max(audioCtx.currentTime, nextBellTime);
      scheduler();
    }

  }
}

function endpull(e) {
  let bellnum = Number(this.id.slice(7));
  let bell = mbells.find(o => o.num === bellnum);
  if (bell) {
    bell.ringing = false;
  }
}

function startplay() {
  playing = true;
  $("#start").text("Stop");
  $("#reset").addClass("disabled");
  $("#options input").prop("disabled", true);
  
  nextBellTime = audioCtx.currentTime;
  if (rownum === 0 && (!mybells.includes(1) || standbehind)) {
    place = -2;
  }
  if (rownum === 0 && mybells.includes(1) && !standbehind) {
    waiting = true;
    requestAnimationFrame(animater);
  } else {
    console.log("starting");
    waiting = false;
    scheduler();
    requestAnimationFrame(animater);
  }
}

function nextPlace() {
  nextBellTime += delay;
  //console.log("adding delay "+place);
  place++;
  if (place === 1) {
    if (currentcall) {
      callqueue.push({call: currentcall, time: nextBellTime, rownum: rownum});
    }
    if (placebells && rowArr[rownum].name === "leadhead") {
      for (let i = 1; i <= numbells; i++) {
        let p = rowArr[rownum].row.findIndex(a => a[0] === i);
        
        $("#chute"+i+" .placebell").text(placeName(p+1)+" place bell");
      }
    }
    let ct = $('input[name="callType"]:checked').val()
    if (cosallies && ["b","s"].includes(rowArr[rownum].type) && ["a","b"].includes(ct)) {
      let b = ct === "a" ? rowArr[rownum].row[3][0] : rowArr[rownum].row[Number(window.methodstage)-3][0];
      let i = courseorder.indexOf(b);
      let j;
      switch (ct) {
        case "b":
          j = i-2;
          if (j < 0) j+=courseorder.length-1;
          break;
        case "a":
          j = i+2;
          if (j >= courseorder.length) j-=courseorder.length-1;
          break;
      }
      
      if (rowArr[rownum].type === "s") {
        courseorder[i] = courseorder[j];
        courseorder[j] = b;
      } else {
        courseorder.splice(i,1);
        courseorder.splice(j,0,b);
      }
      console.log(courseorder);
      colorsally((mybells[0] && courseorder.includes(mybells[0])) ? mybells[0] : Number(window.methodstage));
    }
  }
  if (place === numbells) {
    //console.log("rownum "+rownum);

    if (stroke === -1) nextBellTime += delay + .23*duration; //add handstroke gap
    if (stroke === 1) nextBellTime -= .23*duration;
    place = 0;
    stroke *= -1;
    rownum++;
    currentcall = rowArr[rownum] && rowArr[rownum].call ? rowArr[rownum].call : " ";

    if (rownum === rowArr.length-2) {
      roundscount++;
      if ((roundscount === robotopts.nthrounds && robotopts.stopatrounds) || comp) {
        thatsall = true;
        if (currentcall === " ") currentcall = "That's all!";
      }
    }

    if (rownum === rowArr.length && !thatsall) {
      //repeating
      //console.log("no next row");
      rownum = robotopts.roundsrows;
    } else if (rownum === rowArr.length && thatsall) {
      thatisall();
    }

  }

}

function scheduleRing(p, t) {
  if (p > -1) {
    let num = rowArr[rownum].row[p];
    //console.log(num);
    let bell = num && num.length ? !mybells.includes(num[0]) || standbehind : null;

    if (bell) {
      //console.log("scheduling "+num[0] + " time "+t);
      //soundqueue.push({bell: num[0], stroke: stroke, time: t, place: p});
      //console.log("soundqueue "+soundqueue.length);
      pull({bell: num[0], stroke: stroke}, t);
    }
    if (rownum === 0 && p === 0) {
      callqueue.push({call: "", time: t, rownum: rownum});
      //socket.emit("call", "");
    }
    if (rownum === robotopts.roundsrows-2 && p === 1 && firstcall) {
      callqueue.push({call: firstcall, time: t, rownum: rownum});
    }

    if (!bell && waitgaps && (!num || !num[1])) {
      //console.log("pull expected at "+t);

      waiting = t;
    } else {
      nextPlace();
    }



  } else {
    let call = p === -2 ? "Look to" : "Treble's going";
    callqueue.push({call: call, time: t, rownum: rownum});
    //socket.emit("call", call);
    nextPlace();
  }


}

function scheduler() {
    
  while (nextBellTime < audioCtx.currentTime + schedule && rowArr[rownum] && !waiting) {
    scheduleRing(place, nextBellTime);
  }
  !waiting && rowArr[rownum] ? timeout = setTimeout(scheduler, lookahead): clearTimeout(timeout);

}

function animater() {
  let call = lastcall;
  let callrow = lastcallrow;
  let currentTime = audioCtx.currentTime;
  
  while (callqueue.length && callqueue[0].time < currentTime) {
    call = callqueue[0].call;
    callrow = callqueue[0].rownum;
    callqueue.shift();
  }
  if (call != lastcall || callrow != lastcallrow) {
    $("#callcontainer").text(call);
    lastcall = call;
    lastcallrow = callrow;
  }
  requestAnimationFrame(animater);
}

function thatisall() {
  playing = false;
  waiting = false;
  clearTimeout(timeout);
  $("#start").text("Start");
  $("#reset").removeClass("disabled");
  $("#options input").prop("disabled", false);
  if (instruct) $("#displayplace").prop("disabled", true);
  if (displayplace) $("#instructions").prop("disabled", true);
}

function updaterobot(obj) {
  robotopts = obj;
  for (let key in robotopts) {
    if (key === "stopatrounds") {
      $("#stopatrounds").prop("checked", robotopts[key]);
    } else if (key === "waitforgaps") {
      $("#waitforgaps").prop("checked", robotopts[key]);
      waitgaps = robotopts[key];
    } else {
      $("#"+key).val(robotopts[key]);
    }
  }
  calcspeed(robotopts.hours, robotopts.minutes);
}

function highlight(n) {
  for (let i = 1; i <= numbells; i++) {
    $("#chute"+i).css("opacity", i === n ? 1 : 0.4);
  }
}

function fadeout(arr) {
  for (let i = 1; i <= numbells; i++) {
    $("#chute"+i).css("opacity", arr.includes(i) ? 0.4 : 1);
  }
}

function sallycolor(e) {
  solidme = $("#solidme").prop("checked");
  solidtreble = $("#solidtreble").prop("checked");
  for (let b = 1; b <= numbells; b++) {
    $("#sally"+b).attr("fill", solidme && mybells.includes(b) ? "darkred" : solidtreble && b===1 ? "red" : "url(#sallypattern)");
  }

}

function setdur(s,i) {
  let n = duration/21;
  let dur = [0,14].includes(i) ? 3*n : [1,13].includes(i) ? 2*n : n;
  return dur;
}

function setupInstruct() {
  $(".instruct").remove();
  displayplace = false;
  $("#displayplace").prop("checked", false);
  $("#displayplace").prop("disabled", true);
  describe(rowArr, mybells[0], Number(window.methodstage));
  $("#chute"+mybells[0]).append(`<div id="instruct${mybells[0]}" class="instruct"></div>`);
}



function describe(rowArray, bell, stage) {
  instructions = [];
  var places = '1234567890ET';
  let i = 1;
  let work = [];

  while (i < rowArray.length-2) {
    let s = getPlace(i);
    let t = getPlace(i+1);
    let u = getPlace(i+2);

    if (t == s && u == s) { 
      let count = 3;
      while (checkPlace(i+count, s)) {
        count++;
      }
      work.push(count + " blows in " + placeName(s));
      instructions[i] = {instruction: count + " blows in " + placeName(s)};
      i += count-1;
    } else if (t == s) {
      //console.log("Make place");
      work.push(makePlace(s, i));
      instructions[i] = {instruction: makePlace(s, i)};
      i++;
    } else if (t-s === u-t) {
      //console.log("Hunt");
      let dir = t-s;
      let dirName = dirname(dir);
      //let treble = huntbells[0] && getBell(i,s+dir) === huntbells[0] ? ", pass "+huntbells[0]+" in "+s+"–"+t : "";
      instructions[i] = {instruction: "Hunt " + dirName};
      let place = u;
      while (getPlace(i+3)-place === dir) {
        i++;
        place+=dir;
      }
      work.push("Hunt " + dirName);
      i++;
      //console.log("i is now "+i);
    } else if (t == u) {
      //console.log("also make place");

      let last = work.length > 0 ? work[work.length-1] : "";
      let x = last.indexOf("Point") == -1 || last.indexOf("Fish") == -1 ? i : i+1;
      let v = rowArray[i+3] ? getPlace(i+3) : null;
      if (v != u) {
        work.push(makePlace(t, i+1));
        instructions[x] = {instruction: makePlace(t, i+1)};
        i+=1;
      } else {
        let count = 3;
        while (checkPlace(i+count+1, t)) {
          count++;
        }
        work.push(count + " blows in " + placeName(t));
        instructions[x] = {instruction: count + " blows in " + placeName(t)};
        i += count;
      }
    } else {
      //point, fishtail, or dodge
      let dir1 = t-s;
      let v = rowArray[i+3] ? getPlace(i+3) : null;

      if (v == u || v-u != dir1) {
        let stroke = (i+1) % 2 === 0 ? " at hand" : " at back";
        work.push("Point " + placeName(t));
        instructions[i] = {instruction: "Point " + placeName(t) + stroke};
        instructions[i].with = getBell(i+1,s);
        i+=1;
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
          instructions[starti] = {instruction: "Fishtail " + places + points};
          instructions[starti].with = getBell(starti+1,s);
          //if (getPlace(i) == s) 
          i-=2;
        } else if (getPlace(i+1) == t || getPlace(i+1) == t+dir1 || getPlace(i+1) == null) {
          let places = s > t ? t + "-" + s : s + "-" + t;
          work.push(dodgeNum(count) + places + " " + dirname(dir1));
          instructions[starti] = {instruction: dodgeNum(count) + places + " " + dirname(dir1)};
          instructions[starti].with = getBell(starti+1,s);
          i--;
        }

      }

    }
  }

  let penult = getPlace(rowArray.length-2);
  let ult = getPlace(rowArray.length-1);

  if (i === rowArray.length-2) {
    let dir = ult-penult;
    if (dir != 0) {
      work.push("Hunt " + dirname(dir));
      instructions[rowArray.length-2] = {instruction: "Hunt " + dirname(dir)};
    } else if (ult == penult) {
      work.push(makePlace(ult));
      instructions[rowArray.length-2] = {instruction: makePlace(ult)};
    }
  }

  function getPlace(j) {
    return rowArray[j] ? rowArray[j].row.findIndex(a => a[0] === bell)+1 : null;
  }

  function getBell(row, place) {
    return rowArray[row].row[place-1][0];
  }

  function checkPlace(row, value) {
    return getPlace(row) === value;
  }

  function makePlace(num, rownum) {
    if (num == 1 && rownum % 2 == 1) return "Lead wrong";
    else if (num == 1 ) return "Lead full";
    else if (num == stage) return "Lie behind";
    else return "Make " + placeName(num);
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

  



}

function placeName(num) {
    //console.log("num to place " + num);
    if (0 < num && num < 4) {
      return placeNames[num-1].name;
    } else {
      return num + "ths";
    }
  }