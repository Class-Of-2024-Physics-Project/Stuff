const fs = require('fs');
require('dotenv').config(); 
var http = require('http');
var index = fs.readFileSync('index.html');
var SerialPort = require("serialport");

const parsers = SerialPort.parsers;
const parser = new parsers.Readline({
    delimiter: '\r\n'
});

var port = new SerialPort(process.env.COM_PORT, {
    baudRate: parseInt(process.env.BAUD_RATE), 
    dataBits: 8,
    parity: 'none',
    stopBits: 1,
    flowControl: false
});

port.pipe(parser);

var app = http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(index);
});

var io = require('socket.io').listen(app);

io.on('connection', function (data) {
    console.log("NodeJS is listening!");
});

parser.on('data', function (data) {
    console.log(data);
    io.emit('data', data);
    logMovement(data); 
});

app.listen(3000);

function logMovement(data) {
    const timestamp = new Date().toISOString(); 
    const movementLog = `${timestamp}: ${data}\n`; 
    fs.appendFile('movements.txt', movementLog, (err) => {
        if (err) {
            console.error('Error logging movement:', err);
        } else {
            console.log('Movement logged successfully.');
        }
    });
}
