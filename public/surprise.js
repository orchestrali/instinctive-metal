var methods;
var current;
var filtered;


$(function() {
  let started = 0;
  let used = [];
  let usedMax;
  let times = [];
  let prevClick;
  let prevMethod;
  
  let count = 0;
  let Wcount = 0;
  
  $.getJSON("/sm")
    .done(function(body) {
    methods = body;
    filtered = methods;
    usedMax = Math.max(Math.floor(filtered.length/2), 9);
    })
    .fail(function( jqxhr, textStatus, error ) {
    var err = textStatus + ", " + error;
      //console.log("Text: " + jqxhr.responseText);
    console.log( "Request Failed: " + err );
    });
  
  
  $("#nav-options").click(function() {
    $("#nav-options ul").slideToggle(600, "swing");
    $("#nav-options .arrow").toggleClass("rotate");
    
  });
  
  $("#game-options").click(function() {
    $("#game-options ul").slideToggle(600, "swing");
    $("#game-options .arrow").toggleClass("rotate");
    
  });
  
  $("#game-options input").click(adjustmethods);
  
  //when there's a click on the start button
  $("#methodname").click(function() {
    //console.log(methods[0]);
    if (started == 0) {
      started = 1;
      $("#methodname:hover").css("cursor", "auto");
      prevClick = Date.now();
      getMethod();
    }
  });
  
  
  
  $("div.option").click(function() {
    //console.log(this.id);
    //console.log($(this).parent().attr("id"));
    let choice = this.id;
    let cat = $(this).parent().attr("id");
    //console.log(current);
    //console.log(current[cat]);
    
    
    if (current && !$(this).hasClass("disabled")) {
      if (choice == current[cat]) {
        $(this).addClass("correct");
        count++;
        
        if (count == 3) {
          $("div.option").removeClass("correct wrong");
          let now = Date.now();
          let lastTime = now-prevClick;
          times.push(lastTime);
          let medTime = medTimes();
          //console.log(lastTime);
          if (20000 > lastTime > medTime+1500) {
            filtered.push(used.pop());
          }
          //if there is still a copy of the method in filtered AND nothing wrong this time, remove it
          let i = filtered.findIndex(e => e.name == current.name)
          if(i > -1 && Wcount == 0 && lastTime <= medTime) {
            filtered.splice(i, 1);
          }
          getMethod();
          count = 0;
          Wcount = 0;
          prevClick = now;
        }
      } else {
        $(this).addClass("wrong");
        Wcount++;
        //if they get something wrong in a method, add it back 2x to the filtered set
        if (Wcount == 1) {
          let method = used.pop();
          filtered.push(method, method);
        }
      }
      
    }
  });
  
  function adjustmethods(e) {
    e.stopPropagation();
    let id = this.id;
    if (id === "all") {
      if ($(this).prop("checked")) {
        $("#game-options input").prop("checked", true);
        $(".option").removeClass("disabled");
        filtered = methods;
      } else {
        $("#game-options input").prop("checked", false);
        $(".option").removeClass("disabled").addClass("disabled");
        filtered = [];
      }
    } else {
      filtered = [];
      $(".option").removeClass("disabled");
      methods.forEach(m => {
        if ($("#over"+m.overwork).prop("checked")) {
          filtered.push(m);
        }
      });
      $("#overwork .option").each((i,elem) => {
        if (!$("#over"+elem.id).prop("checked")) {
          $(elem).addClass("disabled");
        }
      });
      $("#underwork .option,#leadend .option").each((i,elem) => {
        if (!filtered.find(o => o.underwork === elem.id || o.leadend === elem.id)) {
          $(elem).addClass("disabled");
        }
      });
    }
    
    usedMax = Math.max(Math.floor(filtered.length/2), Math.min(9,filtered.length));
    if (current && filtered.length) {
      used = [];
      getMethod();
      count = 0;
      Wcount = 0;
      prevClick = Date.now();
    }
  }
  
  
  function names(array) {
    let methodNames = [];
    for (var i = 0; i < array.length; ++i) {
      methodNames.push(array[i].name);
    }
    return methodNames;
  }
  
  function medTimes() {
    let sortTimes = times;
    sortTimes.sort((a,b) => a-b);
    let i = Math.floor(times.length/2);
    return times[i];
  }

  
  function getMethod() {
    let array = filtered.filter(o => o.name != prevMethod);
    let i = Math.floor(Math.random() * array.length);
    current = array[i];
    $("#methodname p").text(current.name);
    prevMethod = current.name;
    
    used.push(filtered.splice(filtered.findIndex(o => o.name == current.name), 1)[0]);
    if (used.length == usedMax) {
      filtered.push(used.shift());
    }
    let usedNames = names(used);
    
    //console.log(usedNames.length);
  }
  
});