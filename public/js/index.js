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
  li.append(message.from + ': ');
  li.append(a);
  jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();
  var messageTextbox = jQuery('[name=message]');
  socket.emit('createMessage',{
    from: 'User',
    text: messageTextbox.val()
  }, function () {
    messageTextbox.val('');
  });
})

var locationButton = jQuery('#send-location');
locationButton.on('click', function () {
  if (!navigator.geolocation) {
    return alert('your browser don\'t support location service');
  }
  locationButton.attr('disabled', 'disabled').text('Sending location...');
  navigator.geolocation.getCurrentPosition(function (position) {
    locationButton.removeAttr('disabled').text('Send location');
    socket.emit('createLocationMessage',{
      from: 'Admin',
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  },function () {
    locationButton.removeAttr('disabled').text('Send location');
    alert('Unable to fetch location');
  });
});
