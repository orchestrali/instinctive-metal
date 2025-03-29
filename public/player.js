var playeractive;

$(function() {
  console.log("hello from player file");
  let type = $("#type input:checked").attr("id");
  let checked = 10;
  let timeout;
  check();
  
  $("#submit").on("click", () => {
    type = $("#type input:checked").attr("id");
    if (!["practice", "simulator"].includes(type) && $("#player-"+type).is(":checked") && !playeractive) {
      console.log("player included");
      checked = 0;
      timeout = setTimeout(check, 50);
    }
  });
  
  function check() {
    if (window.bells && !["practice", "simulator"].includes(type)) {
      clearTimeout(timeout);
      //console.log(checked);
      player();
    } else {
      checked++;
      if (checked < 10) {
        timeout = setTimeout(check, 50);
      } else {
        clearTimeout(timeout);
      }
    }
  }
  
  
  function player() {
    console.log("player starting");
    playeractive = true;
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    let numbells;
    let rowArray;
    let bells;
    let rowspeed = 3;
    
    let stroke = 1; //
    let place = 0; //
    let nextBellTime = 0.0; //
    let rownum = 0; //
    let timeout;
    let playing = false;
    let lookahead = 25.0;
    let schedule = 0.1;
    let queue = []; //
    let pealspeed;
    let delay;
    let type;
    let left = 0, top = 0;
    let dy,dx;
    let startleft;
    let numbars;
    let numrounds;
    let gap;
    let stafftimer;
    let lastplace = 0;
    
    function startrestart() {
      numbells = window.numbells;
      rowArray = window.rowArray;
      bells = window.bells;
      $('input[name="hours"]').val(window.hours);
      $('input[name="minutes"]').val(window.minutes);
      pealspeed = window.hours*60 + window.minutes;
      delay = calcdelay(pealspeed);
      type = $("#type input:checked").attr("id");
      numrounds = Math.abs(rowArray[0].rownum)+1;
      gap = $("#handstroke-gap").is(":checked");
      
      $("#pausebutton,#playbutton").hide();
      $("#player").show();
      $("#wait").show();
      sethighlightsize(type, numbells);
      
      setupSample(0);
      
      if (type === "grid") {
        left = Number($("text:first-child").attr("x"))-2;
        $("#highlight").css({"left": (left || "38")+"px", border: "2px solid teal"});
        dy = 20;
      } else if (type === "staff") {
        startleft = Number($("svg:first-child .noteheads ellipse:first-child").attr("cx"))-12;
        left = Number($("svg:nth-child(2) .noteheads ellipse:first-child").attr("cx"))-12;
        $("#highlight").css({"left": startleft + "px", border: "3px solid teal"});
        dx = 30;
        dy = 140;
        numbars = $("svg:nth-child(2) .barlines path").length;
      }
    }
    
    startrestart();
    
    
    //console.log("container width", $(".grid-container").css("width"));
    
    $("#submit").on("click", function() {
      if (!$("#submit").hasClass("disabled")) {
        type = $("#type input:checked").attr("id");
        if (!["practice", "simulator"].includes(type) && $("#player-"+type).is(":checked")) {
          
          console.log("attempting to restart player");
          checked = 0;
          timeout = setTimeout(checknew, 50);
        } else {
          $("#player").hide();
        }
      }
    });
    
    function checknew() {
      if (window.bells) {
        clearTimeout(timeout);
        startrestart();
        $("#playreset").click();
      } else {
        checked++;
        if (checked < 10) {
          timeout = setTimeout(checknew, 50);
        } else {
          clearTimeout(timeout);
        }
      }
    }
    
    
    $("#playbutton").on("click", function() {
      playing = !playing;
      if (audioCtx.state === 'suspended') {
        //console.log("resuming audio");
        audioCtx.resume();
        //if (["grid","staff"].includes(type) && $("#indicate").is(":checked")) $("#highlight").css({"border": (type === "grid" ? "2" : "3") + "px solid teal"});
        
      }
      
      
      if (playing) {
        nextBellTime = audioCtx.currentTime;
        lastplace = -1;
        if (type === "staff") {
          requestAnimationFrame(staff);
        }
        scheduler();
        $("#pausebutton").show();
        $("#playbutton").hide();
        $("#player input").prop("disabled", true);
        $("#submit").addClass("disabled");
      } 
      
    });
    
    $("#pausebutton").on("click", function() {
      playing = false;
      $("#pausebutton").hide();
      $("#playbutton").show();
      clearTimeout(timeout);
      //clearTimeout(stafftimer);
      $("#player input").prop("disabled", false);
      $("#submit").removeClass("disabled");
    });
    
    $("#playreset").on("click", function() {
      place = 0;
      nextBellTime = audioCtx.currentTime;
      rownum = 0;
      queue = [];
      stroke = 1;
      $("#highlight").css("top", 0);
      if (type === "graph") {
        $("#highlight").css({left: 0, border: "none"});
        left = 0;
        top = 0;
      }
      if (type === "staff") {
        $("#highlight").css({left: startleft + "px"});
      }
    });
    
    $('input[name="hours"],input[name="minutes"]').change(function() {
      pealspeed = Number($('input[name="hours"]').val())*60 + Number($('input[name="minutes"]').val());
      delay = calcdelay(pealspeed);
      let query = window.location.search;
      ["hours", "minutes"].forEach(w => {
        if (query.includes(w)) {
          query = query.replace(new RegExp(w+"=\\d+"), w+"="+$("#"+w).val());
        } else {
          query += "&"+w+"="+$("#"+w).val();
        }
      });
      if (history) {
        history.pushState('', '', "/"+query+window.location.hash);
      }
      
      //console.log(delay);
    });
    
    $("#indicate").change(function() {
      if (!$(this).is(":checked")) {
        $("#highlight").css("border", "none");
      } else {
        let border = {grid: "2px", graph: "5px", staff: "3px"};
        border = border[type];
        $("#highlight").css("border", border + " solid teal");
      }
    });
    
    function calcdelay(p) {
      return p/250/(2*numbells+1)*6;
    }
    
    
    function scheduler() {
      while (nextBellTime < audioCtx.currentTime + schedule && rownum < rowArray.length) {
        scheduleRing(place, nextBellTime);
        if (place === numbells-1 && rownum === numrounds-1 && type === "graph" && $("#indicate").is(":checked")) {
          $("#highlight").css({"border": "5px solid teal"});
        } else if (place === numbells-1 && rownum === numrounds-1 && type === "staff" && $("#indicate").is(":checked") && !$("#rowzero").is(":checked")) {
          $("#highlight").css({"border": "3px solid teal"});
        } else if (place === numbells-1 && rownum >= numrounds-1 && type != "staff") {
          movehighlight();
        }
        nextPlace()
      }
      timeout = setTimeout(scheduler, lookahead);
      if (rownum === rowArray.length) {
        $("#pausebutton").click();
        $("#playreset").click();
      }

    }
    
    function scheduleRing(p, t) {
      let bell = bells.find(b => b.num === rowArray[rownum].bells[p]);
      queue.push({bell: bell.bell, stroke: stroke, time: t, place: p});

      if (bell) {
        playSample(audioCtx, bell.buffer, t);
      }

    }
    
    function movehighlight() {
      if (type === "grid") {
        $("#highlight").animate({top: "+="+dy+"px"}, 400);
      } else if (type === "graph") {
        left += 270;
        if (left > Number($(".grid-container").css("width").slice(0,-2))-270) {
          left = 0;
          top += 178;
        }
        $("#highlight").animate({top: top+"px", left: left+"px"}, 400);
      } 
      
      return;
    }
    
    function nextPlace() {
      nextBellTime += delay;

      place++;
      if (place === numbells) {
        if (stroke === -1 && (gap || type != "staff")) nextBellTime += delay; //add handstroke gap
        place = 0;
        stroke *= -1;
        rownum++;
        
      }
      if (type === "staff") {
          //nextSystem();
        }

    }
    
    
    function staff() {
      let current = lastplace;
      let currentTime = audioCtx.currentTime;
      
      while (queue.length && queue[0].time < currentTime - 0.1) {
        current = queue[0].place;
        queue.splice(0,1);
      }
      if (lastplace != current) {
        nextSystem(current);
        lastplace = current;
      }
      requestAnimationFrame(staff);
    }
    
    function nextSystem(current) {
      if (current < numbells-1) {
        $("#highlight").animate({left: "+=30"}, 100);
      } else {
        let dur = stroke === -1 || !gap ? 900*delay : 1900*delay;
        if (rownum <= numrounds ) {
          //let dur = stroke === -1 ? 150 : 300;
          if (rownum === numrounds && $("#rowzero").is(":checked")) {
            $("#highlight").animate({left: left+"px", top: "+=144px"}, dur);
          } else {
            $("#highlight").animate({left: startleft+"px"}, dur);
          }
        } else if ((rownum-numrounds)%numbars === 0) {
          //let dur = stroke === -1 ? 200 : 400;
          $("#highlight").animate({left: left+"px", top: "+=144px"}, dur);
        } else {

          let x = stroke === -1 || !gap ? "+=40px" : "+=70px";
          $("#highlight").animate({left: x}, dur);
        }
      }
      
    }
    
    function playSample(audioContext, audioBuffer, t) {
      //console.log("playSample called");
      const sampleSource = audioContext.createBufferSource();
      sampleSource.buffer = audioBuffer;
      sampleSource.connect(audioContext.destination)
      sampleSource.start(t);
      return sampleSource;
    }
    
    async function setupSample(i) {
      let arrayBuffer = await getFile2(i, bells[i].url);
      if (arrayBuffer) {
        audioCtx.decodeAudioData(arrayBuffer, (buffer) => {
          bells[i].buffer = buffer;
          if (i < bells.length-1) {
            i++;
            setupSample(i);
          } else {
            console.log("finished setting up");
            $("#wait").hide();
            $("#playbutton").show();
          }
        }, (e) => { console.log(e) });
      } else {
        $("#wait").hide();
      }
    }
    
    async function getFile(audioContext, filepath) {
      const response = await fetch(filepath);
      const arrayBuffer = await response.arrayBuffer();
      return arrayBuffer;
    }
    
    async function getFile2(i, filepath) {
      try {
        const response = await fetch(filepath);
        if (!response.ok) {
          console.log("response issue");
          throw new Error(`Response status: ${response.status}`);
        }
        const arrayBuffer = await response.arrayBuffer();
        return arrayBuffer;
      } catch (error) {
        console.log(error.message);
        alert("Sorry, there has been a problem accessing the sound files.");
        return null;
      }
    }
    
  }
  
});

function sethighlightsize(type, numbells) {
  $("#highlight").css("height", type === "grid" ? "19px" : type === "graph" ? "174px" : "106px");
  $("#highlight").css("width", type === "grid" ? numbells*16+"px" : type === "graph" ? "270px" : "24px");
  
}