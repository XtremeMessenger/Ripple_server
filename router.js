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
  console.log('addfriend models dataObj ', dataObj);
 })
})

module.exports = router