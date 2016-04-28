addEventListener("load, initMap");


var map;
var lat;
var lng;
/*this styles element on the map and can be used to show/hide types of elements 
(RTFM if you need to do shit with this)
the reason I hide all "pois" & "transit.stations" is that google will not allow the use of them without
also enabeling "InfoWindows" which contain links and could be used to escape the window all
together (not exactly desireable)
*/
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
					
function initMap()
{
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
	//OBS this is terrible, it's just a test solution
}
			
function setLat(x)
{
	//this does nothing really since the map doesn't update based on these variables (yet)
	lat = x;
}
			
function setLng(x)
{
	//this does nothing really since the map doesn't update based on these variables (yet)
	lng = x;
}