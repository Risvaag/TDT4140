var statistics = require('math-statistics');
var usonic = require('r-pi-usonic');

var fs = require("fs");
var path = require("path");
var jsdom = require("jsdom");

var htmlSource = fs.readFileSync("../index.html", "utf8");



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

        call_jsdom(htmlSource, function (window) {
            var $ = window.$;
            $("#rearDistance").text(distance.toFixed(2));
            console.log(documentToSource(window.document));
});
    }
};

function documentToSource(doc) {
    // The non-standard window.document.outerHTML also exists,
    // but currently does not preserve source code structure as well

    // The following two operations are non-standard
    return doc.doctype.toString()+doc.innerHTML;
}

function call_jsdom(source, callback) {
    jsdom.env(
        source,
        [ 'jquery-1.7.1.min.js' ],
        function(errors, window) {
            process.nextTick(
                function () {
                    if (errors) {
                        throw new Error("There were errors: "+errors);
                    }
                    callback(window);
                }
            );
        }
    );
}

init({
    echoPin: 15, //Echo pin
    triggerPin: 14, //Trigger pin
    timeout: 1000, //Measurement timeout in µs
    delay: 60, //Measurement delay in ms
    rate: 5 //Measurements per sample
});

