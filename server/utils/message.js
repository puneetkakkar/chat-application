var generateMessage = (from, text) => {
  return {
    from,
    text,
    createdAt: new Date().getTime()
  };
};
var generateLocationMessage = (from, lat, lon) => {
  return {
    from,
    url: `https://www.google.com/maps?q=${lat},${lon}`
  }
};
module.exports = {generateMessage, generateLocationMessage};
