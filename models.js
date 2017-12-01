const db = require('./db.js')

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
    post: function (data, callback) {
      db.Usors.findAll({
        where: { firebase_id: data.firebase_id }
      }).then(user => {
        callback(undefined, user);
      }).catch(function (err) {
        console.log('DB login error ====== ', err);
        callback(err);
        
      })
    }
  },
}