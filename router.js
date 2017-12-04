const router = require('express').Router()
const models = require('./models.js')

router.route('/signup').post(function (req, res) {
  console.log('got signup request', req.body);
  models.signup.post(req.body, function (err, dataObj) {
    if (err) {
      console.log('err ========= ', err);
    }
    console.log('dataObj ========= ', dataObj);
    res.send(dataObj);
  })
})

router.route('/login').post(function (req, res) {
  console.log('got login request', req.body);
  models.login.post(req.body, function (err, dataObj) {
    if (err) {
      console.log('err ========= ', err);
    }
    console.log('dataObj ========= ', dataObj);
    res.send(dataObj);
  })
})

router.route('/addFriend').post(function (req, res) {
  console.log('got friend request', req.body);
 models.addUser.post(req.body, function(err, dataObj){
  if (err) {
    console.log('err ========= ', err);
  }
  res.send(dataObj)
  console.log('addfriend models dataObj ', dataObj);
 })
})

router.route('/privateChatStore').post(function (req, res) {
  console.log('got friend request', req.body);
 models.getPrivateChatHistory.post(req.body, function(err, dataObj){
  if (err) {
    console.log('err ========= ', err);
  }
  console.log('addfriend models dataObj ', dataObj);
  res.send(dataObj);
 })
})

router.route('/getRoomChatHistory').post(function (req, res) {
  console.log('got friend request', req.body);
 models.getRoomChatHistory.post(req.body, function(err, dataObj){
  if (err) {
    console.log('err ========= ', err);
  }
  console.log('addfriend models dataObj ', dataObj);
  res.send(dataObj);
 })
})

router.route('/getPrivateChatHistory').post(function (req, res) {
  console.log('got friend request', req.body);
  let totalMessages = [];

 models.getRoomChatHistoryFrom.post(req.body, (err, dataObj) =>{
  if (err) {
    console.log('err ========= ', err);
  }
  for(let i = 0; i < dataObj.history.messages;i++){
    totalMessages.push(dataObj.history.messages[i])
  }
 })
 models.getRoomChatHistoryTo.post(req.body, (err, dataObj) =>{
  if (err) {
    console.log('err ========= ', err);
    for(let i = 0; i < dataObj.history.messages;i++){
      totalMessages.push(dataObj.history.messages[i])
    }
  }
  console.log('addfriend models dataObj ', totalMessages);
  
 })

 res.send({messages: [totalMessages]});
})




router.route('/getFriends').post(function (req, res) {
  console.log('get friends request', req.body);
 models.getFriends.post(req.body, function(err, dataObj){
  if (err) {
    console.log('err ========= ', err);
  }
  res.send(dataObj)
  console.log('getFriends models dataObj ', dataObj);
 })
})

module.exports = router