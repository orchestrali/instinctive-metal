

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
  
  
  $("#stages > div").on("click", function() {
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
      console.log(positions);
      $(".selected").removeClass("selected");
      $(this).addClass("selected");
      if (stage === 5) {
        $("#bob").css({color: "lightgray", "border-color": "gray"});
      } else {
        $("#bob").attr("style", "");
      }
    }
  });
  
});