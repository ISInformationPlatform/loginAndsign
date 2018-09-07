"use strict";
var url, database, collection, mongo;
;
var admin = module.exports = function (config) {
    url = config.URL;
    database = config.DATABASE;
    collection = config.user.collection;
    mongo = require('kqudie')(url);

    /**
     ** SignUp
     ** 
     **@param username
     **@param password
     */

    admin.SignUp = async function (username, password) {

        if (checkpassword(password) || checkusername(username) )
            return false;

        try {
            await mongo.insert(database, collection, {
                "username": username,
                "password": password
            });
            return true;
        } catch (error) {
            throw (error);
        }
    };

    admin.logout = function (req) {
        req.session.ID = undefined;
    };

    admin.isSignIn = function (req) {
        if (req.session.ID != null)
            return true;
        else
            return false;
    };

    admin.getidByUsernameAndPassword = async function (username, password) {
        if (typeof username != 'string')
            throw new Error('username must be a string.');
        if (typeof password != 'string')
            throw new Error('password must be a string.');

        let opt = {
            find: {
                username: username,
                password: password
            }
        }

        try {
            let result = await mongo.find(database, collection, opt);

            return result[0];
        } catch (error) {
            throw error;
        }
    };

    admin.getidBySession = function (req) {
        if (req.session.ID != undefined)
            return req.session.ID;
        else
            return null;
    };

    return admin;
}

    admin.isDuplicate = function(username){
        let isDup = await isDuplicate(username);
        if(isDup)
            return true;
        else
            return false;
    };

function checkpassword(password) {
    let regexpForpassword = new RegExp(/[^a-zA-Z0-9]/);
    let isPasswordLeagal = (password == '' || regexpForpassword.test(password) == true);

    if (isPasswordLeagal) {
        return true;
    } else {
        return false;
    }
}

function checkusername(username) {
    let regexpForUsername = new RegExp(/[^a-zA-Z0-9\u4e00-\u9fa5]/);
    let isUsernameLeagal = (username == '' || regexpForUsername.test(username) == true);

    if (isUsernameLeagal) {
        return true;
    } else {
        return false;
    }
}


async function isDuplicate(username) {
    var findObj = {
        "username": username
    }
    let result = await mongo.find(database, collection, {
        find: findObj, sort: {}
    });
    if (result.length != 0)
        return true;
    else
        return false;

}
