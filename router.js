// const mongoose = require('mongoose');
// const bluebird = require('bluebird');
const router = require('express').Router()
const models = require('./models.js')

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

router.route('/addFriend').post(function (req, res) {
  //console.log('got friend request', req.body);
 models.addUser.post(req.body, function(err, dataObj){
  if (err) {
    console.log('err ========= ', err);
  }
  res.send(dataObj)
  //console.log('addfriend models dataObj ', dataObj);
 })
})

router.route('/privateChatStore').post(function (req, res) {
  //console.log('got friend request', req.body);
 models.privateChatStore.post(req.body, function(err, dataObj){
  if (err) {
    console.log('err ========= ', err);
  }
  //console.log('addfriend models dataObj ', dataObj);
  res.send(dataObj);
 })
})

router.route('/getRoomChatHistory').post(function (req, res) {
  //console.log('got friend request', req.body);
 models.getRoomChatHistory.post(req.body, function(err, dataObj){
  if (err) {
    console.log('err ========= ', err);
  }
  //console.log('addfriend models dataObj ', dataObj);
  res.send(dataObj);
 })
})


router.route('/getRooms').post(function (req, res){
  models.getRooms.post(req.body, function(err, dataObj){
    //console.log('this is req.body ' , req.body)
    if(err) {
      console.log('err ========= ', err)
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
// router.route('/getPrivateChatHistoryFrom').post(function (req, res) {
//   console.log('getPrivateChatHistoryFrom ====', req.body);
//   let totalMessages = [];

//   models.getPrivateChatHistoryFrom.post(req.body, (err, dataObj) =>{
//   if (err) {
//     console.log('err ========= ', err);
//   }
  
//   for(let i = 0; i < dataObj.length;i++){

//     totalMessages.push(dataObj[i].dataValues)
//   }
//   console.log('hey youfuk face you better worl ***** ..l.. ', totalMessages)
//   res.send({messages: [totalMessages]});
// })
  

 
// })

// router.route('/getPrivateChatHistoryTo').post(function (req, res) {
//   console.log('getPrivateChatHistoryTo0 ====', req.body);
//   let totalMessages = [];

//   models.getPrivateChatHistoryTo.post(req.body, (err, dataObj) =>{
  
//   if (err) {
//     console.log('err ========= ', err);
//   }
//   // console.log('dataObj' ,dataObj)
//     for(let i = 0; i < dataObj.length;i++){
//       totalMessages.push(dataObj[i].dataValues)
//     }
//   console.log('srgfjwrhfwrojhgwojgheojrghrjohgojrhgojhre ', totalMessages);
//   res.send({messages: [totalMessages]});
//  })

// })

router.route('/getPrivateChatHistory').post(function (req, res) {
  //console.log('getPrivateChatHistory ====', req.body);
  let totalMessages = [];

  models.getPrivateChatHistory.post(req.body, (err, dataObj) => {

    if (err) {
      console.log('err ========= ', err);
    }
    // console.log('dataObj' ,dataObj)
    for (let i = 0; i < dataObj.length; i++) {
      totalMessages.push(dataObj[i].dataValues)
    }
    // console.log('totalMessages ', totalMessages);
    res.send({ messages: [totalMessages] });
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

module.exports = router