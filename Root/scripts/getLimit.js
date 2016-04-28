addEventListener("load",function(){getLimit()});


function getLimit()
{
	var x = document.getElementById("speedLimit");
	function getSpeedlimit(position)
	{
		latMin = parseFloat(position.coords.latitude).toFixed(4);
		latMax = parseFloat(position.coords.latitude+1).toFixed(4);
		longMin = parseFloat(position.coords.longitude).toFixed(4);
		longMax = parseFloat(position.coords.longitude+1).toFixed(4);
		
		url = 'https://www.vegvesen.no/nvdb/api/sok?kriterie={lokasjon:{bbox:"'+longMin+','+latMin+','+longMax+','+latMax+'",srid:"wgs84"},objektTyper:[{id:105,antall:1}]}'
		//document.getElementById("test").innerHTML = url;
		var xmlHttp = new XMLHttpRequest();
		xmlHttp.open("GET", url, false);
		xmlHttp.send(null);
		Text = (xmlHttp.responseText.split('kortVerdi":"')[1]).split('","')[0];
		x.innerHTML = '<img src="pictures/SpeedLimit'+Text+'.png" alt="Speedlimit">';
	}
	
	//===========================
	function getLocation() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(getSpeedlimit);
		} else {
			x.innerHTML = "Geolocation is not supported by this browser.";
		}
	}
	
	window.setInterval(function(){getLocation()}, 5000);
}

