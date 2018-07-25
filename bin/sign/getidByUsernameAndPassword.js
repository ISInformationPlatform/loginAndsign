module.exports = getidByUsernameAndPassword;
var url = "mongodb://localhost:27017/",
    database = "ISInformationPlatform",
    colleciton = "User";
var mongo = require('kqudie')(url);


/** 
 ** getidByUsernameAndPassword
 ** 
 ** @param Username
 ** @param password
 */

getidByUsernameAndPassword = async function (Username,password){
    let options = {
        Username,
        password
    }
    try{
       return await mongo.find(database,colleciton,options);
    }catch(error){
        throw error;
    }
}
