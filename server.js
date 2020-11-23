const express = require('express');
const ffmpeg = require('fluent-ffmpeg')

const app = express()
const port = 8080

var getCommand = () => {
    let newCommand = ffmpeg()
    newCommand.input("default")
    newCommand.inputFormat("pulse")
    newCommand.outputFormat("wav")
        .on('codecData', function (data) {
            console.log('Input is ' + data.audio + ' audio ');
        })
        .on('start', commandLine => {
            console.log('Spawned Ffmpeg with command: ' + commandLine);
        })
        .on('error', (err, one, two) => {
            console.log(two);
        })
        .on('end', () => {
            console.log("end");
        });

    return newCommand;
}


app.get('/', (req, res) => {
    console.log('Got request')
    var command = getCommand()
    //Output of which ffmpeg
    command.setFfmpegPath("/usr/bin/ffmpeg")

    var ffstream = command.pipe()
    ffstream.on('data', (data) => {
        res.write(data)
    })
})
process.send("Server running")
app.listen(port)
