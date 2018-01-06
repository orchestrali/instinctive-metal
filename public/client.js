// client-side js
// run by the browser each time your view template is loaded

// by default, you've got jQuery,
// add other scripts at the bottom of index.html

$(function() {
  console.log('hello world :o');
  
 $('#quantity').change(function() {
   console.log('clicked');
   if ($('#touch').is(':checked')) {
     
     $('.bob').prop("disabled", false);
     $('.single').prop("disabled", false);
     $('#touchNot').prop("required", true);
   } else {
     $('.bob').prop("disabled", true);
     $('.single').prop("disabled", true);
     $('#touchNot').prop("required", false);
   }
   
 })

 

});
