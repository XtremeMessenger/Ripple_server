const express = require('express');

const https = require('https');
const http = require('http');
const SocketIo = require('socket.io');
const env = require('../config/env.js');

const fs = require('fs');
let siofu = require('socketio-file-upload');

var app = express();

app.use(siofu.router)
app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
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
io.on('connection', (socket) => {
  let uploader = new siofu();
  uploader.fir = '/path/to/save/uploads';
  uploader.listen(socket);
  socket.on('private', body => {
    console.log('this is private channel ', body)
    socket.broadcast.emit('private', {
      text: body[1],
      from: body[0]
    })
  })

  socket.on('message', function(message) {
    console.log('Client said: ', message);
    // for a real app, would be room-only (not broadcast)
    socket.broadcast.emit('message', message);
  });



  socket.on('create or join', function(room) {
    console.log('Received request to create or join room ' + room);
    var clientsInRoom = io.nsps['/'].adapter.rooms[room];    // socket.io 1.4.8
    var numClients = clientsInRoom === undefined ? 0 : Object.keys(clientsInRoom.sockets).length;
    
    // max two clients
    if (numClients === 2) {
      socket.emit('full', room);
      return;
    }
    
    console.log('Room ' + room + ' now has ' + (numClients + 1) + ' client(s)');
    
    if (numClients === 0) {
      socket.join(room);
      console.log('Client ID ' + socket.id + ' created room ' + room);
      socket.emit('created', room, socket.id);
    
    } else {
      console.log('Client ID ' + socket.id + ' joined room ' + room);
      io.sockets.in(room).emit('join', room);
      socket.join(room);
      socket.emit('joined', room, socket.id);
      io.sockets.in(room).emit('ready');
    }
    
  });


  socket.on('ipaddr', function() {
    var ifaces = os.networkInterfaces();
    for (var dev in ifaces) {
      ifaces[dev].forEach(function(details) {
        if (details.family === 'IPv4' && details.address !== '127.0.0.1') {
          socket.emit('ipaddr', details.address);
        }
      });
    }
  });


  socket.on('bye', function(){
    console.log('received bye');
  });


});

const port = process.env.PORT || env.SOCKET_SERVER_PORT;
server.listen(port, () => console.log(`socket server listening on port ${port}`));
