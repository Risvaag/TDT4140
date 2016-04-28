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
	var myStyles = 
	//OBS these are arrays of styles so if you want to add one add in the style of "transit"
	[
		{
			featureType: "poi",
			elementType: "labels",
			stylers: [{visibility: "off"}]
		},
		{
			featureType: "transit.station",
			elementType: "labels",
			stylers: [{visibility: "off"}]
		}
	]
	
    map = new google.maps.Map(document.getElementById("map"),
	{
		//sets where the map starts
		//TODO make this your current coordniates
		center: {lat: 63.415, lng: 10.403},
		//sets the starting zoom level (higher number = closer to the ground)
		zoom: 15,
		//as close as we allow them to zoom in
		maxZoom: 19,
		//as far out as we allow them to zoom
		minZoom: 9,
		//can't click on the screen to zoom in
		disableDoubleClickZoom: true,
		//no using keyboard inputs to controll the map
		keyboardShortcuts: false,
		//Turns of the UI
		disableDefaultUI: true,
		//prevents draging the map to change it's current location
		draggable: false,
		//prevents scrolling with the mouswheel
		scrollwheel: false,
		//uses the style set above in "myStlyes" (currently hides all pois and lables)
		styles: myStyles,
		//reintroduces the zoom in and out buttons
		zoomControl: true,
		//settings for aforementioned buttons
		zoomControlOptions:
		{
			//sets the style of the buttons (doesn't seem to work propperly)
			//TODO look into this
			//Did look into it, it's a matter of a deprecated alternative, was available in v3.21
			//but is gone with v3.22 (an opt out exists if it is needed)
			style: google.maps.ZoomControlStyle.LARGE,
			//sets the position on the screen for the zoom buttons
			position: google.maps.ControlPosition.TOP_RIGHT
		}
	});

    var yourPosition = new google.maps.Marker({
        map: map,
        title: "Your position"
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
    } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
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
<<<<<<< HEAD
    setInterval(initMap, 3600);
=======
    setInterval(initMap, 2600);
>>>>>>> dafaf4827c7d7746efcab0d4239853bdd89c9a2a
    console.log("heihei");

};*/

