var socket = io();

socket.on('connect', function () {
  console.log('connected to server');
});

socket.on('disconnect', function () {
  console.log('disconnected to server');
});

socket.on('NewMessage',function (message) {
  console.log('New Message', message);
});

socket.emit('createMessage', {
  text: 'i will call you',
  to: 'puneet'
});
