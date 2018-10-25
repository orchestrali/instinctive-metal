


$(function() {
  let methodNames = [];
  let started = 0;
  let methods;
  let current;
  let count = 0;
  
  $.getJSON("/sm")
    .done(function(body) {
      methods = body;
    })
    .fail(function( jqxhr, textStatus, error ) {
    var err = textStatus + ", " + error;
      //console.log("Text: " + jqxhr.responseText);
    console.log( "Request Failed: " + err );
    });
  
  
  $("#nav-options").click(function() {
    $("#nav-options ul").slideToggle(600, "swing");
    $(".arrow").toggleClass("rotate");
    
  });
  
  
  
  $("#methodname").click(function() {
    //console.log(methods[0]);
    
    if (started == 0) {
      $("#methodname:hover").css("cursor", "auto");
    
      getMethod();
    }
  });
  
  
  
  $("div.option").click(function() {
    console.log(this.id);
    console.log($(this).parent().attr("id"));
    let choice = this.id;
    let cat = $(this).parent().attr("id");
    console.log(current);
    console.log(current[cat]);
    
    if (current) {
      if (choice == current[cat]) {
        $(this).addClass("correct");
        count++;
        
        if (count == 3) {
          $("div.option").removeClass("correct wrong");
          getMethod();
          count = 0;
        }
      } else {
        $(this).addClass("wrong");
      }
      
    }
  });
  
  
  function names(array) {
    for (var i = 0; i < array.length; ++i) {
      methodNames.push(array[i].name);
    }
  }

  
  function getMethod() {
    current = methods[Math.floor(Math.random() * 41)];
    $("#methodname p").text(current.name);
  }
  
});