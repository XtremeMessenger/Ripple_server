const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const router = require('./router.js');
const cors = require('cors');
const corsOptions = {
    origin: 'http://jayop.com',
    optionsSuccessStatus: 200
}

const port = 3000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.resolve(__dirname, '../Ripple_client/public')));
app.use(cors(corsOptions));
app.use('/main', router);
app.get('/*', function (req, res) {
    console.log(req.body);
    res.send('wildcard endpoint ==== ')
})

app.listen(port, function(){
    console.log('listenong to port ', port)
})

