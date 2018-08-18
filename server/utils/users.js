class Users {
  constructor () {
    this.users = [];
  }
  // addUser
  addUser(id, name, room) {
    var user = {id, name, room};
    this.users.push(user);
    return user;
  }
  // getUser
  getUser(id) {
    var user = this.users.filter((user) => {
      return user.id === id;
    });
    return user[0];
  }
  // removeUser
  removeUser(id) {
    var user = this.getUser(id);
    if (user) {
      this.users = this.users.filter((user) => {
        return user.id !== id;
      });
    }
    return user;
  }
  // getUsersByRoom
  getUsersByRoom(room) {
    var users = this.users.filter((user) => {
      return user.room === room;
    });
    var usersName = users.map((user) => {
      return user.name;
    });
    return usersName;
  }
}

module.exports = {Users};
