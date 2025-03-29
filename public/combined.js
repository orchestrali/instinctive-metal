const keys = ['complibid', 'stage', 'placeNotation', 'methodClass', 'methodName', 'callType', 'bobPlaceNot', 'singlePlaceNot', 'callLoc', 'leadhead', 'otherLeadhead', 'quantity', 'comp', 'touchType', 'type', 'numbers', 'pn', 'huntBellw', 'huntColor', 'blueBell', 'blueBellw', 'blueBellc', 'pagination', 'blueGroup1', 'blueGroup1w', 'blueGroup1c', 'blueGroup2w', 'blueGroup2c', 'blueGroup2', 'huntbells', 'windowWidth', 'gap', 'includeTime', 'timesig', 'keysig', 'actTenor', 'rowzero', 'mobile', 'keepscore', 'drawLH', 'tutorial', 'stenors', 'gtenors', 'player', 'sounds', 'numrounds', 'hours', 'minutes', 'describe'];
const selects = ['stage', 'methodClass', 'huntBellw', 'blueBell', 'blueBellw', 'blueGroup1', 'blueGroup1w', 'blueGroup2w', 'blueGroup2', 'keysig', 'actTenor'];
const texts = ['placeNotation', 'methodName', 'bobPlaceNot', 'singlePlaceNot', 'callLoc', 'otherLeadhead', 'comp', 'huntColor', 'blueBellc', 'blueGroup1c', 'blueGroup2c', 'stenors', 'gtenors', 'numrounds', 'btenors', 'mtenors', 'hours', 'minutes', 'complibid'];
const radios = ['callType', 'leadhead', 'quantity', 'touchType', 'type', 'timesig', 'sounds'];
const checked = ['numbers', 'pn', 'pagination', 'huntbells', 'gap', 'includeTime', 'rowzero', 'mobile', 'keepscore', 'drawLH', 'tutorial', 'player', 'describe', 'highlight', 'onlyblue'];
for (let i = 1; i < 17; i++) {
  keys.push('bell'+i+'w', 'bell'+i+'c');
  texts.push('bell'+i+'c');
  selects.push('bell'+i+'w');
}

var type = "grid";
let gridtype = "basic-lines";
var stage, checkedClass;
var stages = window.stages;
let bellgroups, everyline, huntbellw, bluebell, bluebellw;
let bluelines = '';
let mode = "methods";
var methodNameList;
let methodList;

// new client-side file for combined form (except surprise minor game)

