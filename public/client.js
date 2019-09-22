// client-side js
// run by the browser each time your view template is loaded

// by default, you've got jQuery,
// add other scripts at the bottom of index.html

// this file deals with the parts of the form common to all app tools (except the surprise minor game)
// also svg layout below the form

$(function() {
  console.log('hello world :o');
  //console.log('window width', window.innerWidth);
  var stage = Number($('select#stage option:checked').val());
  var stages;
  let checkedClass = $('select#class option:checked').val();
  //console.log(checkedClass ? "class selected" : "no class");
  
  
  //$('input#wWidth').prop('value', window.innerWidth);
  
  $.getJSON('/stages/', function(body) {
      //console.log(body);
      stages = body;
    }).fail(function( jqxhr, textStatus, error ) {
    var err = textStatus + ", " + error;
      //console.log("Text: " + jqxhr.responseText);
    console.log( "Request Failed: " + err );
    });
  
 
  
  function getStageName(stage) {
    var stageName = stages.find(o => o.num == stage).name;
    //console.log("stage", stage);
    return stageName;
  }
  
  let methodList;
  if (stage && checkedClass) {
    methodNames(stage, checkedClass, (mm) => {
      methodList = mm;
    });
  }
  
  
  //get old json method files
  function methods(stage, cb) {
    $.getJSON('/methods/' + stage, function(body) {
      //console.log(body);
      cb(body);
    }).fail(function( jqxhr, textStatus, error ) {
    var err = textStatus + ", " + error;
      //console.log("Text: " + jqxhr.responseText);
    console.log( "Request Failed: " + err );
    });
  }

  
  //nav toggle
  $("#nav-options").click(function() {
    $("#nav-options ul").slideToggle(600, "swing");
    $(".arrow").toggleClass("rotate");
    
  });
  
  //search new json methodNames file, returns array of arrays with methods
  function methodNames(stage, checkedClass, cb) {
    $.getJSON('/methodnames/', function(body) {
      if (checkedClass == "Plain") {
        var plainClasses = ["Bob", "Place", "Slow Course"]
        let classMethods = [];
        for (var i = 0; i < plainClasses.length; i++) {
          
          let methods = body.find(o => o.stage == stage).classes.find(o => o.class == plainClasses[i]).methods;
          for (var j = 0; j < methods.length; j++) {
            classMethods.push(methods[j]);
          }
        }
        //console.log("length of classMethods", classMethods.length);
        cb(classMethods);
      } else {
        let classMethods = body.find(o => o.stage == stage).classes.find(o => o.class == checkedClass).methods;
      //console.log("length of classMethods", classMethods.length);
      cb(classMethods);
      }
    }).fail(function( jqxhr, textStatus, error ) {
      var err = textStatus + ", " + error;
      //console.log("Text: " + jqxhr.responseText);
    console.log( "Request Failed: " + err );
    });
  }
  
  //get array of classes from new methodnames file
  //this is no longer used
  function methodClasses(stage, cb) {
    $.getJSON('/methodnames/', function(body) {
      let classArray = body.find(o => o.stage == stage).classes;
      let classes = [];
      for (var i = 0; i < classArray.length; i++) {
        if (classArray[i].methods.length > 0) {
          classes.push(classArray[i].class);
        }
      }
      //console.log(classes);
      cb(classes);
      
      }).fail(function( jqxhr, textStatus, error ) {
      var err = textStatus + ", " + error;
      //console.log("Text: " + jqxhr.responseText);
    console.log( "Request Failed: " + err );
    });
  }
  
 //location.hash = 'svgs';
  if ($(".anchor").length) {
    window.location.hash = 'svgs';
  }
  var bluelines = '';
  
  
  function recalcBlue(stage) {
    for (var i = 1; i <= stage; ++i) {
      var li = '<li><span><label for="bell' + i + 'w" >Line for bell ' + i + ': </label><select class="weight" id="bell' + i + 'w" name="bell' + i + `w">
              <option class="weight" value="0">none</option>
              <option class="weight" value="1">thin</option>
              <option class="weight" value="2" selected>thick</option>`
      + `</select></span>
          <span><label for="bell` + i + `c">
              color:
            </label>
            <input class="color" type="text" id="bell` + i + `c" name="bell` + i + `c" /></span></li>`;
      
      bluelines += li;
      //$(li).appendTo('div#everyline > ul');
      
    }
  }
  
  const keys = ['stage', 'placeNotation', 'methodClass', 'methodName', 'callType', 'bobPlaceNot', 'singlePlaceNot', 'callLoc', 'leadhead', 'otherLeadhead', 'quantity', 'comp', 'touchType'];
  
  
  $('form').change(function() {
    console.log("form change");
    let form = document.forms[0];
    let data = new FormData(form);
    let query = {};
    for (let k of data) {
      if (keys.includes(k[0]) && k[1] != "") {
        query[k[0]] = k[1];
      }
    }
    let str = "?switch=true&";
    for (let key in query) {
      str += encodeURIComponent(key) + "=" + encodeURIComponent(query[key]).replace(/%20/g, "+") + "&";
    }
    console.log(query);
    
    const links = ["switchG", "switchBL", "switchS", "switchP"];
    $('#nav-options ul li').each(function (i) {
      $(this).children("a").attr("href", (j, val) => {
        if (!val.includes("surpriseminor")) {
          if (val.includes("?")) {
            return val.slice(0, val.indexOf("?")) + str.slice(0,-1);
          } else {
            return val + str;
          }
        }
      });
    });
  });
  
  
  
  //when the stage changes
  $('#stage').change(function() {
    
    stage = Number($('select#stage option:checked').val());
    console.log("stage: ", stage);
    
    //remove methods from name dropdown
    $('ul#methodList').children().detach();
    $("#methodName").val("");

    //if a non-empty class is selected, make sure the methodName placeholder is blank (is this possible?)
    if ($("select#class option:checked").text() != "") {
      $("#methodName").prop("placeholder", "");
    }
    
    //if the placeholder and class are blank, set the placeholder
    if ($("#methodName").prop("placeholder") == "" && $("select#class option:checked").text() == "") {
      $("#methodName").prop("placeholder", "Select a stage and class to search methods");
    }
    
    //new function to build classes
    //now getting classes immediately from stages file
    let classes = stages.find(o => o.num == stage).classes;
    
      $('select#class').children().detach();
    $('<option></option>').prop({disabled: true, selected: true}).appendTo('select#class');
      $('<option></option').text("Plain").val("Plain").appendTo("select#class");
    for (var i = 0; i < classes.length; ++i) {
      let text;
      if (classes[i] == "Bob" || classes[i] == "Place" || classes[i] == "Slow Course") {
        text = "- " + classes[i];
      } else {
        text = classes[i];
      }
      //console.log(classes[i]);
      $('<option></option>').text(text).val(classes[i]).appendTo('select#class');
    }
    
  })
  
  
  //when class changes
  $('#class').change(function() {
    stage = Number($('select#stage option:checked').val());
    checkedClass = $('select#class option:checked').val();
    
    //remove methods from dropdown
    $('ul#methodList').children().detach();
    
    //if there's a stage make the search placeholder blank
    if (stage) {
      $("#methodName").prop("placeholder", "");
      methodNames(stage, checkedClass, (mm) => {
        methodList = mm;
      });
    }
    
    $("#methodName").val("");
    
    if (["Principle", "Differential"].includes(checkedClass)) {
      $("input.hunts").val("");
      $("select.hunts > option:first-child").prop("selected", true);
      $("input.hunts").prop({disabled: true, checked: false});
      $("select.hunts").prop("disabled", true);
      $("div.hunts").addClass("disabled");
      $("span.hunts").addClass("disabled");
    } else {
      $("input.hunts").prop("disabled", false);
      $("select.hunts").prop("disabled", false);
      $("div.hunts").removeClass("disabled");
      $("span.hunts").removeClass("disabled");
    }
    
  });
  
  
  //don't submit form if enter is pressed in an input
  $("form input").on("keyup keypress", function(event) {
    if (event.which == 13) {
      //console.log('enter press');
      event.preventDefault();
      return false;
    }
  });
  $("form input").on("keyup", function (event) {
    $("form").change();
  });
  
  
  //when methodName is clicked
  $("#methodName").click(function() {
    //body click causes methodList to be hidden
    $(document.body).on('click.menuHide', function(){
        var $body = $(this);
        $("#methodList li").hide();
        //checkName();
        $body.off('click.menuHide');
      
    });
    //check if stage and class are selected and display warning if either isn't
    let stage = $('select#stage option:checked').val();
    let checkedClass = $('select#class option:checked').val();
    if (stage == "" || checkedClass == "") {
      if ($('li#warning').length == 0) {
        searchWarning();
      } else if ($('li#warning').length == 1) {
        $('li#warning').css("display", "list-item");
      }
    }
    //checkName();
  });
  
  function check(val) {
      let names = [];
      let list = $("#methodList li");
      for (var i = 1; i <= list.length; i++) {
        names.push($("#methodList li:nth-child("+i+")").text());
      }
      if (names.some(e => e == val) && val.length > 0) return true;
      else return false;
    }
  
  
  function checkName() {
    //console.log("method list li", $("#methodList li").text());
    console.log("checking value", check($("#methodName").val()));
    if ($("#noMethods").length == 0 && $('li#warning').length == 0 && check($("#methodName").val())) {
      console.log("valid method");
      $("#validName").prop("checked", true);
    } else {
      $("#validName").prop("checked", false);
    }
    
  }
  
  function searchWarning() {
      $('<li id="warning"></li>').text("Select a stage and class to search methods").css("display", "list-item").appendTo($("#methodList"));
    
  }
  
  //when a method in the dropdown list is clicked on, make it the methodName value and hide the list
  $("#methodList").on("click", "li", function(e) {
    console.log('method clicked 1');
    $("#methodName").val($(this).text());
    $("#methodList li").hide();
    e.stopPropagation();
    $("form").change();
  });
  
  //don't trigger the body click for a methodName click
  $("#methodName").on("click", function(e) {
    e.stopPropagation();
    
    $("#methodList li").css("display", "list-item");
  });
  
  
  
  
  //when typing in the methodName field
  $("#methodName").on("keyup", function(event) {
    //checkName();
    //body click causes methodList to be hidden
    $(document.body).on('click.menuHide', function(){
        //console.log('body click');
        var $body = $(this);
        $("#methodList li").hide();

        $body.off('click.menuHide');
    });
    
    let stage = Number($('select#stage option:checked').val());
    let checkedClass = $('select#class option:checked').val();
    //value = whatever's been typed
    var value = $(this).val().toLowerCase();
    //warn people to pick stage and class if they haven't
    if (stage == "" || checkedClass == "") {
      if ($('li#warning').length == 0) {
        searchWarning();
      } else if ($('li#warning').length == 1) {
        $('li#warning').css("display", "list-item");
      }
    } else if (/['"\(\)\-™\.,/?!₁₃²£=ṟèéêáóíúûůåñöøäë&ča-zA-Z0-9]+/.test(value) || /['"\(\)\-™\.,/?!₁₃²£=ṟèéêáóíúûůåñöøäë&ča-zA-Z0-9]+['"\(\)\-™\.,/?!₁₃²£=ṟèéêáóíúûůåñöøäë&ča-zA-Z0-9\s]+/.test(value)) {
      let stageName = getStageName(stage);
      
      
        //console.log(methodList);
        //calculate number of methods in the class
        let numArrays = methodList.length;
        let numMethods = 0;
        for (var i = 0; i < numArrays; ++i) {
          numMethods += methodList[i].length;
        }
      
        //remove the message to pick stage and class
        $("li#warning").remove();
        //remove message about unrecognized character
        $("li#badChar").remove();
        //remove message about no methods
        $("li#noMethods").remove();
        
        let methods = [];
        let numMatch = 0;
        //if there are fewer than 16 methods, add all to an array
        if (numMethods < 16) {
            for (var j = 0; j < numMethods; j++) {
              //chop off the stage name
              let text = methodList[0][j].substring(0,methodList[0][j].length-1-stageName.length);
            methods.push(text);
              if (text.toLowerCase().indexOf(value) > -1) {
                numMatch++;
              }
            }
        } else {
          //if there are ≥16 methods, make an array of those that match search
          for (var j = 0; j < numArrays; ++j) {
              for (var k = 0; k < methodList[j].length; ++k) {
                let method = methodList[j][k].substring(0,methodList[j][k].length-1-stageName.length);
                if (method.toLowerCase().indexOf(value) > -1) {
                  methods.push(method);
                  numMatch++;
                }
              }
            }
        }
        
        //console.log('methods matching search:', methods.length);
        //if no methods match, say so
        if (numMatch == 0) {
          $("#methodList li").remove();
          $('<li id="noMethods"></li>').text("no methods match search").css("display", "list-item").appendTo($("#methodList"));
        } else {
        //if some methods match search
        
        //if nothing's been added to the methodList yet
        if ($("#methodList li").length == 0) {
          
          //if there are fewer than 16 methods, just add all of them
          if (numMethods < 16) {
            buildList(methods, "none");
            //apply the filter next
            filterList(value);
          } else {
            //if there are <16 methods that match, display them all
            if (methods.length < 16) {
              buildList(methods, "list-item");
            } else {
              let methodSet = [];
              let numMethods = 15;
              //if there are 16 or more methods, add 15 at random to a different array and display those
              if (methods.indexOf("Little Bob") > -1) {
                methodSet.push("Little Bob");
                methods.splice(methods.indexOf("Little Bob"), 1);
                numMethods -= 1;
              }
              methodSet = methodSet.concat(getMethods(methods, numMethods));
              buildList(methodSet, "list-item");
            }
          } 
        } else {
          //if there IS a methodList already
          //var methods will already be updated with new search, if there were ≥ 16 in class
          //check how many current items match the new search
          let currentMatch = [];
          for (var i = 1; i <= $("#methodList li").length; i++) {
            if ($("#methodList li:nth-child("+ i + ")").text().toLowerCase().indexOf(value) > -1) {
              currentMatch.push($("#methodList li:nth-child("+ i + ")").text());
            }
          }
          
          //console.log('methods that still match search:', currentMatch)
          //if fewer than 15 current methods match the new search, remove the ones that don't match and add new
          if (currentMatch.length < 15) {
            removeItems(value);
            //console.log("method array length 1", methods.length);
            //remove the current list items from the method array
            for (var i = 0; i < currentMatch.length; ++i) {
              let index = methods.indexOf(currentMatch[i]);
              //console.log("removing " + methods[index]);
              methods.splice(index, 1);
              
            }
            //console.log("method array length 2", methods.length);
            //get new methods from the pruned array
            let methodSet = getMethods(methods, 15-currentMatch.length);
            //console.log(methodSet);
            buildList(methodSet, "list-item");
            
          } else {
            $("#methodList li").css("display", "list-item");
          }

        }
        
        //build filtered methodSet
        function getMethods(methods, howMany) {
          let n = 0;
              let methodSet = [];
              do {
                let methodNum = Math.floor(Math.random() * (methods.length));
                methodSet.push(methods[methodNum]);
                methods.splice(methodNum, 1);
                n++
              } while (n < howMany && methods.length > 0)
                return methodSet;
        }
        
        //build the list items
        function buildList(methods, display) {
            for (var j = 0; j < methods.length; j++) {
            $('<li></li>').text(methods[j]).css("display", display).appendTo($("#methodList"));
              }
          }
        
        function filterList(value) {
          $("#methodList li").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
          });
        }
        
        function removeItems(value) {
          //console.log('removing items');
          $("#methodList li").filter(function() {
            return $(this).text().toLowerCase().indexOf(value) == -1
          }).remove();
          $("#methodList li").css("display", "list-item");
        }
    
    /*
     else {
      $("#methodList li").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
      });
      
    }*/
        //down arrow
    if (event.which == 40) {
      //console.log($("#methodList li.selected"));
      if ($("#methodList li.selected")[0]) {
        //console.log($("#methodList li.selected").next());
        $("#methodList li.selected").nextAll().filter(function (index) {
          return $(this).css("display") == "list-item";
        }).first().addClass("selected");
        
        $("#methodList li.selected:first").removeClass("selected"); 
      } else {
        $("#methodList li").filter(function (index) {
          return $(this).css("display") == "list-item";
        }).first().addClass("selected");
      }
      //up arrow
    } else if (event.which == 38) {
      if ($("#methodList li.selected")[0]) {
        $("#methodList li.selected").prevAll().filter(function (index) {
          return $(this).css("display") == "list-item";
        }).last().addClass("selected");
        $("#methodList li.selected:last").removeClass("selected"); 
      }
      //enter key
    } else if (event.which == 13) {
      $("#methodName").val($("li.selected").text());
      //checkName();
      $("#methodList li").hide();
    }
        }
    
    
    } else if (value == "") {
      $("#methodList li").remove();
    } else {
      $('<li id="badChar"></li>').text("unrecognized character in search").css("display", "list-item").appendTo($("#methodList"));
    }
    
    //console.log("method list li", $("#methodList li").text());
    
    
  });
  //end of method search function
  
  
  $('#quantity').change(function() {
   //console.log('clicked');
   if ($('#touch').is(':checked')) {
     //console.log('touch chosen');
     $('#touchComp').prop({disabled: false, required: true, placeholder: 'required'});
     //console.log('select#methodName.val(): ', $('select#methodName').val());

       //console.log('yes');

       $('div#call-info').slideDown(1000, "swing");
       $('li#compinfo').slideDown(1000, "swing");
       //$('#single').css("display", "inline-block");

   } else {
     $('#touchComp').prop({required: false, disabled: true});
     $('div#call-info').slideUp(1000, "swing");
     $('li#compinfo').slideUp(1000, "swing");
   }

  })
  
  $('#call-info').change(function() {
    if ($('#cust').is(':checked')) {
      $('.bob').prop("disabled", false);
      $('.single').prop("disabled", false);
    } else {
      $('.bob').prop("disabled", true);
      $('.single').prop("disabled", true);
    }
  })
  
  
  $('.bob, .single').click(function() {
    //console.log("clicked");
    $('fieldset#calls li input:checked').prop("checked", false);
    $('#cust').prop("checked", true);
    $('.bob').prop("disabled", false);
    $('.single').prop("disabled", false);
  })
  

  
