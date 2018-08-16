// io()
// socket.on, socket.emit
// ack -> .emit(,,fun())
var socket = io();
socket.on('connect', function () {
  console.log('connected to server');
});

socket.on('disconnect', function () {
  console.log('disconnected to server');
});

socket.on('newMessage',function (message) {
  console.log('New Message', message);
  var li = jQuery('<li></li>');
  li.text(`${message.from}: ${message.text}`);
  jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function (message) {
  var li = jQuery('<li></li>');
  var a = jQuery('<a target=\'_blank\'>My Current Location</a>')
  a.attr('href',message.url);
  li.append(message.from + ':');
  li.append(a);
  jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();

  socket.emit('createMessage',{
    from: 'User',
    text: jQuery('[name=message]').val()
  }, function () {

  });
})

var locationButton = jQuery('#location-button');
var coords = {
  latitude: 0,
  longitude: 0
};
locationButton.on('click', function () {
  if (!navigator.geolocation) {
    return alert('your browser don\'t support location service');
  }

  navigator.geolocation.getCurrentPosition(function (position) {
    socket.emit('createLocationMessage',{
      from: 'Admin',
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  },function () {
    alert('Unable to fetch location');
  });

});
