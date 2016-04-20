var callbackFunction = function(data) {
    if (data.query.results != null) {
        //var wind = data.query.results.channel.wind;
        //alert(wind.chill);
        var temp = parseInt(data.query.results.channel.item.condition.temp);
        var text = data.query.results.channel.item.condition.text;
        document.getElementById('temp').innerHTML = ((temp-32)/1.8).toFixed(1) + "°C";
        document.getElementById('weatherText').innerHTML = text;

    } else {
        
    }
};