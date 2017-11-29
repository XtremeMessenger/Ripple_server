const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const router = require('./router.js')


const port = 3000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.resolve(__dirname, '../client')));


app.use('/home', router);

app.listen(port, function(){
    console.log('listenong to port ', port)
})

