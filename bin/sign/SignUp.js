module.exports = SignUp;
var url = "mongodb://localhost:27017/",
    database = "ISInformationPlatform",
    colleciton = "user";
var mongo = require('kqudie')(url);

/**
 ** SignUp
 ** 
 **@param username
 **@param password
 */

async function SignUp(username, password) {
    if (!checkpassword(password) || !checkusername(username))
        return false;

    try {
        await mongo.insert(database, colleciton, {
            "username": username,
            "password": password
        });
        return true;
    } catch (error) {
        throw (error);
    }
}

function checkpassword(password) {
    let regexpForpassword = new RegExp(/[^a-zA-Z0-9]/);
    let isPasswordLeagal = (password != '' && regexpForpassword.test(password) != true);

    if (isPasswordLeagal) {
        return true;
    } else {
        return false;
    }
}

function checkusername(username) {
    let regexpForUsername = new RegExp(/[^a-zA-Z0-9\u4e00-\u9fa5]/);
    let isUsernameLeagal = (username != '' && regexpForUsername.test(username) != true);

    if (isUsernameLeagal) {
        return true;
    } else {
        return false;
    }
}