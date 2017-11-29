const db = require('./db.js')
const mysql = require('mysql')

module.exports = {

  signup: {
    post: function (data, callback) {
      db.Usors.create({
        usorname: data.username,
        password: data.password,
        email: data.email,
        first: data.first,
        last: data.last,
        quote: data.quote,
        icon: data.icon
      }).then(user => {
        callback(undefined,data);
      }).catch(function(err) {
        callback(err);
        console.log('DB signup error ====== ', err);
      })
    }
  },

  login: {
    get: function (data, callback) {
      db.Usors.findOne({
        where: { usorname: data.username }
      }).then(user => {
        callback(undefined, user);
      }).catch(function (err) {
        callback(err);
        console.log('DB signup error ====== ', err);
      })
    }
  },
}