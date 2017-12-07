const express = require('express');
const http = require('http');
const SocketIo = require('socket.io');
const env = require('../config/env.js')
const server = http.createServer();
const io = SocketIo(server);
var os = require('os');


io.on('connection', (socket) => {
  socket.on('message2', body => {
    console.log('this is body =============== ', body)
    socket.broadcast.emit('message2', {
      body: body[1],
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