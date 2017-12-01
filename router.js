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
  console.log('got login request', req.query);
  models.login.post(req.query, function (err, dataObj) {
    if (err || dataObj===null) {
      console.log('err ========= ', err);
    }
    console.log('dataObj ========= ', dataObj);
    res.send(dataObj);
  })
})

module.exports = router