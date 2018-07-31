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

async function getidByUsernameAndPassword(username,password){
    let options = {
       username:username,
       password:password
    }
    try{
       let result = await mongo.find(database,colleciton,options);
       return result[0]._id;
    }catch(error){
        throw error;
    }
}