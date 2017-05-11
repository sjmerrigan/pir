var Gpio = require('onoff').Gpio;
var sensor = new Gpio(17, 'in', 'both');    
var led = new Gpio(4, 'out');
var counter = 0;
sensor.watch(function (err, value) { 
  if (err) exit(err);
  led.write(value, function() {
    counter++;
    console.log('Changed LED state to : ' + value + ' pir counter ' + counter);
  });
});

function exit(err) {
  if (err) console.log('An error occurred: ' + err);
  sensor.unexport();
  console.log('Bye, bye!')
  process.exit();
}
process.on('SIGINT', exit);

// #A Initialize GPIO17(11) in input mode, 'both' means we want to handle both rising and falling interrupt edges
// #B Listen for state changes on GPIO17(11), if a change is detected the anonymous callback function will be called with the new value
// #C Write to GPIO4(7) with the PIR state
