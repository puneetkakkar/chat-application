const express = require('express');
const socketIO= require('socket.io');
const path = require('path');
const http = require('http');

// http.createServer, path, http,
// socketIO(server)-> io,
// io.on(socket), io.emit(),
// socket.on(), socket.emit(), socket.broadcast.emit()
const {generateMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '/../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

io.on('connection', (socket) => {

  console.log('New user connected');

  socket.emit('newMessage',generateMessage('Admin', 'Welcome to chat app'));
  socket.broadcast.emit('newMessage',generateMessage('Admin', 'New User joined'))
  socket.on('createMessage',(message) => {
    console.log('create message', message);
    io.emit('newMessage',generateMessage(message.from, message.text));
    // socket.broadcast.emit('newMessage', {
    //   from: message.from,
    //   text: message.text
    //   createdAt: new Date().getTime()
    // });
  });
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});


app.use(express.static(publicPath));
server.listen(port, () => {
  console.log(`server is up at port:${port}`);
});
