function initAutocomplete() {
  // Create the autocomplete object, restricting the search to geographical
  // location types.
  autocomplete = new google.maps.places.Autocomplete(
    /** @type {!HTMLInputElement} */(document.getElementById('mobileLocation')),
    {types: ['geocode']});

  autocomplete = new google.maps.places.Autocomplete(
    /** @type {!HTMLInputElement} */(document.getElementById('mainLocation')),
    {types: ['geocode']});

    //In this case it gets the address from an element on the page, but obviously you  could just pass it to the method instead
    //var address = document.getElementById( 'mainLocation' ).value;

    //autocomplete.addListener('place_changed', function() {
          /*infowindow.close();
          marker.setVisible(false);
          var place = autocomplete.getPlace();
          if (!place.geometry) {
            // User entered the name of a Place that was not suggested and
            // pressed the Enter key, or the Place Details request failed.
            window.alert("No details available for input: '" + place.name + "'");
            return;*/

            //var geocoder = new google.maps.Geocoder();

            //geocoder.geocode( { 'address' : address }, function( results, status ) {
                //if( status == google.maps.GeocoderStatus.OK ) {

                    //In this case it creates a marker, but you can get the lat and lng from the location.LatLng
                  //  map.setCenter( results[0].geometry.location );
                  //  var marker = new google.maps.Marker( {
                //        map     : map,
                //        position: results[0].geometry.location.LatLng
                //    } );
              //  } else {
              //      alert( 'Geocode was not successful for the following reason: ' + status );
              //  }
          //  } );





            //latLng = address.geometry.location.LatLng
            //var marker = new google.maps.Marker({
          // The below line is equivalent to writing:
          // position: new google.maps.LatLng(-34.397, 150.644)
          //position: {lat: -34.397, lng: 150.644},
          //map: map
            //console.log(latLng);
            //console.log("changed");
          //});


    // When the user selects an address from the dropdown, populate the address
    // fields in the form.
    autocomplete.addListener('place_changed', fillInAddress);

  }

  function fillInAddress() {
    // Get the place details from the autocomplete object.
    var place = autocomplete.getPlace();
  }
