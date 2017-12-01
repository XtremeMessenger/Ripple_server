const db = require('./db.js')

module.exports = {

  signup: {
    post: function (data, callback) {
      db.Usors.create({
        usorname: data.username,
        password: data.firebase_id,
        email: data.email,
        first: data.first,
        last: data.last,
        quote: data.quote,
        icon: data.icon
      }).then(user => {
        //console.log('new user', user)
        console.log('data.firebase_id', data.firebase_id)
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
        where: { password: data.firebase_id }
      }).then(user => {
        console.log('found user', user)
        callback(undefined, user);
      }).catch(function (err) {
        console.log('DB login error ====== ', err);
        callback(err);
        
      })
    }
  },

  addUser: {
    post: function (data, callback) {
      db.Usors.findOne({
        where: {
          usorname: data.username
        }
      }).then(user =>{
        db.Friends.create({
          ogUsor: data.requestee,   // your username
          friend: data.username     //  the friend you want
        })
        callback(err, 'success');
      }).catch(function (err){
        callback(err)
      })
    }
  }
}