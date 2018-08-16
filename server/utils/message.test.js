const expect = require('expect');

const {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () =>{
  it('should  generate message object.',() => {
    var from = 'tester', text= 'some message';
    var result = generateMessage(from, text);

    expect(typeof result.createdAt).toBe('number');
    expect(result).toMatchObject({from, text});
  });
});

describe('generateLocationMessage', () =>{
  it('should  generate Location message object.',() => {
    var from = 'tester', lat= 10.50, lon = 11.00;
    var result = generateLocationMessage(from, lat, lon);

    expect(result.from).toBe(from);
    expect(result.url).toBe(`https://www.google.com/maps?q=${lat},${lon}`);
  });
});