$(function() {
  console.log('hello world :o');
  
  
  //location.hash = 'svgs';
  if ($(".anchor").length) {
    window.location.hash = 'svgs';
  }
  
  $("div.type:nth-of-type(n+2)").find(":input").prop("disabled", true);
  
  $("div.gridopt:nth-of-type(n+2)").find(":input").prop("disabled", true);
  $("#highlight").css("height", "19px");
  
  
  
  
  
  
  
  
  let q = new window.URLSearchParams(window.location.search);
  let obj = {};
  let params = 0;
  for (let p of q) {
    if (p[0] === "tenors") {
      params++;
      ["gtenors","stenors","btenors","mtenors"].forEach(w => {
        obj[w] = p[1];
      });
    }
    if (keys.includes(p[0])) {
      params++;
      obj[p[0]] = p[1];
    }
  }
  //console.log(obj);
  getNames(obj, params);
  
  
  
  
  if (obj.stage) {
    stage = Number(obj.stage);
  }
  
  
  checkedClass = $('select#methodClass option:checked').val();
  
  //when the stage changes
  $('#stage').change(function() {
    
    stage = Number($('select#stage option:checked').val());
    //console.log("stage: ", stage);
    checkedClass = "";
    
    //remove methods from name dropdown
    $('ul#methodList').children().detach();
    $("#methodName").val("");

    //if a non-empty class is selected, make sure the methodName placeholder is blank (is this possible?)
    if ($("select#methodClass option:checked").text() != "") {
      $("#methodName").prop("placeholder", "");
    }
    
    //if the placeholder and class are blank, set the placeholder
    if ($("#methodName").prop("placeholder") == "" && $("select#methodClass option:checked").text() == "") {
      $("#methodName").prop("placeholder", "Select a stage and class to search methods");
    }
    
    //now getting classes immediately from stages file
    let classes = stages.find(o => o.num == stage).classes;
    
    $('select#methodClass').children().detach();
    $('<option></option>').prop({disabled: true, selected: true}).appendTo('select#methodClass');
    $('<option></option').text("Plain").val("Plain").appendTo("select#methodClass");
    for (var i = 0; i < classes.length; ++i) {
      let text;
      if (["Bob", "Place"].includes(classes[i])) {
        text = "- " + classes[i];
      } else {
        text = classes[i];
      }
      //console.log(classes[i]);
      $('<option></option>').text(text).val(classes[i]).appendTo('select#methodClass');
    }
    
    //remove blueBell options and add a blank selected option
    $('select.blueBell').children().detach();
    $('<option></option>').prop({selected: true}).appendTo('select.blueBell');
    bluebell = null;
    
    blueBellOpts(stage);
    toggleHunts();
    
    //build options to draw every line
    bluelines = '';
    allLines(stage);
    $('div#everyline > ul').children().remove();
    $('div#everyline > ul').append(bluelines);
    
    if (type !== "grid" || gridtype !== "everyline") {
      $("div#everyline").find(":input").prop("disabled", true);
    }
    
    let numBells = Number($('input#stenors').val()) + stage;
    let keysig = $('select#keysig option:checked').val();
    
    adjustTime(numBells);
    tenOpts(keysig, numBells);
    if (type === "grid") {
      $("#highlight").css("width", numBells*16);
    }
    
  });
  
  
  
  $("button#switch").on("click", function() {
    mode = mode === "methods" ? "complib" : "methods";
    let stagespan = $("#stagespan").detach();
    if (mode === "complib") {
      $(this).text("Click to search for a method title or enter place notation");
      $("#method-info,#quantity,#call-info").hide();
      $("#method-info,#quantity,#call-info").find(":input").prop("disabled", true);
      $("#complib div.input:nth-child(2)").append(stagespan);
      $("#complibid").prop("disabled", false);
      $("#complib").show();
    } else {
      $(this).text("Click to enter a complib.org composition ID instead");
      $("#complibid").prop("disabled", true);
      $("#complib").hide();
      $("#method-info,#quantity").find(":input").prop("disabled", false);
      $("#method-info div.input:first-of-type").prepend(stagespan);
      $("#method-info,#quantity").show();
    }
  });
  
  if (obj.complibid) {
    $("button#switch").click();
  }
  
  
  $("#submit").on("click", function() {
    $(".results").remove();
    let form = document.getElementById("formform");
    let data = new FormData(form);
    let query = [];
    
    for (let key of data.entries()) {
      query.push(encodeURIComponent(key[0]) +"="+ encodeURIComponent(key[1]).replace(/%20/g, "+"));
      
    }
    
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/raw?'+query.join("&"), true);
    xhr.send();
    
    xhr.onload = function () {
      let results = JSON.parse(xhr.responseText);
      
      if (results.errors) {
        $(".errors").html(results.errors);
      } else {
        if (results.script) {
          console.log("new script");
          $("head").append(results.script);
        }
        $("main").append(results.html);
        window.location.hash = 'svgs';
        if (history) {
          history.pushState('', '', "/?"+query.join("&")+window.location.hash);
        }
      }
    }
    
  });
  
  
  //nav toggle
  $("#nav-options").click(function() {
    $("#nav-options ul").slideToggle(600, "swing");
    $(".arrow").toggleClass("rotate");
    
  });
  
  
  if (stage && checkedClass) {
    methodList = methodNames(stage, checkedClass);
  }
  
  //don't submit form if enter is pressed in an input
  $("form input").on("keyup keypress", function(event) {
    if (event.which == 13) {
      //console.log('enter press');
      event.preventDefault();
      return false;
    }
  });
  $("form input").on("keyup", function (event) {
    //$("form").change();
  });
  
  
  
  
  
  //when class changes
  $('#methodClass').change(function() {
    stage = Number($('select#stage option:checked').val());
    checkedClass = $('select#methodClass option:checked').val();
    
    //remove methods from dropdown
    $('ul#methodList').children().detach();
    
    //if there's a stage make the search placeholder blank
    if (stage) {
      $("#methodName").prop("placeholder", "");
      methodList = methodNames(stage, checkedClass);
    }
    
    $("#methodName").val("");
    toggleHunts();
    
  });
  
  //when methodName is clicked
  $("#methodName").click(function() {
    //body click causes methodList to be hidden
    $(document.body).on('click.menuHide', function(){
        var $body = $(this);
        $("#methodList li").hide();
        
        $body.off('click.menuHide');
      
    });
    //check if stage and class are selected and display warning if either isn't
    let stage = $('select#stage option:checked').val();
    let checkedClass = $('select#methodClass option:checked').val();
    if (stage == "" || checkedClass == "") {
      if ($('li#warning').length == 0) {
        searchWarning();
      } else if ($('li#warning').length == 1) {
        $('li#warning').css("display", "list-item");
      }
    }
    
  });
  
  //when a method in the dropdown list is clicked on, make it the methodName value and hide the list
  $("#methodList").on("click", "li", function(e) {
    //console.log('method clicked 1');
    $("#methodName").val($(this).text());
    $("#methodList li").hide();
    e.stopPropagation();
    //$("form").change();
  });
  
  //don't trigger the body click for a methodName click
  $("#methodName").on("click", function(e) {
    e.stopPropagation();
    
    $("#methodList li").css("display", "list-item");
  });
  
  //when typing in the methodName field
  $("#methodName").on("keyup", function(event) {
    
    //body click causes methodList to be hidden
    $(document.body).on('click.menuHide', function(){
        //console.log('body click');
        var $body = $(this);
        $("#methodList li").hide();

        $body.off('click.menuHide');
    });
    
    stage = Number($('select#stage option:checked').val());
    checkedClass = $('select#methodClass option:checked').val();
    
    // /[^\w\s]/.test(name)
    
    
    //value = whatever's been typed
    let value = $(this).val().toLowerCase();
    let altval = checkname(value);
    //console.log(altval);
    //warn people to pick stage and class if they haven't
    if (stage == "" || checkedClass == "") {
      if ($('li#warning').length == 0) {
        searchWarning();
      } else if ($('li#warning').length == 1) {
        $('li#warning').css("display", "list-item");
      }
    } else if (/^[^\s]/.test(value)) {
      
      let stageName = getStageName(stage);
      
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
          if (text.toLowerCase().indexOf(value) > -1 || checkname(text.toLowerCase()).indexOf(altval) > -1) {
            numMatch++;
          }
        }
      } else {
        //if there are ≥16 methods, make an array of those that match search
        for (var j = 0; j < numArrays; ++j) {
          for (var k = 0; k < methodList[j].length; ++k) {
            let method = methodList[j][k].substring(0,methodList[j][k].length-1-stageName.length);
            if (method.toLowerCase().indexOf(value) > -1 || checkname(method.toLowerCase()).indexOf(altval) > -1) {
              methods.push(method);
              numMatch++;
            }
          }
        }
      }
      
      
      
      
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
            let text = $("#methodList li:nth-child("+ i + ")").text().toLowerCase();
            if (text.indexOf(value) > -1 || checkname(text).indexOf(altval) > -1) {
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
      
      
    } else { // methodName value starts with whitespace char
      $("#methodList li").remove(); 
    }
    
  });
  //end of method search function
  
  $('#quantity').change(function() {
   //console.log('clicked');
    if ($('#touch').is(':checked')) {
      //console.log('touch chosen');
      $('#touchComp').prop({disabled: false, required: true, placeholder: 'required'});
      $('div#call-info').slideDown(1000, "swing");
      $('li#compinfo').slideDown(1000, "swing");
      if (type === "grid") $("#show-pn").prop("disabled", true);

    } else {
      $('#touchComp').prop({required: false, disabled: true});
      $('div#call-info').slideUp(1000, "swing");
      $('li#compinfo').slideUp(1000, "swing");
      
      if (type === "grid") $("#show-pn").prop("disabled", false);
    }
    

  });
  
  $('#call-info').change(function() {
    if ($('#cust').is(':checked')) {
      $('.bob').prop("disabled", false);
      $('.single').prop("disabled", false);
    } else {
      $('.bob').prop("disabled", true);
      $('.single').prop("disabled", true);
    }
  });
  
  
  $('.bob, .single').click(function() {
    //console.log("clicked");
    $('fieldset#calls li input:checked').prop("checked", false);
    $('#cust').prop("checked", true);
    $('.bob').prop("disabled", false);
    $('.single').prop("disabled", false);
  });
  
  // ******* end of common form elements! ******* //
  
  
  
  
  
  $("#type").change(function() {
    type = $("#type input:checked").attr("id");
    //console.log(type);
    
    
    $("#type li").removeClass("selected");
    $("#type input:checked").parent("li").addClass("selected");
    
    // disable/enable form inputs
    $("div.type").find(":input").prop("disabled", true);
    $("div#"+type+"opts").find(":input").prop("disabled", false);
    if (type === "grid") {
      toggleGridTypes();
      
      if ($('#touch').is(':checked')) {
        $("#show-pn").prop("disabled", true);
      }
    }
    //toggleHunts();
    
    $(".type").addClass("hidden");
    $("div#"+type+"opts").removeClass("hidden");
    $("#highlight").css("height", type === "grid" ? "19px" : type === "graph" ? "174px" : "106px");
    if (type === "graph") {
      $("#highlight").css("width", "270px");
    } else if (type === "staff") {
      $("#highlight").css("width", "24px");
    }
    
    $("#stage option:nth-child(n+11)").prop("disabled", ["graph", "simulator"].includes(type));
    if (["practice", "simulator"].includes(type)) {
      $("#playeropts").hide();
    } else if ($("#player-"+type).is(":checked")) {
      $("#playeropts").slideDown(600);
    }
    
  });
  
  $('input[name="player"]').on("change", function() {
    if ($(this).is(":checked")) {
      $("#playeropts").slideDown(600);
    } else {
      $("#playeropts").slideUp(400);
    }
  });
  
  // **** GRID **** //
  
  //set lines for bell groups
  $('button#line-groups').click(function() {
    //console.log($(this).attr("id"));
    gridtype = "bellgroups";
    toggleGridTypes();
    $('div#bellgroups').slideDown(600, function() {
      $('div#basic-lines').slideUp(400);
    });

  });
  
  //set lines for every bell
  $('button#every-line').click(function() {
    gridtype = "everyline";
    toggleGridTypes();
    $('div#everyline').slideDown(600, function() {
      $('div#basic-lines').slideUp(400);
    });
    
    
  });
  
  
  $('#everyline, #basic-lines').on("change", "select.weight", function() {
    //console.log("change line weight");
    if ($(this).children('option:checked').val() == "0") {
      //console.log("no line selected");
      $(this).parent().next().children("input").prop("disabled", true);
    } else {
      $(this).parent().next().children("input").prop("disabled", false);
    }
  });
  
  
  //return to basic line options
  $('button.return-basic').click(function() {
    //console.log($(this).attr("id"));
    gridtype = "basic-lines";
    toggleGridTypes();
    $('div#basic-lines').slideDown(600, function() {
      $('div#everyline').slideUp(400);
      $('div#bellgroups').slideUp(400);
    });
    
  });
  
  let other;
    //when bluegroup selection changes
  $('#blueGroup1, #blueGroup2').change(function() {

    let id = $(this).attr("id");
    let otherID;
    if (id == "blueGroup1") {
      otherID = "group2";
    } else if (id == "blueGroup2") {
      otherID = "group1";
    }

    //if the selection is all or none, remove the other group
    if ($(this).val() == 'all' || $(this).val() == 'none') {
      if (!other) {
        other = $("#" + otherID).detach();
      }

      $("#" + otherID).detach();
      //console.log(other);
      //if the selection is none, disable color input
      if ($(this).val() == 'none') {

        $('input#' + id + 'c').prop({disabled: true, value: ''});
      } else {
        $('input#' + id + 'c').prop("disabled", false);
      }
    }

    //if the selection is hunt or work AND one option has been detached, reattach it
    if (($(this).val() == 'hunt' || $(this).val() == 'work') && other) {
      //console.log('yes');
      //console.log(other);
      let id = $(this).attr("id");
      //console.log($('#' + other));
      other.appendTo($('div#bellgroups ul'));
      other = null;
      $('input#' + id + 'c').prop("disabled", false);
    }

  });
  
  
  // **** STAFF **** //
  
  $('#time-sig').change(function() {
    if (!$('#time-sig').is(':checked')) {
      $('div#timeOpts').slideUp(1000, "swing");
    } else if (stage > 0) {
      let numBells = Number($('input#stenors').val()) + stage;
      adjustTime(numBells);
      //$('div#timeOpts').slideDown(1000, "swing");
    }
    
  });
  
  $('#handstroke-gap').change(function() {
    stage = Number($('select#stage option:checked').val());
    let numBells = Number($('input#stenors').val()) + stage;
    
    adjustTime(numBells);
    
  });
  
  $('#stenors').change(function() {
    stage = Number($('select#stage option:checked').val());
    let numBells = Number($('input#stenors').val()) + stage;
    let keysig = $('select#keysig option:checked').val();
    
    adjustTime(numBells);
    tenOpts(keysig, numBells);
  });
  
  $('#keysig').change(function() {
    stage = Number($('select#stage option:checked').val());
    let numBells = Number($('input#stenors').val()) + stage;
    let keysig = $('select#keysig option:checked').val();
    
    if (stage > 0) {
      tenOpts(keysig, numBells);
    }
    
  });
  
  
  
  
  
  
  
  let gridWidth = (stage + (stage % 2))*16;
  //console.log('stage: ', stage);
  //console.log('gridWidth: ', gridWidth);
  //console.log('window width: ', $(window).width());
  //number of columns per viewport
  let numSVGs = Math.floor(($( window ).width() - 76)/(gridWidth + 38));
  //console.log('numSVGs: ', numSVGs);
  let gridHeight = $('svg.grid').attr("height");
  
  $('div.grid').css("height", gridHeight);
  
  //number of columns per letter size page
  let printNumSVGs = Math.floor(670/(gridWidth + 38));
  //console.log("printNumSVGs", printNumSVGs);
  let lastPage = $('div.grid').length % printNumSVGs;
  if (lastPage == 0) {
    lastPage = printNumSVGs;
  }
  
  
  
  
  
  
  
  

  
  
  
  
  
});


