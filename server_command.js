const usordata = require('./userdata.json');
const mysql = require('mysql');
const db = require('./db.js');

db.Usors.findAll().then(entry => {
  console.log('Allentry === ', entry)
})