let gridWidth = (stage + (stage % 2))*16;
  //console.log('stage: ', stage);
  console.log('gridWidth: ', gridWidth);
  //console.log('window width: ', $(window).width());
  //number of columns per viewport
  let numSVGs = Math.floor(($( window ).width() - 76)/(gridWidth + 38));
  //console.log('numSVGs: ', numSVGs);
  let gridHeight = $('svg.grid').attr("height");
  
  $('div.grid').css("height", gridHeight);
  
  //number of columns per letter size page
  let printNumSVGs = Math.floor(670/(gridWidth + 38));
  console.log("printNumSVGs", printNumSVGs);
  let lastPage = $('div.grid').length % printNumSVGs;
  if (lastPage == 0) {
    lastPage = printNumSVGs;
  }
  
  let b = $('div.grid').length - lastPage;
  
  //add class with a margin-top to svgs past the first page (I turned this off because it wasn't finding
 $("div.grid:nth-child(n+"+(printNumSVGs+1)+")").addClass("pageN");
  
  //console.log('margin-bottom: ', 850-gridHeight);
  if ($('div.grid').length > 1) {
    //$('div.paged').css("margin-bottom", 753-gridHeight);
    /*
    $('#printPaging').text(
      " @media print {" +
        "div.paged {" +
          "margin-bottom: "+ (817-gridHeight) + "px;" +
        "} " +
      "}"
    );*/
    $('div.grid:nth-child(-n+'+b+')').addClass("paged");
  }

});
