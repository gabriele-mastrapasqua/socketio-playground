import { Request, Response, Application, application } from 'express';
import express = require('express');
import { createServer } from "http";
import { Server } from "socket.io";

const SOCKETIO_PORT = 3000

const app: Application = express();
const httpServer = createServer(app);
const io = new Server(httpServer);


// HTTP web server
httpServer.listen(3000, () => {
    console.log('listening on *:3000');
});
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

const getUserIdFromSocket = () => {
  const clients = io.sockets.adapter.rooms;
  return Array.from(clients.keys())
}

// Socket.io
io.on("connection", (socket) => {
  let users = getUserIdFromSocket()

  console.log('socketio on connection', socket.id, users)
  socket.emit('whoami', socket.id)
  
  // emit all users connected to all sockets
  io.emit('user connected', users)
  console.log('users connected: ', users)
  
  
  socket.on('disconnect', () => {
    let users = getUserIdFromSocket()
    console.log('user disconnected', socket.id, 'users', users);
    io.emit('user disconnected', users)
  });

  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
    io.emit('chat message', msg);

  });

  

});


setInterval(() => {
  //socket.emit('random', Math.floor(Math.random() * 1000) )
  io.emit('random', Math.floor(Math.random() * 1000) )
}, 2_000)

