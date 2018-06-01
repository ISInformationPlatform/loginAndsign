module.exports = initRoutes;
function initRoutes(app){
  let fs = require('fs');
  var bodyParser = require('body-parser');
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(function(req,res,next){
    console.log('222');
    res.sendFile = function(file){
        //res.setHeader('X-Accel-Redirect','/protected/' + file);
        //res.setHeader('Cache-Control','no-store');
       // res.setHeader('Cache-Control','max-age=3600');
        fs.readFile(file,function(err,data){
        if(err)
        {
          res.writeHeader(404,{
            'content-type':'text/html;charset="utf-8"'
          })
          res.write('<h1>404</h1><body>Not Found</body>');
          res.end();
        }else{
          res.writeHeader(200,{
            'content-type':'text/html;charset="utf-8"'
          });
          res.write(data);//显示html界面到客户端
          res.end();
        }
        });
    }
    next();
});
  app.get('/',function(req,res){
    console.log('333');
    res.redirect('/homePage');
  });
  require('./page')(app);
}
