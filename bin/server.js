var app = require('express')();
const server = app.listen(8080,function(){
    console.log('the server start working!');
});
initRoutes(app);
function initRoutes(app){
    console.log('111');
    require('../routes/index.js')(app);
}