function fillform(obj, params) {
  // fill form with query params //
  
  if (obj.type && obj.type !== 'grid') {
    type = obj.type;
    $("#type").change();
  }
  if (obj.bell1w) {
    gridtype = "everyline";
    $('button#every-line').click();
  }
  if (obj.blueGroup1 || obj.blueGroup2) {
    gridtype = "bellgroups";
    $('button#line-groups').click();
  }
  
  selects.forEach(s => {
    if (obj[s]) {
      $("select[name='"+s+"'] option[value='"+ obj[s]+"']").prop("selected", true);
      $("#"+s).change();
    }
    
  });
  
  
  
  texts.forEach(t => {
    if (obj[t]) {
      $("#"+t).val(obj[t]);
    }
  });
  
  checked.forEach(c => {
    if (obj[c]) {
      //console.log(c);
      $("input[name='"+c+"']").prop("checked", true);
    } else if (params > 0) {
      $("input[name='"+c+"']").prop("checked", false);
    }
    if (params > 0) {
      $("input[name='"+c+"']").change();
    }
  });
  
  radios.forEach(r => {
    if (obj[r]) {
      $("input[value='"+obj[r]+"']").prop("checked", true);
      $("#"+r).change();
    }
  });
}


function getStageName(stage) {
  var stageName = stages.find(o => o.num == stage).name;
  //console.log("stage", stage);
  return stageName;
}

