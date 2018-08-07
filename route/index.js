var app = require('express')();
const getRouter = require('./route.js');

const bodyParser = require('body-parser');//用于处理表单数据

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/sign', getRouter());

const server = app.listen(8080,function(){
    console.log('the server start working!');
});
