$(document).ready(function(){
// Semantic UI Range
  $('.ui.range').range({
    min: 0,
    max: 10,
    start: 5,
  });
    // All your normal JS code goes in here
    $(".rating").rating();

    $('.sidebar')
      .sidebar('attach events', '.item');
});
