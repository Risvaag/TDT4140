/**
 * Created by Andreas on 04.04.2016.
 */
// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

var map;
var infoWindow;
var service;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -33.867, lng: 151.206},
        zoom: 15,
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

    var yourPosition = new google.maps.Marker({
        map: map,
        title: "Your position"
    });

    infoWindow = new google.maps.InfoWindow();
    service = new google.maps.places.PlacesService(map);

    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer({
        draggable: true,
        map: map,
        panel: document.getElementById('right-panel')
    });


    // The idle event is a debounced event, so we can query & listen without
    // throwing too many requests at the server.

    map.addListener('idle', performSearch);

    displayRoute(directionsService, directionsDisplay);

    directionsDisplay.addListener('directions_changed', function () {
        computeTotalDistance(directionsDisplay.getDirections());

    });
}

function performSearch() {
  var request = {
    bounds: map.getBounds(),
    keyword: 'gas station'

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

function addMarker(place) {
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location,
    icon: {
      url: 'http://maps.gstatic.com/mapfiles/circle.png',
      anchor: new google.maps.Point(10, 10),
      scaledSize: new google.maps.Size(10, 17)
    }
  });

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

    var position = navigator.geolocation.getCurrentPosition(function (position) {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        var coord = new google.maps.LatLng(latitude, longitude);
        return coord;
    });


function displayRoute(service, display) {
  service.route({
    origin: position,
    destination: "gas_station",
    travelMode: google.maps.TravelMode.DRIVING,
  }, function(response, status) {
    if (status === google.maps.DirectionsStatus.OK) {
      display.setDirections(response);
    } else {
      alert('Could not display directions due to: ' + status);
    }
  });

}

function computeTotalDistance(result) {
  var total = 0;
  var myroute = result.routes[0];
  for (var i = 0; i < myroute.legs.length; i++) {
    total += myroute.legs[i].distance.value;
  }
  total = total / 1000;
  document.getElementById('total').innerHTML = total + ' km';
}