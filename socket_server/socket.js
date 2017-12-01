const express = require('express');
const http = require('http');
const SocketIo = require('socket.io');

const server = http.createServer();
const io = SocketIo(server);

io.on('connection', (socket) => {
  socket.on('message', body => {
    console.log('this is body =============== ', body)
    socket.broadcast.emit('message', {
      body: body[1],
      from: body[0]
    })
  })
});

const port = process.env.PORT || 3500;
server.listen(port, () => console.log(`socket server listening on port ${port}`));