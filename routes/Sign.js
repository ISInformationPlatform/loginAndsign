module.exports = init;
const sign = require('../bin/sign');
function init(app){
    app.post('/sign/in',function(req,res){
        var username = req.body.username;
        var password = req.body.password;
        sign.getidByUsernameAndPassword(username,password,function(result){
            if(result.length > 0)
                res.rederict('./signInSuccess');
            else{
                res.rederict('./signInfailed');
            }
        });
        req.session.ID = result;
        req.session.username = username;
        req.session.password = password;
    });
    app.post('./sign/up',function(req,res){
        var username = req.body.username;
        var password = req.body.password;
        sign.SignUp(username,password,function(result){
            if(result){
                res.rederict('./signUpSuccess');
            }else{
                res.rederict('./signUpfailed');
            }
        });
    });
    app.get('./sign/loginout',function(req,res){
        sign.logout(req);
        res.rederict('/');
    });
}