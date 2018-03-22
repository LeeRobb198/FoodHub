$(document).ready(function(){
// Semantic UI Range
  $('.ui.range').range({
    min: 0,
    max: 10,
    start: 5,
  });
    // All your normal JS code goes in here
    $(".rating").rating();
$('body .ui.sidebar').sidebar('setting', 'transitions','overlay')
  .sidebar('attach events', '.toggle.button')
  .sidebar('toggle');

  $('.teal.button')
    .popup({
      on: 'click'
    });
});
