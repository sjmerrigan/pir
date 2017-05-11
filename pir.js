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
