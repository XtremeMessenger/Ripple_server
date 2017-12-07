const express = require('express');
const path = require('path');
const fs = require('fs')
const http = require('http');
const https = require('https');
const bodyParser = require('body-parser');
const router = require('./router.js');
const cors = require('cors');
const env = require('./config/env.js')
const corsOptions = {
    //     header: 'www.jayop.com:3000',
    //origin: 'www.jayop.com',
    origin: env.SERVER_HOST,
    optionsSuccessStatus: 200
}

var options = {
    key: fs.readFileSync("../ssl/privkey.pem"),
    cert: fs.readFileSync("../ssl/fullchain.pem"),
};

//const corsOptions = { origin: true, optionsSuccessStatus: 200 }
const port = process.env.PORT || env.SERVER_PORT;
const app = express();

app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, '../Ripple_client/public')));
//app.use(cors(corsOptions));
app.use(cors({
    allowedHeaders: 'Content-Type,Authorization',
    methods: ['GET, POST, PUT, DELETE, OPTIONS'],
}));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use('/main', router);
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../Ripple_client/public/index.html'));
})

const server = https.createServer(options, app)
app.listen(3000, function () {
    console.log('listenong to port ', 3000)
})
//const server = https.createServer(options, app)


server.listen(3100, function () {
    console.log("Express server listening on port " + port);
});

