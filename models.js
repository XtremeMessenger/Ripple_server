const db = require('./db.js')

module.exports = {

  signup: {
    post: function (data, callback) {
      db.Usors.create({
        username: data.username,
        key: data.firebase_id,
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
        where: { key: data.firebase_id }
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
      console.log(' requested user', data.requested)
      console.log(' models data ',data.requestee.username)
      db.Usors.findOne({
        where: {
          username: data.username
        }
      })
      .then(user =>{
        db.Friends.create({
          ogUsor: data.requestee.username,   // your username
          friend: data.requested   //  the friend you want
        })
        callback(undefined, 'success');
      }).catch(function (err){
        callback(err)
      })
    }
  },

  addRoom: {
    post: function (data, callback) {

      db.Rooms.findOne({
        where: {
          name: roomname
        }
      })
      .then(room=>{
        if(room.name === ''){   // ????
          callback(undefined, 'fail');
        } else {
          db.Room.create({
            name: data.roomname,
            resident: data.username
          })
          callback(undefined, 'success');
        }
       
      }).catch(function (err){
        callback(err)
      })
    }
  },

  getPrivateChatHistory: {
    post: function(data, callback) {
      let history = {};
      db.Messages.findAll({
        where: {
          from: data.from,
          to: data.to
        }
      }).then(message => {
        history['messages'].push(message);
        callback(undefined, history);
      }).catch(function (err) {
        console.log('DB login error ====== ', err);
        callback(err);
      })
    }
  },

  getPrivateChatHistoryFrom: {
    post: function(data, callback) {
     
      db.Messages.findAll({
        where: {
          from: data.from,
          to: data.to
        }
      }).then(messages => {


        callback(undefined, messages);
      }).catch(function (err) {
        console.log('DB login error ====== ', err);
        callback(err);
      })
    }

  }, 
  getRooms: {
    post: function(data, callback) {
      db.Rooms.findAll({
        where: {
          resident: data.username
        }
      }).then(userRooms => {
          callback(undefined, userRooms)
      }).catch(function (err) {
        callback(err)
      })
    }
  },
  getPrivateChatHistoryTo: {
    
    post: function(data, callback) {
      console.log('getRoomChatHistoryTo post invoked' , data )

      db.Messages.findAll({
        where: {
          from: data.to,
          to: data.from
        }
      }).then(messages => {


        callback(undefined, messages);
      }).catch(function (err) {
        console.log('DB login error ====== ', err);
        callback(err);
      })
    }

  },

  privateChatStore: {
    post: function(data, callback) {
      db.Messages.create({
            from: data.from,
            to: data.to,
            text: data.text  
      }).then(()=> {
        callback(undefined, 'success');
      }).catch(function (err) {
        console.log('DB login error ====== ', err);
        callback(err);
        })
    }
    
  },

  getFriends: {
    post: function (data, callback) {
      //console.log(' show friends for ', data.user.username)
      db.Friends.findAll({
        where: {
          ogUsor: data.user.username
        }
      }).then(function(friends){
        var friendsArr = [];
        friends.forEach(function(friend){
          console.log('his friends are ', friend.dataValues.friend)  
          friendsArr.push(friend.dataValues.friend)        
        })
        callback(undefined, friendsArr);
      }).catch(function(err){
        callback(err)
      })
    }

  }
}