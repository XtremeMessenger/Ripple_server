const usordata = require('./userdata.json');
const mysql = require('mysql');
const db = require('../db.js');

db.usors.destroy({
  where: {},
  truncate: true
});


usordata.map(user => {
  db.Usors.create({
    username: user.username,
    key: user.key,
    email: user.email,
    first: user.first,
    last: user.last,
    quote: user.quote,
    icon: user.icon
  })
});



db.Rooms.create({
  name: "room1",
  password: "room1"
})

db.Rooms.create({
  name: "room2",
  password: "room2"
})

db.Usors.findAll().then(entry => {
  console.log('entry === ', entry)
})

db.Rooms.findAll().then(entry => {
  console.log('entry === ', entry)
})