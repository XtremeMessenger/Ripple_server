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
        // console.log('userObjToSend[0].dataValues', userObjToSend[0].dataValues)
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
        // console.log('userObjToSend[0].dataValues', userObjToSend[0].dataValues)
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
        // console.log('uuuuuuuuussooooooooor rooms ', userRooms)
        let roomArray = [];
        userRooms.forEach(function (room) {
          // console.log('room.dataValues ===  ', room.dataValues)
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
                // console.log('his rooms are ', room.dataValues)
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

  getDirectRoomID: {
    post: function (data, callback) {
      db.DirectRoomTable.findOne({
        where: {
          username: data.username,
          friendname: data.friendname,
        }
      }).then(findRoomResult => {
        // console.log('get directroomID result', findRoomResult.dataValues)
        callback(undefined, findRoomResult.dataValues)
      }).catch(function (err) {
        callback(err)
      })
    }
  },

  addFriend: {
    post: function (data, callback) {
      console.log(' requested user', data.requested)
      console.log(' models data ',data.requestee.username)
      db.Usors.findOne({
        where: { username: data.requested }
      }).then(user => {
        
        if (user !== null) {
          console.log('use found in user table', user)
          db.Friends.findOne({
            where: {
              ogUsor: data.requestee.username,
              friend: data.requested
            }
          }).then((findFriendResult) => {
            // console.log('findFriendResult === ', findFriendResult)
            if (findFriendResult === null) {
              // if friend is not in the list, create one
              db.Friends.create({
                ogUsor: data.requestee.username,   // your username
                friend: data.requested   //  the friend you want
              }).then((friendAddedResult) => {

                // check if friend added me already
                db.DirectRoomTable.findOne({
                  where: {
                    friendname: data.requestee.username,
                    username: data.requested
                  }
                }).then((result) => {
                  console.log('friend added me results ', result)
                  // if nobody added, create new message table and add table to each other
                  if (result === null) {
                    db.DirectRooms.create({
                      createdby: data.requestee.username,
                      friendname: data.requested
                    }).then((createdRoomResult) => {
                      console.log('created createdRoomResult', createdRoomResult.dataValues)
                      db.DirectRoomTable.create({
                        username: data.requestee.username,
                        friendname: data.requested,
                        room_id: createdRoomResult.dataValues.roomID
                      })
                      db.DirectRoomTable.create({
                        username: data.requested,
                        friendname: data.requestee.username,
                        room_id: createdRoomResult.dataValues.roomID
                      })
                    })
                  }
                })

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

            } else {
              console.log('user already in friend list')
              callback(undefined, 'user already in friend list')
            }
          })
        } else {
          console.log('user not found')
          callback(undefined, 'user not found')
        }
        

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
      // S3.getObject(params).createReadStream().pipe(file)
      file.on('close', ()=>{
        callback(undefined, 'success')
      })
      S3.getObject(params).createReadStream().pipe(file);

      //callback(undefined, 'success')
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

}