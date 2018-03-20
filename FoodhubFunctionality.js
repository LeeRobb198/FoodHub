$(document).ready(function() {
  // Semantic UI popup
  $('.js_popup')
    .popup({
      on : 'click'
    });

  // Semantic UI Range
  $('#smooth').range({
    min: 0,
    max: 10,
    start: 5
  });

  $('#price-range').range({
    min: 0,
    max: 10,
    start: 5,
    labelType: 'letter'
  });



  });
