module.exports = SignUp;
var url = "mongodb://localhost:27017/",
    database = "ISInformationPlatform",
    colleciton = "User";
var mongo = require('kqudie')(url);

/**
 ** SignUp
 ** 
 **@param username
 **@param password
 */

async function SignUp(username,password) {
    let insert_json = {
        username:username,
        password:password
    }
    if(!checkpassword()||!checkusername()) return false;
    try{
        await mongo.insert(database,colleciton,insert_json);
        return true;
    }catch(error){
        throw(error);
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