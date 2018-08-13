const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '/../public');
const app = express();
var port = process.env.PORT || 3000;
var server = http.createServer(app);
var io = socketIO(server);

io.on('connection',(socket) => {
  console.log('New user is connected');

  socket.on('disconnect', () => {
    console.log('User disconnected from server');
  });
});

app.use(express.static(publicPath));

server.listen(port, () => {
  console.log(`server is up at port ${port}`);
});
