$(document).ready(function(){
// Semantic UI Range
  $('.ui.range').range({
    min: 0,
    max: 10,
    start: 5,
  });
    // All your normal JS code goes in here
    $(".rating").rating();

<<<<<<< HEAD
  $('.teal.button')
    .popup({
      on: 'click'
    });
=======
    $('.sidebar')
      .sidebar('attach events', '.item');
>>>>>>> a49b0a231a83791144a13bb49e5b00389c8a6bb9
});
