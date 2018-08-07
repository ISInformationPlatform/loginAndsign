module.exports = getidByUsernameAndPassword;
var url = "mongodb://www.lrworkshop.xin:27017/",
    database = "ISInformationPlatform",
    colleciton = "user";

var mongo = require('kqudie')(url);


/** 
 ** getidByUsernameAndPassword
 ** 
 ** @param Username
 ** @param password
 */

async function getidByUsernameAndPassword(username, password) {
    let options = {
        username: username,
        password: password
    }

    try {
        let result = await mongo.find(database, colleciton, options);
        console.log(result)

        return result[0]._id;
    } catch (error) {
        throw error;
    }
}