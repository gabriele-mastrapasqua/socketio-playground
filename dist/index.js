"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var http_1 = require("http");
var socket_io_1 = require("socket.io");
var WEBSERVER_PORT = process.env.PORT || 3000;
var app = express();
var httpServer = (0, http_1.createServer)(app);
var io = new socket_io_1.Server(httpServer);
// HTTP web server
httpServer.listen(WEBSERVER_PORT, function () {
    console.log("listening on *:".concat(WEBSERVER_PORT));
});
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});
var getUserIdFromSocket = function () {
    var clients = io.sockets.adapter.rooms;
    return Array.from(clients.keys());
};
// Socket.io
io.on("connection", function (socket) {
    var users = getUserIdFromSocket();
    console.log('socketio on connection', socket.id, users);
    socket.emit('whoami', socket.id);
    // emit all users connected to all sockets
    io.emit('user connected', users);
    console.log('users connected: ', users);
    socket.on('disconnect', function () {
        var users = getUserIdFromSocket();
        console.log('user disconnected', socket.id, 'users', users);
        io.emit('user disconnected', users);
    });
    socket.on('chat message', function (msg) {
        console.log('message: ' + msg);
        io.emit('chat message', msg);
    });
});
setInterval(function () {
    //socket.emit('random', Math.floor(Math.random() * 1000) )
    io.emit('random', Math.floor(Math.random() * 1000));
}, 2000);
//# sourceMappingURL=index.js.map