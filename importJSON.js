const usordata = require('./userdata.json');
const mysql = require('mysql');
const db = require('./db.js');

db.Usors.destroy({
  where: {}
});

usordata.map(usor => {
  db.Usors.create({
    usorname: usor.usorname,
    password: usor.password,
    email: usor.email,
    first: usor.first,
    last: usor.last,
    quote: usor.quote,
    icon: usor.icon
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