function getNames(obj, params) {
  $.get("methodNames.json", function(body) {
    methodNameList = body;
    fillform(obj, params);
  });
}

//search new json methodNames file, returns array of arrays with methods
function methodNames(stage, checkedClass) {
  
  if (checkedClass == "Plain") {
    var plainClasses = ["Bob", "Place"];
    let classMethods = [];
    for (var i = 0; i < plainClasses.length; i++) {

      let methods = methodNameList.find(o => o.stage == stage).classes.find(o => o.class == plainClasses[i]).methods;
      for (var j = 0; j < methods.length; j++) {
        classMethods.push(methods[j]);
      }
    }
    //console.log("length of classMethods", classMethods.length);
    return classMethods;
  } else {
    let classMethods = methodNameList.find(o => o.stage == stage).classes.find(o => o.class == checkedClass).methods;
  //console.log("length of classMethods", classMethods.length);
    return classMethods;
  }
  
}



function searchWarning() {
  $('<li id="warning"></li>').text("Select a stage and class to search methods").css("display", "list-item").appendTo($("#methodList"));
}

function checkname(name) {
  //'.()!-?&,£="/₃₁²™
  //éèëøůáčöåòùûàóìäúñṟāêæâîü
  let lstr = "áàäâāåčçéèëêēe̊íìïîīñóòöôōo̊øṟřšśúùüûūů";
  let letters = {
    a: "áàäâāå",
    //ae: "æ",
    c: "čç",
    e: "éèëêēe̊",
    i: "íìïîī",
    n: "ñ",
    o: "óòöôōo̊ø",
    r: "ṟř",
    s: "šś",
    u: "úùüûūů"
  };
  let alt = "";
  for (let i = 0; i < name.length; i++) {
    if (lstr.indexOf(name[i]) > -1) {
      let l = Object.keys(letters).find(c => letters[c].indexOf(name[i]) > -1);
      alt += l;
    } else {
      alt += name[i];
    }
  }
  return alt;
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
  //console.log("filtering items");
  $("#methodList li").filter(function() {
    let text = $(this).text().toLowerCase();
    let alt = checkname(text);
    let altval = checkname(value);
    $(this).toggle(text.indexOf(value) > -1 || alt.indexOf(altval) > -1);
  });
}

