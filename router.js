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
 models.privateChatStore.post(req.body, function(err, dataObj){
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
  console.log('getPrivateChatHistory ====', req.body);
  let totalMessages = [];

  models.getPrivateChatHistoryFrom.post(req.body, (err, dataObj) =>{
  if (err) {
    console.log('err ========= ', err);
  }
  console.log('dataObj' ,dataObj)
  // for(let i = 0; i < dataObj.history.from.length;i++){
  //   console.log('get room chat history, dataobj dataobj dataobj ===',dataobj)
  //   totalMessages.push(dataObj.history.from[i])
  // }
 })
  models.getPrivateChatHistoryTo.post(req.body, (err, dataObj) =>{
  
  if (err) {
    console.log('err ========= ', err);
  }
  console.log('dataObj' ,dataObj)
    // for(let i = 0; i < dataObj.history.to.length;i++){
    //   totalMessages.push(dataObj.history.to)
    // }
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