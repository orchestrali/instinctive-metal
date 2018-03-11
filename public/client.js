// client-side js
// run by the browser each time your view template is loaded

// by default, you've got jQuery,
// add other scripts at the bottom of index.html



$(function() {
  console.log('hello world :o');
  var stage = Number($('select#stage option:checked').val());
  function methods(stage, cb) {
    $.getJSON('/methods/' + stage, function(body) {
      console.log(body);
      cb(body);
    }).fail(function( jqxhr, textStatus, error ) {
    var err = textStatus + ", " + error;
      //console.log("Text: " + jqxhr.responseText);
    console.log( "Request Failed: " + err );
    });
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
  
  $('#stage').change(function() {
    
    stage = $('select#stage option:checked').val();
    console.log("stage: ", stage);
    $('select#methodName').children().detach();
    $('<option></option>').prop({selected: true}).appendTo('select#methodName');
    
    $('select#blueBell').children().detach();
    console.log($('div#basic-lines input').prop("disabled"));
    $('<option></option>').prop({selected: true, disabled: true}).appendTo('select#blueBell');
    
    
    if (!$('div#basic-lines input').prop("disabled")) {
      for (var i = 1; i <= stage; ++i) {
      $('<option></option').text(i).val(i).appendTo('select#blueBell');
      }
    }
    
    recalcBlue();
    
    methods(stage, (body) => {
      $('select#class').children().detach();
    $('<option></option>').prop({disabled: true, selected: true}).appendTo('select#class');
    for (var i = 0; i < body.length; ++i) {
        console.log(body[i].class);
        $('<option></option>').text(body[i].class).val(body[i].class).appendTo('select#class');
      }
    });
    //console.log(body);
    
    
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
  
  $('#class').change(function() {
    stage = $('select#stage option:checked').val();
    let checkedClass = $('select#class option:checked').val();
    $('select#methodName').children().detach();
    $('<option></option>').prop({disabled: true, selected: true}).appendTo('select#methodName');
    
      methods(stage, (body) => {
        let classMethods = body.find(o => o.class == checkedClass).methods;
         for (var i = 0; i < classMethods.length; ++i) {
        $('<option></option>').text(classMethods[i].name).val(classMethods[i].name).appendTo('select#methodName');
      }
      })
      //console.log(classMethods);
      
    if (checkedClass == 'Principle') {
      $('p#hunt-bells').slideUp(400);
    } else {
      $('p#hunt-bells').slideDown(400);
    }
     
      
    });
  
  $('#methodName').change(function() {
    if ($('select#methodName').val() != '') {
      $('#place-notation').prop({required: false, placeholder: ''});
      $('#bob').css("display", "none");
      $('#single').css("display", "none");
    }
    
  })
  
 $('#quantity').change(function() {
   console.log('clicked');
   if ($('#touch').is(':checked')) {
     console.log('touch chosen');
     $('#touchNot').prop({required: true, placeholder: 'required'});
     
     
     console.log('select#methodName.val(): ', $('select#methodName').val());
     if ($('select#methodName').val() == '') {
       console.log('yes');
       $('.bob').prop("disabled", false);
       $('.single').prop("disabled", false);
       $('div#call-info').slideDown(1000, "swing");
       //$('#single').css("display", "inline-block");
     }
     
     
   } else {
     $('.bob').prop("disabled", true);
     $('.single').prop("disabled", true);
     $('#touchNot').prop("required", false);
     $('div#call-info').slideUp(1000, "swing");
   }
   
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
  console.log('stage: ', stage);
  console.log('gridWidth: ', gridWidth);
  console.log('window width: ', $(window).width());
  //number of columns per viewport
  let numSVGs = Math.floor(($( window ).width() - 76)/(gridWidth + 38));
  console.log('numSVGs: ', numSVGs);
  let gridHeight = $('svg.grid').attr("height");
  
  $('div.grid').css("height", gridHeight);
  
  //number of columns per letter size page
  let printNumSVGs = Math.floor(536/(gridWidth + 38));
  let lastPage = $('div.grid').length % printNumSVGs;
  if (lastPage == 0) {
    lastPage = printNumSVGs;
  }
  
  let b = $('div.grid').length - lastPage;
  
  //add class with a margin-top to svgs past the first page
 $("div.grid:nth-child(n+"+(printNumSVGs+1)+")").addClass("pageN");
  
  //console.log('margin-bottom: ', 850-gridHeight);
  if ($('div.grid').length > 1) {
    //$('div.paged').css("margin-bottom", 753-gridHeight);
    $('#printPaging').text(
      " @media print {" +
        "div.paged {" +
          "margin-bottom: "+ (817-gridHeight) + "px;" +
        "} " +
      "}"
    );
    $('div.grid:nth-child(-n+'+b+')').addClass("paged");
  }

});
