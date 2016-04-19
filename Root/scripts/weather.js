var callbackFunction = function(data) {
    if (data.query.results != null) {
        //var wind = data.query.results.channel.wind;
        //alert(wind.chill);
        var temp = parseInt(data.query.results.channel.item.condition.temp);
        alert(temp);
        document.getElementById('temp').innerHTML = (temp-32)/1.8;

    } else {
        document.getElementById('temp').innerHTML = "ingen værinformajson tiljengelig";
    }
};