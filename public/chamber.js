

$(function() {
  
  $("#openchamber").click((e) => {
    console.log("open sesame");
    
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/openchamber', true);
    xhr.send();
    
    $("#room").toggle();
    $("#entrants").toggle();
    $("#openchamber").toggle();
  });
  
  
});