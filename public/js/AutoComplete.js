function initAutocomplete() {
  //Mobile AutoComplete --------------------------------------------------------
  autocomplete = new google.maps.places.Autocomplete(
    /** @type {!HTMLInputElement} */(document.getElementById('mobileLocation')),
    {types: ['geocode']});
  //End Mobile AutoComplete ----------------------------------------------------

  //Main AutoComplete ----------------------------------------------------------
  autocomplete = new google.maps.places.Autocomplete(
    /** @type {!HTMLInputElement} */(document.getElementById('mainLocation')),
    {types: ['geocode']});
  //End Main AutoComplete ------------------------------------------------------

  autocomplete.addListener('place_changed', fillInAddress);

}

function fillInAddress() {
  // Get the place details from the autocomplete object.
  var place = autocomplete.getPlace();
}
