const http = require('http');
const getRouter = require('./route.js');

var app = require('express')();

const bodyParser = require('body-parser');//用于处理表单数据

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var session = require('express-session');
var FileStore = require('session-file-store')(session);

app.use(session({
    resave: false,
    saveUninitialized: false,
    store: new FileStore(),
    secret: 'hehe',
    cookie:{
        maxAge: 3000000
    }
}));

app.use('/sign', getRouter());

app.use(function (req, res) {
    const options = {
        hostname: 'localhost',
        port: 8081,
        path: req.path,
        method: req.method 
    };

    const req = http.request(options, (res) => {
        console.log(`STATUS: ${res.statusCode}`);
        console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
        res.setEncoding('utf8');
        res.on('data', (chunk) => {
            console.log(`BODY: ${chunk}`);
        });
        res.on('end', () => {
            console.log('No more data in response.');
        });
    });

    req.on('error', (e) => {
        console.error(`problem with request: ${e.message}`);
    });

    req.end();
});

const server = app.listen(8081, function () {
    console.log('the server start working!');
});
