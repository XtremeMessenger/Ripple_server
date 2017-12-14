const express = require('express');
const s3models = require('./s3models.js')

const https = require('https');
const http = require('http');
const SocketIo = require('socket.io');
const env = require('../config/env.js');

const fs = require('fs');
let siofu = require('socketio-file-upload');

var app = express();

app.use(siofu.router)
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  // res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  next();
});

const server = http.createServer(app);
const io = SocketIo(server);
var os = require('os');

// lol yolo
io.set('origins', '*:*');
// io.on('connection', (socket) => {

// })

const port = process.env.PORT || env.SOCKET_WEBRTC_PORT;
server.listen(port, () => console.log(`socket server listening on port ${port}`));
require('../node_modules/rtcmulticonnection-v3/Signaling-Server.js')(server);