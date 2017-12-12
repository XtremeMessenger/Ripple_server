const db = require('./db.js')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
// const firebase = require('firebase')
const authentication = require('./middleware/authentication.js')
var AWS = require('aws-sdk')
let S3S = require('s3-streams');

module.exports = {

  signup: {
    post: function (data, callback) {
      db.Usors.create({
        username: data.username,
        key: data.firebase_id,
        email: data.eml,
        first: data.first,
        last: data.last,
        quote: data.quote,
        icon: data.icon
      }).then(user => {
        //console.log('new user', user)
        //console.log('data.firebase_id', data.firebase_id)
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
        // console.log('found user[0].dataValues', user[0])
        let userData = user[0];
        let token = authentication.generateToken(userData.dataValues.username)
        userData.dataValues.key;
        userData.dataValues.token = token;
        let userObjToSend = [];
        userObjToSend.push(userData)
        console.log('userObjToSend[0].dataValues', userObjToSend[0].dataValues)
        callback(undefined, userObjToSend);
      }).catch(function (err) {
        console.log('DB login error ====== ', err);
        callback(err);
        
      })
    }
  },

  auth: {
    post: function (data, callback) {
      db.Usors.findAll({
        where: { key: data.firebase_id }
      }).then(user => {
        // console.log('found user[0].dataValues', user[0])
        let userData = user[0];
        let token = authentication.generateToken(userData.dataValues.username)
        userData.dataValues.key;
        userData.dataValues.token = null;
        let userObjToSend = [];
        userObjToSend.push(userData)
        console.log('userObjToSend[0].dataValues', userObjToSend[0].dataValues)
        callback(undefined, userObjToSend);
      }).catch(function (err) {
        console.log('DB login error ====== ', err);
        callback(err);

      })
    }
  },

  getRooms: {
    post: function (data, callback) {
      // console.log('this is getRoom === ',data)
      // console.log('data dot resident ', data.user.username)
      db.Rooms.findAll({
        // where: {
        //   resident: data.user.username
        // }
      }).then(userRooms => {
        console.log('uuuuuuuuussooooooooor rooms ', userRooms)
        let roomArray = [];
        userRooms.forEach(function (room) {
          console.log('room.dataValues ===  ', room.dataValues)
          roomArray.push(room.dataValues)
        })
        callback(undefined, roomArray)
      }).catch(function (err) {
        callback(err)
      })
    }
  },

  addRoom: {
    post: function (data, callback) {
      //console.log('this is addRoom === ', data)
      db.Rooms.findOne({
        where: {
          roomname: data.roomname
        }
      })
      .then(room => {
          db.Rooms.create({
            roomname: data.roomname,
            resident: data.resident
          }).then(() => {
            db.Rooms.findAll({
              where: {
                // ogUsor: data.requestee.username
              }
            }).then(function (rooms) {
              var roomsArr = [];
              rooms.forEach(function (room) {
                console.log('his rooms are ', room.dataValues)
                roomsArr.push(room.dataValues)
              })
              callback(undefined, roomsArr);
            }).catch(function (err) {
              callback(err)
            })
          })
        })
        .catch(function (err) {
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

  privateSendFile: {
    post: function (data, callback) {
      db.Uploads.create({
        from: data.from,
        to: data.to,
        fileName: data.fileName
      }).then(function(){
       
        callback(undefined, 'sucessfully stored file record');
      }).catch(function(err){
        callback(err)
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
        let friendsArr = [];
        friends.forEach(function(friend){
          //console.log('his friends are ', friend.dataValues.friend)  
          friendsArr.push(friend.dataValues.friend)        
        })
        callback(undefined, friendsArr);
      }).catch(function(err){
        callback(err)
      })
    }
  },

  addFriend: {
    post: function (data, callback) {
      //console.log(' requested user', data.requested)
      //console.log(' models data ',data.requestee.username)
      db.Usors.findOne({
        where: {
          username: data.username
        }
      })
      .then(user => {
          db.Friends.create({
            ogUsor: data.requestee.username,   // your username
            friend: data.requested   //  the friend you want
          }).then(() => {
            db.Friends.findAll({
              where: {
                ogUsor: data.requestee.username
              }
            }).then(function (friends) {
              var friendsArr = [];
              friends.forEach(function (friend) {
                console.log('his friends are ', friend.dataValues.friend)
                friendsArr.push(friend.dataValues.friend)
              })
              callback(undefined, friendsArr);
            }).catch(function (err) {
              callback(err)
            })
          })
        })
        .catch(function (err) {
          callback(err)
        })
    }
  },

  getFiles: {
    post: function (data, callback) {
      //console.log('this is data.user ', data.user)
      db.Uploads.findAll({
        where: 
        {
          to: data.user
        }
      }).then(function(uploads){
        let filesArray = [];
        console.log(' this is uploads ' , uploads)
        uploads.forEach(function(upload){
          filesArray.push(upload)
        })

        console.log('this is filesArray ', filesArray)

        callback(undefined, filesArray);
      }).catch(function(err){
        callback(err)
      })
    }
  } ,

  downloadFile: {
    post: function (data, callback) {
      console.log('this is that data.fileName stuff in download file @ router.js  ',data.fileName)
      var S3 = new AWS.S3();
      var params = {Bucket: 'jayop', Key: data.fileName};
      var file = require('fs').createWriteStream(`./downloads/${data.fileName}`);
      S3.getObject(params).createReadStream().pipe(file);

      callback(undefined, 'success')
    }
      
    }
  
}