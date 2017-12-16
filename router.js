// const mongoose = require('mongoose');
// const bluebird = require('bluebird');
const router = require('express').Router()
const models = require('./models.js')
const dynamoModels = require('./dynamoDB/dynamoModels.js')
const AWS = require('aws-sdk');
//let S3S = require('s3-streams');

// mongoose.Promise = bluebird;

router.route('/signup').post(function (req, res) {
  //console.log('got signup request', req.body);
  models.signup.post(req.body, function (err, dataObj) {
    if (err) {
      console.log('err ========= ', err);
    }
    //console.log('dataObj ========= ', dataObj);
    res.send(dataObj);
  })
})

router.route('/login').post(function (req, res) {
  //console.log('got login request', req.body);
  models.login.post(req.body, function (err, dataObj) {
    if (err) {
      console.log('err ========= ', err);
    }
    console.log('login dataObj to send back to client ========= ', dataObj);
    res.send(dataObj);
  })
})

router.route('/auth').post(function (req, res) {
  //console.log('got login request', req.body);
  models.login.post(req.body, function (err, dataObj) {
    if (err) {
      console.log('err ========= ', err);
    }
    console.log('login auth data.Obj ========= ', dataObj);
    res.send(dataObj);
  })
})

router.route('/findFriend').post(function (req, res) {
  //console.log('got friend request', req.body);
  models.findFriend.post(req.body, function(err, dataObj){
  if (err) {
    console.log('err ========= ', err);
  }
  res.send(dataObj)
  //console.log('addfriend models dataObj ', dataObj);
 })
})

router.route('/requestFriend').post(function (req, res) {
  //console.log('got friend request', req.body);
  models.requestFriend.post(req.body, function (err, dataObj) {
    if (err) {
      console.log('err ========= ', err);
    }
    res.send(dataObj)
    //console.log('requestfriend models dataObj ', dataObj);
  })
})

router.route('/getFriendRequests').post(function (req, res) {
  //console.log('got friend request', req.body);
  models.getFriendRequests.post(req.body, function (err, dataObj) {
    if (err) {
      console.log('err ========= ', err);
    }
    res.send(dataObj)
    //console.log('requestfriend models dataObj ', dataObj);
  })
})

router.route('/decideFriend').post(function (req, res) {
  //console.log('got friend request', req.body);
  models.decideFriend.post(req.body, function (err, dataObj) {
    if (err) {
      console.log('err ========= ', err);
    }
    res.send(dataObj)
    //console.log('requestfriend models dataObj ', dataObj);
  })
})

router.route('/privateSendFile').post(function (req, res) {
  //console.log('got friend request', req.body);
 models.privateSendFile.post(req.body, function(err, dataObj){
  if (err) {
    console.log('err ========= ', err);
  }
  res.send(dataObj);
 })
})

router.route('/getRoomChatHistory').post(function (req, res) {
  //console.log('got friend request', req.body);
 models.getRoomChatHistory.post(req.body, function(err, dataObj){
  if (err) {
    console.log('err ========= ', err);
  }
  res.send(dataObj);
 })
})

router.route('/addRoom').post(function (req, res){
  models.addRoom.post(req.body, function(err, dataObj){
    if(err) {
      console.log('err ========= ', err)
    }
    res.send(dataObj);
  })
})

router.route('/getFiles').post(function (req, res){
  models.getFiles.post(req.body, function(err, dataObj){
    if(err) {
      console.log('err ========= ', err)
    }
    res.send(dataObj);
  })
})

router.route('/getDirectRoomID').post(function (req, res) {
  models.getDirectRoomID.post(req.body, function (err, dataObj) {
    if (err) {
      console.log('err ========= ', err);
    }
    res.send(dataObj);
  })
})

router.route('/privateChatStore').post(function (req, res) {
  //console.log('got friend request', req.body);
  dynamoModels.privateChatStore.post(req.body, function (err, dataObj) {
    if (err) {
      console.log('err ========= ', err);
    }
    res.send(dataObj);
  })
})

router.route('/getPrivateChatHistory').post(function (req, res) {
  dynamoModels.getPrivateChatHistory.post(req.body, (err, dataObj) => {
    res.send(dataObj)
  })
})

router.route('/createDirectChat').post(function (req, res) {
  dynamoModels.createDirectChat.post(req.body, (err, dataObj) => {
    res.send(dataObj)
  })
})

router.route('/getRooms').post(function (req, res) {
  models.getRooms.post(req.body, function (err, dataObj) {
    //console.log('this is req.body ' , req.body)
    if (err) {
      console.log('err ========= ', err)
    }
    res.send(dataObj);
  })
})

router.route('/getFriends').post(function (req, res) {
  //console.log('get friends request', req.body);
 models.getFriends.post(req.body, function(err, dataObj){
  if (err) {
    console.log('err ========= ', err);
  }
  res.send(dataObj)
  //console.log('getFriends models dataObj ', dataObj);
 })
})

router.route('/downloadFile').post(function (req, res) {
  console.log('im here in download file router')
  models.downloadFile.post(req.body, function(err, dataObj){
    if(err) {
      console.log('blat suka')
    }
    console.log('no err here in download file router ', req.body)
    res.send(dataObj)
  })
  // var S3 = new AWS.S3();
  // var params = {Bucket: 'jayop', Key: req.body.fileName};
  // var file = require('fs').createWriteStream(`./downloads/${data.fileName}`);
  // S3.getObject(params).createReadStream().pipe(file);

})




module.exports = router

// var S3 = require('aws-sdk').S3,
// S3S = require('s3-streams');

// var download = S3S.ReadStream(new S3(), {
// Bucket: 'my-bucket',
// Key: 'my-key',
// // Any other AWS SDK options 
// });