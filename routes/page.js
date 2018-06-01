module.exports = init;
function init(app){
    app.get('/homePage',function(req,res){
        res.sendFile('../views/homePage.html');
    });
    app.get('/login',function(req,res){
        res.sendFile('../views/loginPage.html');
    });
    app.get('/sign',function(req,res){
        res.sendFile('../views/signPage.html')
    });
}