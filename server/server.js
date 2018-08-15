const express = require('express');
const socketIO= require('socket.io');
const path = require('path');
const http = require('http');


const port = process.env.PORT || 3000;
var app = express();
var publicPath = path.join(__dirname, '/../public');

var server = http.createServer(app);
var io = socketIO(server);

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.emit('NewMessage',{
    text: 'hello buddy call me',
    to: 'ajay',
  });
  socket.on('createMessage',(message) => {
    console.log('create message', message);
  });
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});


app.use(express.static(publicPath));
server.listen(port, () => {
  console.log(`server is up at port:${port}`);
});
