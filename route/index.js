const express = require('express');

module.exports = function initRoutes(config) {
  let router = express.Router();

  const admin = require('../bin')(config);

  /**
   * @api {post} /in 用户登录
   * @apiName signIn
   * @apiGroup sign
   *
   * @apiParam {String} username 用户的账号.
   * @apiParam {String} password 用户的密码.
   *
   * @apiSuccess {String} firstname Firstname of the User.
   * @apiSuccess {String} lastname  Lastname of the User.
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       "firstname": "John",
   *       "lastname": "Doe"
   *     }
   *
   * @apiError UserNotFound The id of the User was not found.
   *
   * @apiErrorExample Error-Response:
   *     HTTP/1.1 404 Not Found
   *     {
   *       "error": "UserNotFound"
   *     }
   */

  router.post('/in', async function (req, res) {
    var username = req.body.username;
    var password = req.body.password;

    let result = await admin.getidByUsernameAndPassword(username, password);

    if (result) {
      req.session.ID = result;
      res.send('{"data":true}');
    } else {
      req.session.ID = null;
      res.send('{"data":false}');
    }
  });

  /**
   * @api {post} /up 用户注册
   * @apiName signUp
   * @apiGroup sign
   *
   * @apiParam {String} username 用户的账号.
   * @apiParam {String} password 用户的密码.
   *
   * @apiSuccess {String} firstname Firstname of the User.
   * @apiSuccess {String} lastname  Lastname of the User.
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       "firstname": "John",
   *       "lastname": "Doe"
   *     }
   *
   * @apiError UserNotFound The id of the User was not found.
   *
   * @apiErrorExample Error-Response:
   *     HTTP/1.1 404 Not Found
   *     {
   *       "error": "UserNotFound"
   *     }
   */

  router.post('/up', async function (req, res) {
    var username = req.body.username;
    var password = req.body.password;

    let result = await admin.SignUp(username, password);

    if (result) {
      res.send('{"data":true}');
    } else {
      res.send('{"data":false}');
    }
  });

  /**
   * @api {post} /logout 注销
   * @apiName logout
   * @apiGroup sign
   *
   * @apiParam {String} username 用户的账号.
   * @apiParam {String} password 用户的密码.
   *
   * @apiSuccess {String} firstname Firstname of the User.
   * @apiSuccess {String} lastname  Lastname of the User.
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       "firstname": "John",
   *       "lastname": "Doe"
   *     }
   *
   * @apiError UserNotFound The id of the User was not found.
   *
   * @apiErrorExample Error-Response:
   *     HTTP/1.1 404 Not Found
   *     {
   *       "error": "UserNotFound"
   *     }
   */

  router.get('/loginout', function (req, res) {
    admin.logout(req);
  });

  return router;
}
