module.exports = init;
const sign = require('../bin/sign');
function init(app){
    app.post('/sign/in',function(req,res){
        var username = req.body.username;
        var password = req.body.password;

        // callback version
        sign.getidByUsernameAndPassword(username, password,
            result => {
                if (result.length > 0) {
                    req.session.ID = result;
                    res.send('{"data":true}');
                }else{
                    res.send('{"data":false}');
                }
            });

        // async version
        // let result = await sign.getidByUsernameAndPassword(username, password)

        // if (!(result.length > 0)) res.send('{"data":false}');

        // req.session.ID = result;
        // res.send('{"data":true}');
    });
    app.post('/sign/up',function(req,res){
        var username = req.body.username;
        var password = req.body.password;
        sign.SignUp(username,password,function(result){
            if(result){
                res.rederict('/signUpSuccess');
            }else{
                res.rederict('/signUpfailed');
            }
        });
    });
    app.get('/sign/loginout',function(req,res){
        sign.logout(req);
        res.rederict('/');
    });
}
