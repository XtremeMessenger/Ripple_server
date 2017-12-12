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
    key: fs.readFileSync(env.SSL_KEY_PATH),
    cert: fs.readFileSync(env.SSL_CERT_PATH),
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
app.get('/download/*', function(req, res){
    // res.set("Content-Disposition", `attachment;filename=${req.body.fileName}`);
    
    console.log('endpoint download in server.js reached ', req.originalUrl)
    // var file = `./downloads/${req.body.fileName}`;

    // console.log('this is that file garbage ',file)
    // console.log(fs.readFileSync(file))
    // res.download(file); // Set disposition and send it.
    // console.log('yolo op swag 420 server.js /download yo ',file)
    let file = './downloads/'+req.originalUrl.slice(10, req.originalUrl.length)
    res.download(file);

   
});
app.use('/main', router);


app.get('*', (req, res) => {
    res.send('wildcard endpoint ====== ');
})

const server = https.createServer(options, app)
app.listen(3000, function () {
    console.log('listenong to port ', 3000)
})
//const server = https.createServer(options, app)


server.listen(3100, function () {
    console.log("Express server listening on port " + port);
});

