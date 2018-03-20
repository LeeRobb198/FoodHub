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

onChange: function(value) {
  var
    $self = $(this),
    firstVal = $self.range('get thumb value'),
    secVal = $self.range('get thumb value', 'second');
  $('#display-d').html('|' + firstVal + " - " + secVal + '| = ' + value);
}
});

//Map --------------------------------------------------------------------------
function initMap() {
  var uluru = {lat: -25.363, lng: 131.044};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: uluru
  });
  var marker = new google.maps.Marker({
    position: uluru,
    map: map
  });
}

//Popup ------------------------------------------------------------------------
$('.example .custom.button')
  .popup({
    popup : $('.custom.popup'),
    on    : 'click'
  })
;
