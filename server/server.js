const express = require('express');
const socketIO= require('socket.io');
const path = require('path');
const http = require('http');

// http.createServer, path, http,
// socketIO(server)-> io,
// io.on(socket), io.emit(),
// socket.on(), socket.emit(), socket.broadcast.emit()
const {generateMessage, generateLocationMessage} = require('./utils/message');
var {isRealString} = require('./utils/validator.js');
var {Users} = require('./utils/users.js');
const publicPath = path.join(__dirname, '/../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.on('join', (params, callback) => {
    if(!isRealString(params.name) && !isRealString(params.room)){
      return callback('fill the form first.');
    }else {

      socket.join(params.room);
      users.removeUser(socket.id);
      users.addUser(socket.id,params.name, params.room);
      io.to(params.room).emit('updateUsersList', users.getUsersByRoom(params.room));
      socket.emit('newMessage',generateMessage('Admin', 'Welcome to chat app'));
      socket.broadcast.to(params.room).emit('newMessage',generateMessage('Admin', `${params.name} joined the room.`))

      callback();
    }
  });
  socket.on('createMessage',(message,callback) => {
    // console.log('create message', message);
    io.emit('newMessage',generateMessage(message.from, message.text));
    // socket.broadcast.emit('newMessage', {
    //   from: message.from,
    //   text: message.text
    //   createdAt: new Date().getTime()
    // });
    callback();
  });
  socket.on('createLocationMessage',(message) => {
    // console.log(message);
    io.emit('newLocationMessage',generateLocationMessage(message.from, message.latitude, message.longitude));
  });
  socket.on('disconnect', () => {
    console.log('user disconnected');
    var user = users.removeUser(socket.id);
    if(user){
      io.to(user.room).emit('updateUsersList', users.getUsersByRoom(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} left the room.`));

    }
  });
});


app.use(express.static(publicPath));
server.listen(port, () => {
  console.log(`server is up at port:${port}`);
});
