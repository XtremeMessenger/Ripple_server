import http from 'http';
import SocketIo from 'socket.io';
import { each } from 'lodash'; //?

import clientEvents from './clientEvents';

const server = http.createServer();
const io = SocketIo(server);

io.on('connection', (client) => {
  log('client connected');
  // do something on client
});

const port = process.env.PORT || 3500;
server.listen(port, () => log(`socket server listening on port ${port}`));