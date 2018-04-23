function callFunctions(){
  initialiseMap();
  initAutocomplete();
}

//Global Variables
var map;
var infowindow;
var request;
var service;
var markers = [];
//var rating = 1;

function initialiseMap() {

  //Chicago
  //var center = new google.maps.LatLng(41.8781,-87.6298);

  //New York
  var center = new google.maps.LatLng(40.7128,-74.0060);
  //Aberdeen
  //var center = new google.maps.LatLng(57.1497,-2.099075);

  map = new google.maps.Map(document.getElementById('map'),{
    center: center,
    zoom: 8
  });

  //var center = new google.maps.LatLng(57.1497,-2.099075);
  //map = new google.maps.Map(document.getElementById('map'),{
    //center: center,
    //zoom: 5
  //});

  //Finds Generic Restaurants
  request = {
    location: center,
    radius: 8047,
    types: ['restaurant'],
  };
  infowindow = new google.maps.InfoWindow();

  service = new google.maps.places.PlacesService(map);

  service.nearbySearch(request, callback);

  //Once Submit Button Hit -------------------------------------------------
  var button = document.getElementById('subButton');

  //Geocoder
  var geocoder = new google.maps.Geocoder();

  google.maps.event.addDomListener(button, 'click', function() {

    //Creates New Center
    var newCenter = new google.maps.LatLng(40.7128,-74.0060);
    clearResults(markers);

    //Location Option
    //var newCenter = new google.maps.LatLng(geocodeAddress(geocoder, map));
    //console.log(newCenter);

    //Distance Option
    var distance = document.getElementById('distanceOption');
    var userDistanceValue = distance.value;

    //Cuisine Option
    var cuisine = document.getElementById('cuisineOption');
    var userCuisineOption = cuisine.options[cuisine.selectedIndex].text;

    //Rating Option
    // $('.ui.rating').rating('setting', 'onRate', function(value) {
    //   rating = value;
    // });
    // console.log("outside: " + rating);
    // var userRatingOption = rating;
    // console.log(userRatingOption);

    //Price Option
    var price = document.getElementsByName('priceOption');

    for (var i = 0, length = price.length; i < length; i++){
     if (price[i].checked){
      var userPriceOption = price[i].value;
      var minPrice = userPriceOption - 1;
      break;
     }
    }

    //Search Request
    var request = {
      location: newCenter,
      radius: userDistanceValue,
      types: ['restaurant'],
      keyword: [userCuisineOption],
      minPriceLevel: minPrice,
      maxPriceLevel: userPriceOption,
      //rating: userRatingOption
    };
    service.nearbySearch(request, callback);
  })

}

//End of initialiseMap Function --------------------------------------------

//CallBack Function
function callback(results, status){
  if(status == google.maps.places.PlacesServiceStatus.OK){
    for (var i = 0; i < results.length; i++){
      //createMarker(results[i]);
      markers.push(createMarker(results[i]));
    }
  }
}

//Creates Marker
function createMarker(place){
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location

  });

  google.maps.event.addListener(marker, 'click', function(){
    //Displays Name of Restaurant
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
  return marker;
}

//Clears the Results
function clearResults(markers){
  for (var m in markers){
    markers[m].setMap(null)
  }
  markers = []
}

//Geocoder Function
function geocodeAddress(geocoder, resultsMap) {
    var address = document.getElementById('mainLocation').value;
    var latitude;
    var longitude;

    geocoder.geocode( { 'address': address}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        latitude = results[0].geometry.location.lat();
        longitude = results[0].geometry.location.lng();
        console.log(latitude);
        console.log(longitude);
      }
    });
    var newCenter = new google.maps.LatLng(latitude,longitude);
    console.log(newCenter)
    return newCenter;
  }

    //geocoder.geocode({'address': address}, function(results, status) {
      //if (status === 'OK') {
      //  resultsMap.setCenter(results[0].geometry.location);
      //  var latitude = results[0].geometry.location.latitude;
      //  var longitude = results[0].geometry.location.longitude;
      //  var marker = new google.maps.Marker({
      //    map: resultsMap,
      //    position: results[0].geometry.location
      //  });
    //  } else {
    //    alert('Geocode was not successful for the following reason: ' + status);
    //  }
  //  });
//  }

google.maps.event.addDomListener(window, 'load', initialiseMap);



//------------------------------------------------------------------------------


//Star Rating by John


// function initialiseMap() {
//
//   //var start = document.getElementById("mainLocation").value;
//   var center = new google.maps.LatLng(57.1497,-2.099075);
//   map = new google.maps.Map(document.getElementById('map'),{
//     center: center,
//     zoom: 5
//   });
//
//   //var center = new google.maps.LatLng(57.1497,-2.099075);
//   //map = new google.maps.Map(document.getElementById('map'),{
//     //center: center,
//     //zoom: 5
//   //});
//
//   //Finds restaurants
//   request = {
//     location: center,
//     radius: 8047,
//     types: ['restaurant'],
//   };
//   infowindow = new google.maps.InfoWindow();
//
//   service = new google.maps.places.PlacesService(map);
//
//   service.nearbySearch(request, callback);
//
//   //Once Submit Button Hit
//   var button = document.getElementById('subButton');
//
//   google.maps.event.addDomListener(button, 'click', function() {
//     var newCenter = new google.maps.LatLng(57.1497,-2.099075);
//     clearResults(markers);
//
//     //Cuisine Option
//     var cuisine = document.getElementById("cuisineOption");
//     var userCuisineOption = cuisine.options[cuisine.selectedIndex].text
//
//     //Price Option
//     //var ratingValue;
//
//     //Search Request
//     var request = {
//       location: newCenter,
//       radius: 8047,
//       types: ['restaurant'],
//       keyword: [userCuisineOption],
//       //rating: [ratingValue]
//     };
//     service.nearbySearch(request, callback);
//   })
//
// }
//
// function callback(results, status){
//   if(status == google.maps.places.PlacesServiceStatus.OK){
//     for (var i = 0; i < results.length; i++){
//       var m = createMarker(results[i]);
//       markers.push(m);
//       //if (m){
//       //markers.push(m);
//       //}
//     }
//   }
// }
//
// function createMarker(place){
//   //if (place.rating >= ratingValue){
//
//     var placeLoc = place.geometry.location;
//     var marker = new google.maps.Marker({
//       map: map,
//       position: place.geometry.location
//     });
//
//     google.maps.event.addListener(marker, 'click', function(){
//       infowindow.setContent(place.name);
//       infowindow.open(map, this);
//     });
//     return marker;
//   //}
//   //return null;
// }
//
// function clearResults(markers){
//   for (var m in markers){
//     markers[m].setMap(null)
//   }
//   markers = []
// }
//
// google.maps.event.addDomListener(window, 'load', initialiseMap);
//
// </script> -->
//
// <!-- Script for Google Map API -->
// <!--<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDKmr5cGY2-bu4wHPpMSxsvrpH5XM6-Cps&callback=myMap"></script> -->