function removeItems(value) {
  //console.log('removing items');
  $("#methodList li").filter(function() {
    let text = $(this).text().toLowerCase();
    let alt = checkname(text);
    let altval = checkname(value);
    return (text.indexOf(value) == -1 && alt.indexOf(altval) === -1);
  }).remove();
  $("#methodList li").css("display", "list-item");
}

function allLines(stage) {
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

  }
}

function blueBellOpts(stage) {
  for (let i = 1; i <= stage; ++i) {
    $('<option></option').text(i).val(i).appendTo('select.blueBell');
  }
}

function toggleHunts() {
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

}

function detachBasic() {
  huntbellw = $('div#basic-lines select#huntBellw').children($('option')).detach();
  bluebellw = $('div#basic-lines select#blueBellw').children($('option')).detach();
  bluebell = $('div#basic-lines select#blueBell').children($('option')).detach();
}

function toggleBlueInput(hide) {
  console.log('list items to detach: ', $('div#' + hide).find('li').length);
  return $('div#' + hide + ' li').detach();
}

function toggleGridTypes() {
  $("div.gridopt").find(":input").prop("disabled", true);
  $("#"+gridtype).find(":input").prop("disabled", false);
}


function tenOpts(keysig, numBells) {
  const sharps = ['G', 'D', 'A', 'E', 'B', 'F♯'];
  const flats = ['F', 'B♭', 'E♭', 'A♭', 'D♭', 'G♭'];
  const sds = [4, 1, 5, 2, 6, 3, 7];
  let numChoices = Math.min(13 - numBells, 7);
  let numS = sharps.indexOf(keysig)+1;
  let numF = flats.indexOf(keysig)+1;

  let options = '';
  let letter = getChar(keysig, numChoices-1);
  for (var i = 0; i < numChoices; i++) {
    let selected = i == numChoices-1 ? "selected" : "";
    let sd = numChoices-i;
    let a = '';

    if (numS > 0) {
      if (sds.reverse().slice(0, numS).indexOf(sd) > -1) {
        a = '♯';
      }
      sds.reverse();
    }
    if (numF > 0 && sds.slice(0, numF).indexOf(sd) > -1) {
      a = '♭';
    }


    options += `          <option value="${letter}" ${selected}>${letter}${a}</option>
          `;
    letter = getChar(letter, -1);
  }
  if (numBells < 11) {
    options += `        <option value="${keysig[0]}P">${keysig} pentatonic</option>`;
  }

  $('select#actTenor > option').remove();

  $('select#actTenor').append(options);

}

