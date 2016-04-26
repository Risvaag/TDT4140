var statistics = require('math-statistics');
var usonic = require('r-pi-usonic');

/*//JSDOM SHIT 
var fs = require("fs");
var path = require("path");
var jsdom = require("jsdom");
var htmlSource = fs.readFileSync("../index.html", "utf-8");
*/

var init = function(config) {
    usonic.init(function (error) {
        if (error) {
        console.log('error');
        } else {
            var sensor = usonic.createSensor(config.echoPin, config.triggerPin, config.timeout);
            //console.log(config);
            var distances;

            (function measure() {
                if (!distances || distances.length === config.rate) {
                    if (distances) {
                        print(distances);
                    }

                    distances = [];
                }

                setTimeout(function() {
                    distances.push(sensor());

                    measure();
                }, config.delay);
            }());
        }
    });
}; 

var print = function(distances) {
    var distance = statistics.median(distances);

    process.stdout.clearLine();
    process.stdout.cursorTo(0);

    if (distance < 0) {
        process.stdout.write('Error: Measurement timeout.\n');
    } else {
        process.stdout.write('Distance: ' + distance.toFixed(2) + ' cm');
        }
};

init({
    echoPin: 15, //Echo pin
    triggerPin: 14, //Trigger pin
    timeout: 1000, //Measurement timeout in µs
    delay: 60, //Measurement delay in ms
    rate: 5 //Measurements per sample
});

