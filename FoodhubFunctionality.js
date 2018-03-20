$(document).ready(function(){

<<<<<<< HEAD
  // Semantic UI Range
  $('#range-1').range({
    min: 0,
    max: 10,
    start: 5
  });
  });
=======
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
>>>>>>> f5985976da0f8ccd64c4c70aa6551d2dfc747672
