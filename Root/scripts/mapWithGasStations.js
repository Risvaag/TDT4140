/**
 * Created by Andreas on 04.04.2016.
 */
// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">


var infoWindow;
var service;
var map;

var positionSuper = navigator.geolocation.getCurrentPosition(function (position) {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        var coord = new google.maps.LatLng(latitude, longitude);
        positionSuper = coord;
    });

var positionStartPoint = navigator.geolocation.getCurrentPosition(function (position) {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        var coord = new google.maps.LatLng(latitude, longitude);
        positionStartPoint = String(coord);
        positionStartPoint = positionStartPoint.substring(1, positionStartPoint.length-1);
    //console.log(positionStartPoint + " yo");
    });


function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -33.867, lng: 151.206},
        zoom: 14,
        styles: [{
            stylers: [{visibility: 'simplified'}]
        }, {
            elementType: 'labels',
            stylers: [{visibility: 'off'}]
        }]
    });


    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            yourPosition.setPosition(pos);
            map.setCenter(pos);
        }, function () {
            handleLocationError(true, yourPosition, map.getCenter());
        });
    }
//    console.log(positionStartPoint + " yoyoyo");

    var yourPosition = new google.maps.Marker({
        map: map,
        title: "Your position"
    });


    infoWindow = new google.maps.InfoWindow();
    service = new google.maps.places.PlacesService(map);

    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer({
        draggable: true,
        zoom: 15,
        map: map,
        panel: document.getElementById('right-panel')
    });


    // The idle event is a debounced event, so we can query & listen without
    // throwing too many requests at the server.

    google.maps.event.addListener(map,'idle', performSearch);

 // var geocoder = new google.maps.Geocoder;

}

function performSearch() {
  var request = {
      location: positionSuper,
      radius: 2000,
          keyword: 'gas_station',
          types: ['gas_station']
  };
  service.radarSearch(request, callback);
}
//AIzaSyDfQP4Jo_82FyIosmR28DOy07sjNk5Rneo
function callback(results, status) {
  if (status !== google.maps.places.PlacesServiceStatus.OK) {
    console.error(status);
    return;
  }
  for (var i = 0, result; result = results[i]; i++) {
    addMarker(result);
  }
}

var markerList = [];
function addMarker(place) {
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location,
    icon: {
      url: 'http://maps.gstatic.com/mapfiles/circle.png',
      anchor: new google.maps.Point(10, 10),
      scaledSize: new google.maps.Size(20, 34)
    }
  });

    //Posisjoner(bensinstasjoner) blir lagt til i liste og samlet som lengde og breddegrader
    var pos = String(place.geometry.location);
    pos = pos.substring(1, pos.length-1);
    markerList.push(pos);

  google.maps.event.addListener(marker, 'click', function() {
    service.getDetails(place, function(result, status) {
      if (status !== google.maps.places.PlacesServiceStatus.OK) {
        console.error(status);
        return;
      }
      infoWindow.setContent(result.name);
      infoWindow.open(map, marker);
    });
  });
}

/*window.onload = function(){
    setInterval(initMap, 2600);
    console.log("heihei");

};*/

