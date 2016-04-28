var usonic = require('r-pi-usonic');

usonic.init(function (error) {
    if (error) {
        console.log('Error')
    } else {
        var sensor = usonic.createSensor(14, 15, 1000);
        setTimeout(function() {
                console.log('Distance: ' + sensor().toFixed(2) + ' cm');
        }, 60);
    }
});