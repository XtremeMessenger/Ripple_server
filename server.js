const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const router = require('./router.js');
const cors = require('cors');
const corsOptions = {
    //     header: 'www.jayop.com:3000',
    origin: 'www.jayop.com',
    optionsSuccessStatus: 200
}
//const corsOptions = { origin: true, optionsSuccessStatus: 200 }
const port = process.env.PORT || 3000;
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

app.listen(port, function () {
    console.log('listenong to port ', port)
})


