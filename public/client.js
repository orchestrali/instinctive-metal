// client-side js
// run by the browser each time your view template is loaded

// by default, you've got jQuery,
// add other scripts at the bottom of index.html



$(function() {
  console.log('hello world :o');
  var stage = Number($('select#stage option:checked').val());
  
 
  
  function getStageName(stage) {
    var stageName;
    //console.log("stage", stage);
    //console.log($("select#stage option:nth-child(4)").val());
    var array = $("select#stage option").filter(function() {
      return $(this).val() == stage;
    });
    var text = $("select#stage option:contains("+stage+")").text();
    //console.log(text);
    if (stage < 10) {
      stageName = text.substring(4);
    } else {
      stageName = text.substring(5);
    }
    return stageName;
  }
  
  let methodList;
  
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
  function getPlaces(cb) {
    $.getJSON('/bellpaths', function(body) {
      
      cb(body);
    }).fail(function( jqxhr, textStatus, error ) {
    var err = textStatus + ", " + error;
      //console.log("Text: " + jqxhr.responseText);
    console.log( "Request Failed: " + err );
    });
  }
  
  
  
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
    })
  }
  
  //get array of classes from new methodnames file
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
    })
  }
  
 //location.hash = 'svgs';
window.location.hash = 'svgs';
  var bluelines = '';
  recalcBlue();
  
  function recalcBlue() {
    for (var i = 1; i <= stage; ++i) {
      
      
      var li = '<li><label for="bell' + i + 'w" >Line for bell ' + i + ': </label><select id="bell' + i + 'w" name="bell' + i + `w">
              <option value="0">none</option>
              <option value="1">thin</option>
              <option value="2" selected>thick</option>`
      + `</select>
          <label for="bell` + i + `c">
              color:
            </label>
            <input type="text" id="bell` + i + `c" name="bell` + i + `c" /></li>`;
      
      bluelines += li;
      //$(li).appendTo('div#everyline > ul');
      
    }
  }
  
  //when the stage changes
  $('#stage').change(function() {
    
    stage = Number($('select#stage option:checked').val());
    console.log("stage: ", stage);
    $('select#methodName').children().detach();
    $('<option></option>').prop({selected: true}).appendTo('select#methodName');
    
    $('select#blueBell').children().detach();
    //console.log($('div#basic-lines input').prop("disabled"));
    $('<option></option>').prop({selected: true, disabled: true}).appendTo('select#blueBell');
    
    if ($("select#class option:checked").text() != "") {
      $("#methodName").prop("placeholder", "");
    }
    
    if ($("#methodName").prop("placeholder") == "" && $("select#class option:checked").text() == "") {
      $("#methodName").prop("placeholder", "Select a stage and class to search methods");
    }
    
    
    if (!$('div#basic-lines input').prop("disabled")) {
      for (var i = 1; i <= stage; ++i) {
      $('<option></option').text(i).val(i).appendTo('select#blueBell');
      }
    }
    
    recalcBlue();
    /*
    //old function to find & build classes
    methods(stage, (body) => {
      $('select#class').children().detach();
    $('<option></option>').prop({disabled: true, selected: true}).appendTo('select#class');
    for (var i = 0; i < body.length; ++i) {
        console.log(body[i].class);
        $('<option></option>').text(body[i].class).val(body[i].class).appendTo('select#class');
      }
    });*/
    //console.log(body);
    
    //new function to build classes
    methodClasses(stage, (classes) => {
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
    
    
    /*
    $.getJSON('/methods/' + stage, function(body) {
      methods = body;
      $('select#class').children().detach();
      $('<option></option>').prop({disabled: true, selected: true}).appendTo('select#class');
      
      //alert('data loaded: ' + body);
      for (var i = 0; i < body.length; ++i) {
        console.log(body[i].class);
        $('<option></option>').text(body[i].class).val(body[i].class).appendTo('select#class');
      }
      
    }).fail(function( jqxhr, textStatus, error ) {
    var err = textStatus + ", " + error;
      //console.log("Text: " + jqxhr.responseText);
    console.log( "Request Failed: " + err );
    });
    */
    
    
  })
  
  
  //when class changes
  $('#class').change(function() {
    stage = $('select#stage option:checked').val();
    let checkedClass = $('select#class option:checked').val();
    $('select#methodName').children().detach();
    $('<option></option>').prop({disabled: true, selected: true}).appendTo('select#methodName');
    if (stage) {
      $("#methodName").prop("placeholder", "");
    }
    /*
      methods(stage, (body) => {
        let classMethods = body.find(o => o.class == checkedClass).methods;
         for (var i = 0; i < classMethods.length; ++i) {
        $('<option></option>').text(classMethods[i].name).val(classMethods[i].name).appendTo('select#methodName');
      }
      })
      //console.log(classMethods);
      */
    
    
    
    if (checkedClass == 'Principle' || checkedClass == 'Differential') {
      $('p#hunt-bells').slideUp(400);
    } else {
      $('p#hunt-bells').slideDown(400);
    }
     
      
    });
  
  //when old methodname dropdown changes
  $('#methodName').change(function() {
    if ($('select#methodName').val() != '') {
      $('#place-notation').prop({required: false, placeholder: ''});
    }
    
  })
  
  //don't submit form if enter is pressed in an input
  $("form input").on("keyup keypress", function(event) {
    if (event.which == 13) {
      //console.log('enter press');
      event.preventDefault();
      return false;
    }
  });
  
  //when methodName is clicked
  $("#methodName").click(function() {
    //body click causes methodList to be hidden
    $(document.body).on('click.menuHide', function(){
        var $body = $(this);
        $("#methodList li").hide();

        $body.off('click.menuHide');
    });
    //check if stage and class are selected
    let stage = $('select#stage option:checked').val();
    let checkedClass = $('select#class option:checked').val();
    if (stage == "" || checkedClass == "") {
      if ($('li#warning').length == 0) {
        searchWarning();
      } else if ($('li#warning').length == 1) {
        $('li#warning').css("display", "list-item");
      }
    }
  });
  
  function searchWarning() {
      $('<li id="warning"></li>').text("Select a stage and class to search methods").css("display", "list-item").appendTo($("#methodList"));
    
  }
  
  //when a method in the dropdown list is clicked on, make it the methodName value and hide the list
  $("#methodList").on("click", "li", function(e) {
    console.log('method clicked 1');
    $("#methodName").val($(this).text());
    $("#methodList li").hide();
    e.stopPropagation();
  });
  
  //don't trigger the body click for a methodName click
  $("#methodName").on("click", function(e) {
    e.stopPropagation();
    $("#methodList li").css("display", "list-item");
  });
  
  
  
  
  //when typing in the methodName field
  $("#methodName").on("keyup", function(event) {
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
      
      methodNames(stage, checkedClass, (methodList) => {
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
        
        //if there are fewer than 16 methods, add all to an array
        if (numMethods < 16) {
            for (var j = 0; j < numMethods; j++) {
              //chop off the stage name
              let text = methodList[0][j].substring(0,methodList[0][j].length-1-stageName.length);
            methods.push(text);
              }
        } else {
          //if there are ≥16 methods, make an array of those that match search
          for (var j = 0; j < numArrays; ++j) {
              for (var k = 0; k < methodList[j].length; ++k) {
                let method = methodList[j][k].substring(0,methodList[j][k].length-1-stageName.length);
                if (method.toLowerCase().indexOf(value) > -1) {
                  methods.push(method);
                }
              }
            }
        }
        
        //console.log('methods matching search:', methods.length);
        //if no methods match, say so
        if (methods.length == 0) {
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
              //if there are 16 or more methods, add 15 at random to a different array and display those
              let methodSet = getMethods(methods, 15);
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
      $("#methodList li").hide();
    }
        }
    })
    
    } else if (value == "") {
      $("#methodList li").remove();
    } else {
      $('<li id="badChar"></li>').text("unrecognized character in search").css("display", "list-item").appendTo($("#methodList"));
    }
  });
  //end of method search function
  
  
 $('#quantity').change(function() {
   //console.log('clicked');
   if ($('#touch').is(':checked')) {
     //console.log('touch chosen');
     $('#touchNot').prop({required: true, placeholder: 'required'});
     
     
     //console.log('select#methodName.val(): ', $('select#methodName').val());
     
       //console.log('yes');
       $('.bob').prop("disabled", false);
       $('.single').prop("disabled", false);
       $('div#call-info').slideDown(1000, "swing");
       $('li#compinfo').slideDown(1000, "swing");
       //$('#single').css("display", "inline-block");
     
     
     
   } else {
     $('.bob').prop("disabled", true);
     $('.single').prop("disabled", true);
     $('#touchNot').prop("required", false);
     $('div#call-info').slideUp(1000, "swing");
     $('li#compinfo').slideUp(1000, "swing");
   }
   
 })
  
  
  $('.bob, .single').click(function() {
    //console.log("clicked");
    $('fieldset#calls input:checked').prop("checked", false);
  })
  
