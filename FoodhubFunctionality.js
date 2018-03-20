$(document).ready(function(){

  // Semantic UI Range
  $('#range-1').range({
    min: 0,
    max: 10,
    start: 5
  });
  });

$('#smooth').range({
   min: 0,
   max: 10,
   start: 5,
   smooth: true
 });

onChange: function(value) {
  var
    $self = $(this),
    firstVal = $self.range('get thumb value'),
    secVal = $self.range('get thumb value', 'second');
  $('#display-d').html('|' + firstVal + " - " + secVal + '| = ' + value);
}
});

//Map --------------------------------------------------------------------------


//Popup ------------------------------------------------------------------------
$('.example .custom.button')
  .popup({
    popup : $('.custom.popup'),
    on    : 'click'
  })
;
>>>>>>> f5985976da0f8ccd64c4c70aa6551d2dfc747672
