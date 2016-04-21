/**
 * Created by Andreas on 04.04.2016.
 */
// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">


var infoWindow;
var service;
var map;

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
   console.log("123", String(yourPosition));
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

    //google.maps.event.addListenerOnce(map, "boundsChanged", performSearch);

    /*
    directionsDisplay.addListener('directions_changed', function () {
        computeTotalDistance(directionsDisplay.getDirections());

    displayRoute(positionSuper, markerList[0], directionsService, directionsDisplay);
    });
*/


  var geocoder = new google.maps.Geocoder;

    var starting = geocodeLatLng(positionStartPoint, geocoder, map, infoWindow);
    var ending = geocodeLatLng(markerList[0], geocoder, map, infoWindow);
    console.log(starting);
    console.log(ending);


      directionsDisplay.addListener('directions_changed', function() {
    computeTotalDistance(directionsDisplay.getDirections());
  });

  displayRoute(starting, ending, directionsService,
      directionsDisplay);


}

function performSearch() {
  var request = {
      location: positionSuper,
      radius: 1000,
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
    console.log(markerList[0]);
}


var positionSuper = navigator.geolocation.getCurrentPosition(function (position) {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        var coord = new google.maps.LatLng(latitude, longitude);
        return coord;
    });

var positionStartPoint = navigator.geolocation.getCurrentPosition(function (position) {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        var coord = new google.maps.LatLng(latitude, longitude);
        positionStartPoint = String(coord);
        positionStartPoint = positionStartPoint.substring(1, positionStartPoint.length-1);
    console.log(positionStartPoint + "yo");
    });



/*
function displayRoute(origin, destination, service, display) {
  service.route({
    origin: origin,
    destination: destination,
    travelMode: google.maps.TravelMode.DRIVING,
    avoidTolls: true
  }, function(response, status) {
    if (status === google.maps.DirectionsStatus.OK) {
        console.log("Eii");
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
*/

function displayRoute(origin, destination, service, display) {
  service.route({
    origin: origin,
    destination: destination,
    //waypoints: [{location: 'Cocklebiddy, WA'}, {location: 'Broken Hill, NSW'}],
    travelMode: google.maps.TravelMode.DRIVING
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

function geocodeLatLng(input, geocoder, map, infowindow) {
  var latlngStr = input.split(",");
    console.log(latlngStr);
  var latlng = {lat: parseFloat(latlngStr[0]), lng: parseFloat(latlngStr[1])};


    geocoder.geocode({'location': latlng}, function(results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
      if (results[1]) {
        map.setZoom(11);
        var marker = new google.maps.Marker({
          position: latlng,
          map: map
        });
        infowindow.setContent(results[1].formatted_address);
        infowindow.open(map, marker);
      } else {
        window.alert('No results found');
      }
    } else {
      window.alert('Geocoder failed due to: ' + status);
    }
  });
}