$('button#line-groups').click(function() {
  //console.log($(this).attr("id"));
  $('div#bellgroups input').prop("disabled", false);
  $('select#blueGroup1').append(`<option value="all">All bells</option>
                 <option value="hunt" selected>Hunt bells</option>
                 <option value="work" >Working bells</option>
                 <option value="none" >No bells</option>`);
  $('select#blueGroup1w').append(`<option value="1" selected>thin</option>
              <option value="2">thick</option>`);
  $('input#blueGroup1c').prop("value", "red");
  $('select#blueGroup2').append(`<option value="all">All bells</option>
                 <option value="hunt">Hunt bells</option>
                 <option value="work" selected>Working bells</option>
                 <option value="none" >No bells</option>`);
  $('select#blueGroup2w').append(`<option value="1">thin</option>
              <option value="2" selected>thick</option>`);
  $('input#blueGroup2c').prop("value", "blue");
  
  $('div#basic-lines select').children($('option')).detach();
  $('div#basic-lines input').prop("disabled", true);
  $('div#bellgroups').slideDown(600, function() {
    
    $('div#basic-lines').slideUp(400);
  });
  
});
  
  
$('button#every-line').click(function() {
  //console.log($(this).attr("id"));
  $('div#basic-lines select').children($('option')).detach();
  $('div#basic-lines input').prop("disabled", true);
  $('div#everyline > ul').append(bluelines);
  $('div#everyline').slideDown(600, function() {
    $('div#basic-lines').slideUp(400);
  });
  
});
  
  
$('button.return-basic').click(function() {
  console.log($(this).attr("id"));
  if ($(this).attr("id") == "from-groups") {
    console.log('toggling from bellgroups');
    toggleBlueInput("bellgroups");
  } else if ($(this).attr("id") == "from-all") {
    toggleBlueInput("everyline");
  }
  $('select#huntBellw').append(`<option value="1" selected>thin</option>
              <option value="2">thick</option>`);
  $('div#basic-lines input').prop("disabled", false);
  for (var i = 1; i <= stage; ++i) {
      $('<option></option').text(i).val(i).appendTo('select#blueBell');
  }
  $('select#blueBellw').append(`<option value="1">thin</option>
              <option value="2" selected>thick</option>`);
  
  $('div#basic-lines').slideDown(600, function() {
    $('div#everyline').slideUp(400);
    $('div#bellgroups').slideUp(400);
  });
});
  
  
let other;
$('#blueGroup1, #blueGroup2').change(function() {
  
  if ($(this).val() == 'all' || $(this).val() == 'none') {
    if (!other) {
      other = $(this).parent().siblings().detach();
    }
    
    let id = $(this).attr("id");
      //$(this).parent().siblings().attr("id");
    $(this).parent().siblings().detach();
    console.log(other);
    if ($(this).val() == 'none') {
      
      $('input#' + id + 'c').prop({disabled: true, value: ''});
    } else {
      $('input#' + id + 'c').prop("disabled", false);
    }
  }
  
  if (($(this).val() == 'hunt' || $(this).val() == 'work') && other) {
    console.log('yes');
    console.log(other);
    let id = $(this).attr("id");
    //console.log($('#' + other));
    other.appendTo($('div#bellgroups ul'));
    other = null;
    $('input#' + id + 'c').prop("disabled", false);
  }
  
});
  
  
  
function toggleBlueInput(hide) {
  console.log('options to detach: ', $('div#' + hide).find('option').length);
  $('div#' + hide + ' option').detach();
  $('div#' + hide + ' input').prop("disabled", true);
  
}
  
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
