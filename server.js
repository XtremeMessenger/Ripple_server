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
app.use('/download', function(req, res){
    res.set("Content-Disposition", "attachment;filename=XtremeMessenger.png");
    
    // console.log('endpoint download in server.js reached')
    // var file = './downloads/index.html';
    // res.download(file); // Set disposition and send it.

    // console.log(req);

   
        var file = __dirname + '/downloads/XtremeMessenger.png';
        res.download(file);
        res.send('')

  

    // res.download(__dirname + '/downloads/index.html', 'index.html', function(err){
    //     if (err) {
    //         console.log(err);
    //     } 
    //     else {
    //         console.log("File send without errors!");
    //         next();
    //     }
    // });
   
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

