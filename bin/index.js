"use strict";
var url, database, collection, mongo;

var admin = module.exports = function (config) {
    url = config.URL;
    database = config.DATABASE;
    collection = config.user.collection;
    mongo = require('kqudie')(url);

    return admin;
}

/**
 * @apiName SignUp
 * @apiGroup sign
 * 
 * @apiParam {string} username 用户的账号
 * @apiParam {string} password 用户的密码
 * @apiParamExample
 * {
 *      "data":{
 *          "username":"admin"
 *          "password":"123"
 *      }
 * }
 * 
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 * 
 * @apiError ParamInvalid the username or the password is invalid
 * @apiError ParamExsited the username or the password is exsited
 */

admin.addUser = async function (username, password) {

    if (checkpassword(password) || checkusername(username))
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

/**
 * @apiName getIdByUsernameAndPassword
 * @apiGroup sign
 * 
 * @apiParam username 
 * @apiParam password
 * @apiParamExample 
 * {
 *      "data":{
 *          "username":"admin"
 *          "password":"123"
 *      }
 * }
 * 
 * @apiSuccess {string} id
 * @apiError ParamInvalid the username or the password is invalid
 * @apiError User NotFound the username  is not found
 */

admin.getIdByUsernameAndPassword = async function (username, password) {
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

/**
 * 
 * @apiName isDuplicate
 * @apiGroup sign
 * 
 * @apiParam {string} username
 * 
 * @apiError Duplicate the username is dpulicate
 */
admin.isDuplicate = async function (username) {
    let isDup = await isDuplicate(username);
    if (isDup)
        return true;
    else
        return false;
};

/**
 * 
 * @apiName getPersonalInfoByid
 * @apiGroup user
 * 
 * @apiParam {string} id
 *
 * @apiSuccess CareerDevelopment,Introdunction,Contactway,Grade
 * @apiError Information not found
 */
admin.getPersonDetail = async function (id) {
    let objId = mongo.String2ObjectId(id);

    let opt = {
        find: {
            _id: objId
        }
    }

    try {
        let result = await mongo.find(database, collection, opt);

        return result[0];
    } catch (err) {
        throw (err);
    }
};

/**
 * @apiName addPersonalInfo
 * @apiGroup user
 * 
 * @apiParam {string} id
 * @apiParam {string} careerdevelopment
 * @apiParam {string} grade
 * @apiParam {string} contactway
 * @apiParam {string} introduction
 * 
 * @apiSuccess
 * @apiError
 */
admin.updatePersonDetail = async function (id, opt = {}) {
    let objId = mongo.String2ObjectId(id);

    let employment = opt.employment || null;
    let grade = opt.grade || null;
    let tel = opt.tel || null;
    let introduction = opt.introduction || null;

    let query_json = {
        '_id': objId
    }

    let insert_json = {
        $set: {
            'employment': employment,
            'grade': grade,
            'tel': tel,
            'introduction': introduction
        }
    }

    try {
        await mongo.update(database, collection, query_json, insert_json);
    } catch (err) {
        throw (err);
    }
}

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
