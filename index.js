const commander = require('commander');
const http = require('http');
const path = require('path');
const proxy = require('http-proxy').createProxyServer({});
const session = require('express-session');
const FileStore = require('session-file-store')(session);

var getRouter = require('./route.js');
var app = require('express')();

var config;

commander
    .version('0.1.0')
    .option('-t --target', 'test')
    .action(function (path) {
        if (typeof path != 'string')
            config = require('./config');
        else
            config = require(path);
    })
    .parse(process.argv);

const service_server = config.service_server;

app.use(session({
    resave: false,
    saveUninitialized: false,
    store: new FileStore(),
    secret: 'hehe',
    cookie: {
        maxAge: 3000000
    }
}));

app.use(function (req, res, next) {
    if (req.url.split('/')[1] === 'sign') {
        next();
        return;
    }

    proxy.web(req, res, { target: service_server });
});

const bodyParser = require('body-parser');//用于处理表单数据

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/sign', getRouter(config));

const server = app.listen(8080, function () {
    console.log('admin server start working!');
});
