/*
 FILNAVN: map.js
 SKREVET AV: Andreas Norstein
 Brukt googles-api
 HENSIKT: Oppretter et google-maps-objekt som viser hvor gården ligger slik at brukeren lett kan finne det på kartet

Sjekk ut link, finn egen lokasjon
 https://developers.google.com/maps/documentation/javascript/examples/map-geolocation

 api-key: AIzaSyDfQP4Jo_82FyIosmR28DOy07sjNk5Rneo
 */

// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.
// http://g.co/mapsJSApiErrors
function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 16
    });
    //var infoWindow = new google.maps.InfoWindow({map: map});
//    var lat = position.coords.latitude;
//    var long = position.coords.longitude;

    var marker = new google.maps.Marker({
       // position: pos,
        map: map,
        title: "Your position"
    });

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            marker.setPosition(pos);

            //infoWindow.setPosition(pos);
            //infoWindow.setContent('Location found.');
            map.setCenter(pos);
        }, function() {
            handleLocationError(true, marker, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, marker, map.getCenter());
    }
}
function handleLocationError(browserHasGeolocation, marker, pos) {
    marker.setPosition(pos);
    marker.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
}