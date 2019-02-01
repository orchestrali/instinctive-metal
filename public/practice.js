



$(function() {
  console.log("hi from the other file!");
  //console.log(window.bluepath);
  
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
  //console.log(bluePlaces[0]);
  let numbers = $("#show-nums").is(":checked") ? true : false;
  
  var i = 1;
  let stage;
  if (rowObjArr) {
    stage = rowObjArr[0].bells.length; //actually numbells
  }
  let textx = 115 - 8*(stage - 6);
  let startx = 120 - 8*(stage - 6);
  
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
  })
  
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
    
  })
  
  
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
    
    if (rowObjArr[i-1].name == "leadhead" && $("#drawLH").is(":checked")) {
      addLH(textx, 20*i+25);
    }
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
    $("#numbers text:nth-child(n+2)").remove();
    $("#callMarkers text").remove();
    $("#treblepath path").remove();
    $("#bluepath path").remove();
    $("#LHlines path").remove();
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
    
  });
  
  
  function addRow(row, i, type, call) {
    //console.log('adding a row');
    if (numbers) {
      addText(textx, 20*i+40, row.join(' '),'numbers');
      TweenMax.from("#numbers text:last-child", 1, {opacity:0, ease: Linear.easeIn});
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
    let width = stage*16-7;
    let element = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    let d = `M ${x} ${y}
             h ${width}`;
    element.setAttributeNS(null, "d", d);
    let g = document.getElementById("LHlines");
    g.appendChild(element);
    TweenMax.from("#LHlines path:last-child", 0.8, {opacity:0, ease: Linear.easeIn});
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
  
  
  
  
})