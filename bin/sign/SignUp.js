module.exports = SignUp;

function SignUp(username,password,callback){
    if(!checkpassword()||!checkusername){
        executeCallback();
        return;
    }
    insertUsername = new Promise((resovle,reject)=>{
        //插入语句
        resovle();
    })
    insertpassword = new Promise((resovle,reject)=>{
        //插入语句
        resovle();
    });
    
    Promise.all([
        insertUsername,
        insertpassword
    ]).then(executeCallback)
      .catch(err => console.log(err));


    function checkusername(){
        let regexpForUsername = new RegExp(/[^a-zA-Z0-9\u4e00-\u9fa5]/);
        let isUsernameLeagal = ( username != '' && regexpForUsername.test(username) != true);
    
        if(isUsernameLeagal){
            //console.log('username is leagal');
            return true;
        }else{
            //console.log('username is not leagal');
            return false;
        }
    }
    function checkpassword(){
     let regexpForpassword = new RegExp(/[^a-zA-Z0-9]/);
     let isPasswordLeagal = (password !=''&& regexpForpassword.test(password) != true);
     if(isPasswordLeagal){
            //console.log('password is leagal');
            return true;  
     }else{
            //console.log('username is not leagal');
            return false;
     }
    }
    function executeCallback(arg)
    {
        if(arg != undefined)
        callback(arg);
    }
}
