import pico
import RPi.GPIO as GPIO
import time
import io, json

GPIO.setmode(GPIO.BCM)


TRIG = 14
ECHO = 15
def hello():
    print "Distance measurement in progress" 

    GPIO.setup(TRIG,GPIO.OUT)
    GPIO.setup(ECHO,GPIO.IN)

    revers = 1

    while revers == 1:

        GPIO.output(TRIG,0)
        print "waiting for sensor"
        time.sleep(0.5)

        GPIO.output(TRIG,1)
        time.sleep(0.00001)
        GPIO.output(TRIG,0)

        while GPIO.input(ECHO)==0:
            pulse_start = time.time()

        while GPIO.input(ECHO)==1:
            pulse_end = time.time()

        pulse_duration = pulse_end - pulse_start

        distance = pulse_duration * 17150

        #print "Distance:", distance, "cm"
        return str(distance)

    '''
        jsonString = "{Distance:", distance, "}"
        
        with io.open('data.js', 'a', encoding = "utf-8") as f:
            f.write(unicode(json.dumps(jsonString, ensure_ascii = False)))

    '''    
GPIO.cleanup()






















