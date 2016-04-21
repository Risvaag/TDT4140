var positionToGoogleLatLng = function(position) {
  return new google.maps.LatLng(
    position.coords.latitude,
    position.coords.longitude
  );
};

var drawStoresMap = function(position) {
  var map = new google.maps.Map(document.getElementById('map-canvas'), {
    center: positionToGoogleLatLng(position),
    zoom: 12
  });
};

$(document).ready(function() {
    navigator.geolocation.getCurrentPosition( 
        function(position) {
            console.log(position);
            drawStoresMap(position) }, 
        function(error) {
            console.log(error) }
        );
  });