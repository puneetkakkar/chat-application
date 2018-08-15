const expect = require('expect');

const {generateMessage} = require('./message');

describe('generateMessage', () =>{
  it('should  generate message object.',() => {
    var from = 'tester', text= 'some message';
    var result = generateMessage(from, text);

    expect(typeof result.createdAt).toBe('number');
    expect(result).toMatchObject({from, text});
  });
});
