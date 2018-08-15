// io()
// socket.on, socket.emit

var socket = io();
socket.on('connect', function () {
  console.log('connected to server');
});

socket.on('disconnect', function () {
  console.log('disconnected to server');
});

socket.on('newMessage',function (message) {
  console.log('New Message', message);
});
