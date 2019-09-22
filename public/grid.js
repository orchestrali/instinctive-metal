// client-side js
// run by the browser each time your view template is loaded

// by default, you've got jQuery,
// add other scripts at the bottom of index.html



$(function() {
  //console.log('hello world :o');
  //console.log('window width', window.innerWidth);
  var stage = Number($('select#stage option:checked').val());
  let checkedClass;
  let bellgroups, everyline, huntbellw, bluebell, bluebellw;
  
  
  var bluelines = '';
  allLines(stage);
  
  
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
      //$(li).appendTo('div#everyline > ul');
      
    }
  }
  
  //when the stage changes
  $('#stage').change(function() {
    
    stage = Number($('select#stage option:checked').val());
    
    //remove blueBell options and add a blank selected option
    $('select#blueBell').children().detach();
    //console.log($('div#basic-lines input').prop("disabled"));
    $('<option></option>').prop({selected: true, disabled: true}).appendTo('select#blueBell');
    bluebell = null;

    //if the basic lines aren't disabled, add options to the blueBell dropdown
    if (!$('div#basic-lines input').prop("disabled")) {
      blueBellOpts(stage);
    }
    
    //build options to draw every line
    bluelines = '';
    allLines(stage);
    everyline = null;
    if ($("div#everyline").css("display") == "block") {
      $('div#everyline > ul').children().remove();
      $('div#everyline > ul').append(bluelines);
    }
    
  });
  
  function blueBellOpts(stage) {
    for (var i = 1; i <= stage; ++i) {
      $('<option></option').text(i).val(i).appendTo('select#blueBell');
    }
  }
  
  
  //when class changes
  $('#class').change(function() {
    stage = $('select#stage option:checked').val();
    checkedClass = $('select#class option:checked').val();
    
    //if class is principle/differential hide the option to draw hunt-bell line(s)
    if (checkedClass == 'Principle' || checkedClass == 'Differential') {
      $('p#hunt-bells').slideUp(400);
      $('p#hunt-bells input').prop("disabled", true);
    } else {
      $('p#hunt-bells').slideDown(400);
      $('p#hunt-bells input').prop("disabled", false);
    }
     
  });
  
  $('#quantity').change(function() {
   //console.log('clicked');
   if ($('#touch').is(':checked')) {
     $("#show-pn").prop("disabled", true);
   } else {
     $("#show-pn").prop("disabled", false);
   }
    
  });
  

  
  //set lines for bell groups
  $('button#line-groups').click(function() {
    //console.log($(this).attr("id"));
    
    if (bellgroups) {
      console.log("bellgroups exists");
      $('div#bellgroups > ul').append(bellgroups);
      if ($('div#bellgroups li select:first-of-type option:checked').val() != "none") {
        $('div#bellgroups input').prop("disabled", false);
      }
    } else {
      let options = `<option value="all">All bells</option>
                   <option value="hunt" >Hunt bells</option>
                   <option value="work" >Working bells</option>
                   <option value="none" >No bells</option>`;
      let wOptions = `<option value="1" >thin</option>
                  <option value="2">thick</option>`
      $('div#bellgroups input').prop("disabled", false);
      $('select#blueGroup1').append(options);
      $('select#blueGroup1 option:nth-child(2)').prop("selected", true);
      $('select#blueGroup1w').append(wOptions);
      $('select#blueGroup1w option:nth-child(1)').prop("selected", true);
      $('input#blueGroup1c').prop("value", "red");
      $('select#blueGroup2').append(options);
      $('select#blueGroup2 option:nth-child(3)').prop("selected", true);
      $('select#blueGroup2w').append(wOptions);
      $('select#blueGroup2w option:nth-child(2)').prop("selected", true);
      $('input#blueGroup2c').prop("value", "blue");
      
    }
    
    //$('div#basic-lines select').children($('option')).detach();
    detachBasic();
    $('div#basic-lines input').prop("disabled", true);
    $('div#bellgroups').slideDown(600, function() {

      $('div#basic-lines').slideUp(400);
    });

  });
  

  //set lines for every bell
  $('button#every-line').click(function() {
    
    detachBasic();
    $('div#basic-lines input').prop("disabled", true);
    if (everyline) {
      $('div#everyline > ul').append(everyline);
    } else {
      $('div#everyline > ul').append(bluelines);
    }
    $('div#everyline').slideDown(600, function() {
      $('div#basic-lines').slideUp(400);
    });
    //console.log($('#everyline select.weight'));

  });
  
  function detachBasic() {
    huntbellw = $('div#basic-lines select#huntBellw').children($('option')).detach();
    bluebellw = $('div#basic-lines select#blueBellw').children($('option')).detach();
    bluebell = $('div#basic-lines select#blueBell').children($('option')).detach();
  }
  
  
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
    console.log($(this).attr("id"));

    //detach the advanced options
    if ($(this).attr("id") == "from-groups") {
      console.log('toggling from bellgroups');
      bellgroups = toggleBlueInput("bellgroups");
    } else if ($(this).attr("id") == "from-all") {
      everyline = toggleBlueInput("everyline");
    }

    if (huntbellw) $('select#huntBellw').append(huntbellw);
    else $('select#huntBellw').append(`<option value="0">none</option>
                <option value="1" selected>thin</option>
                <option value="2">thick</option>`);
    if (checkedClass != "Principle" && checkedClass != "Differential" && $('#huntBellw option:checked').val() != "0") $('div#basic-lines input#huntColor').prop("disabled", false);
    $('input#blueBellc').prop("disabled", false);
    if (bluebell) $('select#blueBell').append(bluebell);
    else blueBellOpts(stage);
    if (bluebellw) $('select#blueBellw').append(bluebellw);
    else $('select#blueBellw').append(`<option value="1" >thin</option>
                <option value="2" selected>thick</option>`);

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
      console.log(other);
      //if the selection is none, disable color input
      if ($(this).val() == 'none') {

        $('input#' + id + 'c').prop({disabled: true, value: ''});
      } else {
        $('input#' + id + 'c').prop("disabled", false);
      }
    }

    //if the selection is hunt or work AND one option has been detached, reattach it
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
    console.log('list items to detach: ', $('div#' + hide).find('li').length);

    //$('div#' + hide + ' input').prop("disabled", true);
    return $('div#' + hide + ' li').detach();
  }
  
  /*
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
    );
    $('div.grid:nth-child(-n+'+b+')').addClass("paged");
  }
  */
});

