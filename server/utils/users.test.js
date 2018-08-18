const expect = require('expect');
const {User} = require('./users');


var users;
beforeEach(() => {
    users = new User();
    users.users = [{
      id : '1',
      name: 'Luffy',
      room: 'Node course'
    },{
      id : '2',
      name: 'Chopper',
      room: 'React course'
    },{
      id : '3',
      name: 'Nami',
      room: 'Node course'
    }]
});

describe('Users', () => {
  it('should add user in users object',() =>{
    var arraylength = users.users.length;
    var id= 21, name ='puneet', room = 'seq';
    users.addUser(id,name, room);
    expect(users.users.length).toBe(arraylength+1);
    expect(users.users[arraylength]).toMatchObject({id,name});
  });

  it('should get a user by id',() => {
    var res = users.getUser('1');
    expect(res.id).toBe('1');
    // expect(res).toMatchObject(users[0]);
  });

  it('should not get a user with wrong id',() => {
    var res = users.getUser('4');
    expect(res).toBeFalsy();
  });
  it('should remove user by id',() => {
    var res = users.removeUser('1');
    expect(res.id).toBe('1');
    expect(users.users.length).toBe(2);
  });
  it('should not remove user by wrong id',() => {
    var res = users.removeUser('4');
    expect(res).toBeFalsy();
    expect(users.users.length).toBe(3);
  });
  it('should return a room users list',() => {
    var res = users.getUsersByRoom('Node course');
    expect(res.length).toBe(2);
    // expect(res).to(2);
  });
});
