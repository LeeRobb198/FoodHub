// All the functionality for html template
$(document).ready(function() {
  // Semantic UI popup
  $('.js_popup')
    .popup({
      on : 'click'
    });

$('#smooth').range({
   min: 0,
   max: 10,
   start: 5,
   smooth: true
 });
});

$('.example .custom.button')
  .popup({
    popup : $('.custom.popup'),
    on    : 'click'
  })
;

onChange: function(value) {
  var
    $self = $(this),
    firstVal = $self.range('get thumb value'),
    secVal = $self.range('get thumb value', 'second');
  $('#display-d').html('|' + firstVal + " - " + secVal + '| = ' + value);
}
});
