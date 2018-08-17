const moment = require('moment');

var date = moment(1234);

console.log(date.format('DD/MMM/YYYY'));
console.log(date.format('h:MM a'));
// date.add(5,'hour');
// console.log(date.format('H:MM a'));
