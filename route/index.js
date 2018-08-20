const http = require('http');
const path = require('path');
const proxy = require('http-proxy').createProxyServer({});
const session = require('express-session');
const FileStore = require('session-file-store')(session);

const getRouter = require('./route.js');

var app = require('express')();

app.use(session({
    resave: false,
    saveUninitialized: false,
    store: new FileStore(),
    secret: 'hehe',
    cookie:{
        maxAge: 3000000
    }
}));

app.use(function (req, res,next) {
    if (req.url.split('/')[1] === 'sign') {
        next();
        return;
    }

    proxy.web(req,res,{target:'http://main:8081'});
});

const bodyParser = require('body-parser');//用于处理表单数据

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/sign', getRouter());

const server = app.listen(8080, function () {
    console.log('admin server start working!');
});
