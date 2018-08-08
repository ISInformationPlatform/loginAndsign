var app = require('express')();
const getRouter = require('./route.js');

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

const server = app.listen(8080,function(){
    console.log('the server start working!');
});