function getChar(char, dir) {
  let current = char.charCodeAt(0);
  let next = current + dir;

  while (next < 65) {
    next += 7;
  }

  while (next > 71) {
    next -= 7;
  }

  return String.fromCharCode(next);
}

function adjustTime(stage) {
  $('div#timeOpts > fieldset > ul > li').remove();

  let gap;
  if ($('#handstroke-gap').is(':checked')) {
    gap = true;
    //console.log('include handstroke gap');
  }

  let handTS = buildTime(stage);
  let backTS = gap ? buildTime(stage+1) : [];

  if ($('#time-sig').is(':checked')) {
    $('div#timeOpts > fieldset > ul').append(timeOpts(handTS, backTS));
    $('div#timeOpts').slideDown(1000, "swing");
  }

}

function timeOpts(hand, back) {
  var length = Math.max(hand.length, back.length);
  let options = '';
  let denoms = ['4', '2', '1'];
  let ids = ['quarter', 'half', 'whole']

  for (var i = 0; i < length; i++) {
    let handT = hand[i] ? hand[i] : hand[0];
    let handB = hand[i] ? denoms[i] : '4';
    let backT, backB;
    if (back[i]) {
      backT = back[i];
      backB = denoms[i];
    } else if (back[0]) {
      backT = back[0];
      backB = '4';
    } 
    let value = handT + '-' + handB + function() {
      return backT && backB ? `-${backT}-${backB}` : '';
    }();
    let dispvalh = `${handT} <br/> ${handB}`; //needs updating
    let dispvalb = backT && backB ? `${backT} <br/> ${backB}` : '';

    options += `<li class="time">
      <label for="${ids[i]}">
        <ul class="row">
          <li>
            <input type="radio" id="${ids[i]}" name="timesig" value="${value}" />
          </li>
          <li>
            ${dispvalh}
          </li>
          <li>
            ${dispvalb}
          </li>
        </ul>
      </label>
    </li>`;
  }
  return options;
}

function buildTime(num) {
  let options = [num];
  if (num % 2 == 0) {
    options.push(num/2);
  }
  if (num % 4 == 0) {
    options.push(num/4);
  }
  return options;
}