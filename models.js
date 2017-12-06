const db = require('./db.js')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

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
      console.log('this is addRoom === ', data)
      db.Rooms.findOne({
        where: {
          roomname: data.roomname
        }
      })
      .then(room=>{
        


        console.log('room', room)
        if (data.roomname === room.roomname){   // ????
          callback(undefined, 'Room Exists');
        } else {
          db.Rooms.create({
            roomname: data.roomname,
            resident: data.username
          }
        )
          callback(undefined, 'success');
        }
       
      }).catch(function (err){
        callback(err)
      })
    }
  },

  getPrivateChatHistory: {
    post: function (data, callback) {
      db.Messages.findAll({
        where: {
        [Sequelize.Op.or]: [{
          from: data.from,
          to: data.to
        },
        {
          from: data.to,
          to: data.from
        }]
        },
        limit: 1000
      }).then(messages => {
        callback(undefined, messages);
      }).catch(function (err) {
        console.log('DB getPrivateChatHistory error ====== ', err);
        callback(err);
      })
    }
  }, 

  getRooms: {
    post: function(data, callback) {
      // console.log('this is getRoom === ',data)
      db.Rooms.findAll({
        where: {
          resident: data.resident
        }
      }).then(userRooms => {
          callback(undefined, userRooms)
      }).catch(function (err) {
        callback(err)
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