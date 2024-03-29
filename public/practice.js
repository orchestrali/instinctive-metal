



$(function() {
  console.log("hi from the other file!");
  //console.log(window.bluepath);
  
  let checked = 10;
  let timeout;
  check();
  
  $("#submit").on("click", () => {
    let type = $("#type input:checked").attr("id");
    if (type === "practice") {
      checked = 0;
      timeout = setTimeout(check, 50);
    }
  });
  
  function check() {
    if (window.bluepath && $(".results").length) {
      clearTimeout(timeout);
      practice();
    } else {
      checked++;
      if (checked < 10) {
        timeout = setTimeout(check, 50);
      } else {
        clearTimeout(timeout);
      }
    }
  }
  
  function practice() {
  console.log("starting");
  function blueBellOpts(stage) {
    $("select#blueBell option:nth-child(n+2)").remove();
    for (var i = 1; i <= stage; ++i) {
      $('<option></option').text(i).val(i).appendTo('select#blueBell');
    }
  }
  var formStage = Number($('select#stage option:checked').val());
  
  $('#stage').change(function() {
    formStage = Number($('select#stage option:checked').val());
    blueBellOpts(formStage);
  });
  
  var TweenLite = window.TweenLite;
  var TweenMax = window.TweenMax;
  var TimelineMax = window.TimelineMax;
  var Linear = window.Linear;
  var Quad = window.Quad;
  var Power3 = window.Power3;
  
  let bluePlaces = window.bluepath;
  let huntPaths = window.huntpaths;
  let rowObjArr = window.rowObjArr;
  var places = '1234567890ET';
  
  let params = (new URL(document.location)).searchParams;
  let stage = Number(params.get("stage"));
  let name = params.has("methodName") ? params.get("methodName") : null;
  console.log("methodName " + name);
  
  //console.log(bluePlaces[0]);
  let numbers = params.has("numbers");
  let tutor = params.has("tutorial");
  let firstInstruct = tutor ? $("#tutorial").text() : "";
  
  var i = 1;
  let numBells;
  if (rowObjArr) {
    numBells = rowObjArr[0].bells.length; //actually numbells
  }
  let textx = 115 - 8*(numBells - 6);
  let startx = 120 - 8*(numBells - 6);
  
  let svg = document.getElementById("container");
  let timeMove;
  let lastClick;
  let clickInts = [];
  let medClickInt = 2000;
  let numRows = 0;
  let distMoved = 0;
  let stopped = false;
  let numErrors = 0;
  
  //console.log('change-count length: ', $('#change-count').length);
  
  //when a direction button is clicked, save the value as a number and check it
  $('button.direction').click(function() {
    let value = $(this).prop("value")*1;
    //console.log(value);
    checkButton(value);
  });
  
  //use arrow keys for practice
  $(document.body).on("keydown", function(e) {
    let value;
    let key = e.which;
    let keys = [{key: 37, value: -1},{key: 40, value: 0},{key: 39, value: 1}];
    
    if (keys.findIndex(o => o.key == key) > -1) {
      e.preventDefault();
      value = keys.find(o => o.key == key).value;
      checkButton(value);
    }
    
  });
  
  
  function checkButton(button) {
  if (bluePlaces.length > i) {
    
    let correct = bluePlaces[i]-bluePlaces[i-1];
    if (button == correct) {
      $('#errors').text('');
      $('#err-rect').removeClass('translucent').addClass('invisible');
      $('#change-count').text('Changes: '+i);
      addStuff();
    } else if (button != correct) {
      $('#err-rect').removeClass('invisible').addClass('translucent');
      $('#errors').text('Wrong! Try again.');
      numErrors++;
      $('#err-count').text('Errors: '+numErrors);
    }
  }
  
}
  
  
  function addStuff() {
  if (rowObjArr.length >= i) {
    let now = Date.now();
    numRows ++;
    let lastClickInt;
    if (lastClick) {
      lastClickInt = now-lastClick;
      //console.log('lastClick exists');
      clickInts.push(lastClickInt);
      clickInts.sort(function(a, b){
        return a - b;
      });
      medClickInt = clickInts[Math.floor(clickInts.length/2)];
    }
    //console.log("medClickInt", medClickInt);
    //console.log("lastClickInt", lastClickInt);
    
    function animate2() {
      let tl = new TimelineMax({repeat:0});
      let currentPos = svg.getAttributeNS(null, "viewBox");
      let clickInt = Math.max(Math.min(medClickInt, 2000), 300)-100;
      let newPos;
      if (distMoved >= i*20-180 || i < 18) {
        //console.log("move slowly");
        newPos = 500/clickInt*10;
      } else if (distMoved <= i*20-360) {
        newPos = 500/clickInt*30;
      } else {
        newPos = 500/clickInt*20;
      }
      if (rowObjArr.length == i-1) {
        newPos /= 2
      }
      distMoved += newPos;
      
      
      if (distMoved < (i-1)*20 && rowObjArr.length >= i) {
        tl.to("#container", 0.5, {attr:{viewBox:"0 "+distMoved+" 320 400"}, repeat:0, ease: Linear.easeNone, onComplete:animate2});
        stopped = false;
      } else if (rowObjArr.length == i-1){
        //console.log('i is greater than rowObjArr length');
        tl.to("#container", 1.5, {attr:{viewBox:"0 "+distMoved+" 320 400"}, repeat:0, ease:Power3.easeOut});
        stopped = true;
      } else {
        console.log("stopped");
        stopped = true;
      }
      
    }
    
    
    if (!timeMove || (stopped && rowObjArr.length >= i)) {
      timeMove = now;
      animate2();
    }
    
    lastClick = now;
    
    for (var k = 0; k < huntPaths.length; k++) {
      addLine(huntPaths[k], 'treblepath', i, lastClickInt);
    }
    let row2type;
    if (rowObjArr.length-2 < i) {
      row2type = "p"
    } else {
      row2type = rowObjArr[i+1].type;
    }
    
    let row = [];
    for (var j = 0; j < rowObjArr[i-1].bells.length; ++j) {
      
      //take each number in the array of bells and find the character that represents it in the places string
      let number = rowObjArr[i-1].bells[j];
      row.push(places[number-1]);
    }
    
    let lines = ["new six", "leadhead", "LE", "HL", "SE"];
    if ($("#drawLH").is(":checked") && lines.includes(rowObjArr[i-1].name)) {
      addLH(textx, 20*i+25);
    }
    if (["leadhead", "LE"].includes(rowObjArr[i-1].name) && tutor) addPlaceBell(textx, 20*i+25);
    
    addRow(row, i, rowObjArr[i-1].type, row2type);
    addLine(bluePlaces, 'bluepath', i, lastClickInt);
    i++;
    
    if (rowObjArr.length == i-1) {
      if ($('#change-count').length > 0) {
        let score = Math.floor((i-1-numErrors)/(i-1)*100);
        $('.finished p:last-child').text("Final score: "+score+"%");
      }
      $('.finished').css("display", "block");
    } 
  } 
}
  
  $("#restart").click(function() {
    $("#numbers text:nth-child(n+"+(1+numBells)+")").remove();
    $("#callMarkers text").remove();
    $("#treblepath path").remove();
    $("#bluepath path").remove();
    $("#LHlines path").remove();
    $("#placebells circle").remove();
    $("#placebells text").remove();
    $('#err-count').text('Errors: 0');
    $('#change-count').text('Changes: 0');
    svg.setAttributeNS(null, "viewBox", "0 0 320 400");
    $("#bluecircle")[0].setAttributeNS(null, "cx", (bluePlaces[0]-1)*16+startx);
    $("#bluecircle")[0].setAttributeNS(null, "cy", 34);
    $(".finished").css("display", "none");
    i = 1;
    distMoved = 0;
    stopped = true;
    clickInts = [];
    lastClick = null;
    medClickInt = 2000;
    numErrors = 0;
    $("#tutorial").text(firstInstruct);
    
  });
  
  
  function addRow(row, i, type, call) {
    //console.log('adding a row');
    if (numbers) {
      for (let j = 0; j < row.length; j++) {
        addText(textx+j*16, 20*i+40, row[j], 'numbers');
      }
      TweenMax.from("#numbers text:nth-last-child(-n+"+row.length+")", 1, {opacity:0, ease: Linear.easeIn});
    }
    if (rowObjArr[i-1].instruction) {
      let text = rowObjArr[i-1].instruction;
      if (rowObjArr[i-1].with) {
        text += " with the "+rowObjArr[i-1].with;
      }
      if (rowObjArr[i-1].instruction2) text += "("+rowObjArr[i-1].instruction2+")";
      $("#tutorial").text(text);
    }
    if (i+1 < rowObjArr.length && rowObjArr[i+1].method && $("#currentmethod")) {
      
      $("#currentmethod").text(rowObjArr[i+1].method);
    }
    if (call == "b") {
      addText(textx-45, 20*i+40, "bob", "callMarkers");
    } else if (call == "s") {
      addText(textx-55, 20*i+40, "single", "callMarkers");
    }
    if (type == "b") {
      addText(textx-16, 20*i+40, "-", "callMarkers");
    } else if (type == "s") {
      addText(textx-16, 20*i+40, "s", "callMarkers");
    }
  }
  
  function addText(x, y, text, id) {
    let element = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    element.setAttributeNS(null, 'x', x);
    element.setAttributeNS(null, 'y', y);
    let textN = document.createTextNode(text);
    element.appendChild(textN);
    let section = document.getElementById(id);
    section.appendChild(element);
  }
  
  function addLH(x, y) {
    let width = numBells*16-7;
    let element = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    let d = `M ${x} ${y}
             h ${width}`;
    element.setAttributeNS(null, "d", d);
    let g = document.getElementById("LHlines");
    g.appendChild(element);
    TweenMax.from("#LHlines path:last-child", 0.8, {opacity:0, ease: Linear.easeIn});
  }
  //same x, y as addLH
  function addPlaceBell(x, y) {
    let element = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    element.setAttributeNS(null, "cx", x+numBells*16+8);
    element.setAttributeNS(null, "cy", y+9);
    element.setAttributeNS(null, "r", 8);
    element.setAttributeNS(null, "fill", "none");
    
    let e = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    e.setAttributeNS(null, 'x', x+numBells*16+8);
    e.setAttributeNS(null, 'y', y+12);
    e.setAttributeNS(null, 'stroke', "none");
    let text = places[bluePlaces[i]-1];
    let textN = document.createTextNode(text);
    e.appendChild(textN);
    
    let g = document.getElementById("placebells");
    g.appendChild(element);
    g.appendChild(e);
    TweenMax.from("#placebells circle:nth-last-child(2)", 0.8, {opacity:0, ease: Linear.easeIn});
    TweenMax.from("#placebells text:last-child", 0.8, {opacity:0, ease: Linear.easeIn});
  }
  
  
  function addLine(placeArray, name, i, lastClickInt) {
    let xChange = (placeArray[i]-placeArray[i-1])*16;
  
    let element = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    element.setAttributeNS(null, "class", "bellpath");
    let path = "M" + (startx+(placeArray[i-1]-1)*16) + "," + ((i-1)*20+34) + "l" + xChange + ",20";
    element.setAttributeNS(null, "d", path);
    if (lastClickInt && lastClickInt < 600) {
        element.setAttributeNS(null, "style", "animation: dash "+(lastClickInt-100)+"ms linear forwards");
      }
    //console.log("xChange: ", xChange);
    //let currentx = Number(document.getElementById("bluecircle").getAttributeNS(null, "cx"));
    let circleMove = document.getElementById("circlemove");
    //console.log(name, xChange);

    if (name == "bluepath") {
      let newX = (placeArray[i-1]-1)*16+startx;
      let newY = (i-1)*20+34;
      let dur;
      if (lastClickInt < 600) {
        dur = (lastClickInt-100)/1000;
      } else {
        dur = .5;
      }
      
      TweenLite.fromTo("#bluecircle", dur, {attr:{cx:newX, cy:newY}}, {attr:{cx:newX+xChange, cy:newY+20}, ease: Linear.easeNone})
    }
  
  let group = document.getElementById(name);
  group.appendChild(element);

}
  
}
  
  
});

function checkstatus() {
  return window.bluepath;
}