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
  
  $('#stage').change(function() {
    
    stage = $('select#stage option:checked').val();
    console.log("stage: ", stage);
    $('select#methodName').children().detach();
    $('<option></option>').prop({selected: true}).appendTo('select#methodName');
    
    $('select#blueBell').children().detach();
    $('<option></option>').prop({selected: true}).appendTo('select#blueBell');
    
    for (var i = 0; i < stage; ++i) {
      $('<option></option').text(i + 1).val(i+1).appendTo('select#blueBell');
    }
    
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
      
      
     
      
    });
  
  $('#methodName').change(function() {
    $('#place-notation').prop({required: false, placeholder: ''});
  })
  
 $('#quantity').change(function() {
   console.log('clicked');
   if ($('#touch').is(':checked')) {
     $('#touchNot').prop({required: true, placeholder: 'required'});
     
     if ($('select#methodName:first-child').is(':checked')) {
       $('.bob').prop("disabled", false);
       $('.single').prop("disabled", false);
     }
     
     
   } else {
     $('.bob').prop("disabled", true);
     $('.single').prop("disabled", true);
     $('#touchNot').prop("required", false);
   }
   
 })
  
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
