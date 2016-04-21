/**
 * Created by Andreas on 10.03.2016.
 */
// This example adds a search box to a map, using the Google Place Autocomplete
// feature. People can enter geographical searches. The search box will return a
// pick list containing a mix of places and predicted search terms.

// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

function initAutocomplete() {
    var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -33.8688, lng: 151.2195},
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.ROADMAP
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

    //Create the search box and link it to the UI element.
    var input = document.getElementById('pac-input');
    document.getElementById("pac-input").value = "bensinstasjon";

    console.log(input.value);

    var searchBox = new google.maps.places.SearchBox(input);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    // Bias the SearchBox results towards current map's viewport.
    map.addListener('bounds_changed', function () {
        searchBox.setBounds(map.getBounds());

    });

    var position = navigator.geolocation.getCurrentPosition(function (position) {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        var coord = new google.maps.LatLng(latitude, longitude);
        return coord;
    });

    var textsearch = new google.maps.places.TextSearchRequest(function () {
        var request = {
            location: position,
            radius: 5000,
            type: "gas_station"
        }
    });

    var directionsService = new google.maps.DirectionsService();
    var directionsDisplay = new google.maps.DirectionsRenderer();
    var mapOptions = //Sets map options
    {
        zoom: 15,  //Sets zoom level (0-21)
        center: position, //zoom in on users location
        mapTypeControl: true, //allows you to select map type eg. map or satellite
        navigationControlOptions:
        {
            style: google.maps.NavigationControlStyle.SMALL //sets map controls size eg. zoom
        },
        mapTypeId: google.maps.MapTypeId.ROADMAP //sets type of map Options:ROADMAP, SATELLITE, HYBRID, TERRIAN
    };


    var markers = [];
    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    textsearch.addListener('places_changed',    function () {
        var places = searchBox.getPlaces();
        console.log(input.value);

        directionsDisplay.setMap(map);
        directionsDisplay.setPanel(document.getElementById('panel'));
        var request = {
            origin: position,
            destination: input.value,
            travelMode: google.maps.DirectionsTravelMode.DRIVING
        };

        if (places.length == 0) {
            return;
        }

        // Clear out the old markers.
        markers.forEach(function (marker) {
            marker.setMap(null);
        });
        markers = [];

        // For each place, get the icon, name and location.
        var bounds = new google.maps.LatLngBounds();
        places.forEach(function (place) {
            var icon = {
                url: place.icon,
                size: new google.maps.Size(40, 40),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(25, 25),
            };

            // Create a marker for each place.
            markers.push(new google.maps.Marker({
                map: map,
                icon: icon,
                title: place.name,
                position: place.geometry.location
            }));

            if (place.geometry.viewport) {
                // Only geocodes have viewport.
                bounds.union(place.geometry.viewport);
            } else {
                bounds.extend(place.geometry.location);
            }
        });
        directionsService.route(request, function (response, status) {
            if (status = google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(response)
            }
        });
        map.setZoom(18);
        map.setCenter(markers[0].position);
    })
}