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

//Start of initialiseMap Function --------------------------------------------------------
function initialiseMap() {

  //Sets the Initial center to New York
  var center = new google.maps.LatLng(40.7128,-74.0060);

  map = new google.maps.Map(document.getElementById('map'),{
    center: center,
    zoom: 8
  });

  //Finds Generic Restaurants
  request = {
    location: center,
    radius: 8047,
    types: ['restaurant'],
  };

  //Finds the restaurant's names
  infowindow = new google.maps.InfoWindow();
  service = new google.maps.places.PlacesService(map);

  service.nearbySearch(request, callback);

  //Once Submit Button Hit -------------------------------------------
  var isDesktop = true;
  var mobileButton = document.getElementById('subButtonMobile');
  var desktopButton = document.getElementById('subButton');

  //Geocoder
  var geocoder = new google.maps.Geocoder();

  google.maps.event.addDomListener(desktopButton, 'click', function() {
    isDesktop = true;
    clearResults(markers);
    geocodeAddress(geocoder,updateMap, isDesktop);
  });

  google.maps.event.addDomListener(mobileButton, 'click', function() {
    isDesktop = false;
    clearResults(markers);
    geocodeAddress(geocoder,updateMap, isDesktop);
  });
  ////End of Submit Button Hit ---------------------------------------

}
//End of initialiseMap Function ----------------------------------------------------------

//Start of updateMap ---------------------------------------------------------------------
function updateMap(center, isDesktop){

  map = new google.maps.Map(document.getElementById('map'),{
    center: center,
    zoom: 8
  });

  //Distance Option
  var distance;
  var userDistanceValue;

  if (!isDesktop){
    distance = document.getElementById('distanceOptionMobile');
    userDistanceValue = distance.value;
  }
  else{
    distance = document.getElementById('distanceOption');
    userDistanceValue = distance.value;
  }

  //Cuisine Option
  var cuisine;
  var userCuisineOption;

  if (!isDesktop){
    cuisine = document.getElementById('cuisineOptionMobile');
    userCuisineOption = cuisine.options[cuisine.selectedIndex].text;
  }
  else{
    cuisine = document.getElementById('cuisineOption');
    userCuisineOption = cuisine.options[cuisine.selectedIndex].text;
  }

  //Price Option
  var price;

  if (!isDesktop){
    price = document.getElementsByName('priceOptionMobile');
  }
  else{
    price = document.getElementsByName('priceOption');
  }

  for (var i = 0, length = price.length; i < length; i++){
    if (price[i].checked){
      var userPriceOption = price[i].value;
      var minPrice = userPriceOption - 1;
      break;
    }
  }

  //Search Request
  var request = {
    location: center,
    radius: userDistanceValue,
    types: ['restaurant'],
    keyword: [userCuisineOption],
    minPriceLevel: minPrice,
    maxPriceLevel: userPriceOption,
  };
  service.nearbySearch(request, callback);
}
//End of updateMap Function --------------------------------------------------------------

//CallBack Function ------------------------------------------------------------
function callback(results, status){
  if(status == google.maps.places.PlacesServiceStatus.OK){
    for (var i = 0; i < results.length; i++){
      markers.push(createMarker(results[i]));
    }
  }
}
//End of CallBack Function -----------------------------------------------------

//Creates Marker Function ------------------------------------------------------
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
//End Create Marker Function ---------------------------------------------------

//Clear Results Function -------------------------------------------------------
function clearResults(markers){
  for (var m in markers){
    markers[m].setMap(null)
  }
  markers = []
}
//Clear Results Function -------------------------------------------------------

//Geocoder Function ------------------------------------------------------------
function geocodeAddress(geocoder,domapstuff, isDesktop) {
  var address;
  var latitude;
  var longitude;

  if (!isDesktop){
    var address = document.getElementById('mobileLocation').value;

    geocoder.geocode( { 'address': address}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        latitude = results[0].geometry.location.lat();
        longitude = results[0].geometry.location.lng();

        var newCenter = new google.maps.LatLng(latitude,longitude);
        updateMap(newCenter,isDesktop);
      }
      else{
        var falseCenter = new google.maps.LatLng(40.7128,-74.0060);
        updateMap(falseCenter, isDesktop);
      }
    });
  }
  else{
      var address = document.getElementById('mainLocation').value;

      geocoder.geocode( { 'address': address}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          latitude = results[0].geometry.location.lat();
          longitude = results[0].geometry.location.lng();

          var newCenter = new google.maps.LatLng(latitude,longitude);
          updateMap(newCenter, isDesktop);
        }
        else{
          var falseCenter = new google.maps.LatLng(40.7128,-74.0060);
          updateMap(falseCenter, isDesktop);
        }
      });
    }
}
//End of Geocoder Function -----------------------------------------------------
