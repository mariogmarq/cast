const ChromecastAPI = require('chromecast-api')
var child_process = require('child_process')

//Launch server
var child = child_process.fork('./server')
//Wait for it to run
child.on('message', (message) => { console.log(message) })


const client = new ChromecastAPI()

client.on('device', function (device) {
  const MEDIA_URL = "http://192.168.1.137:8080/" //My local ip, change for your, see ifconfig
  device.play(MEDIA_URL, function (err) {
    if (!err) console.log('Playing in chromecast')
    else console.log('error playing')
  })
})
