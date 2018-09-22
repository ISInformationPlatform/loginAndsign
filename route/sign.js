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

    req.session.User = null;

    if (!result)
      return res.status(401).jsonp({ "message": "账户或密码错误" });

    req.session.User = {
      id: result._id,
      username: result.username
    };

    res.status(200).jsonp({
      'message': 'ok',
      'data': {
        'id': result._id,
        'username': result.username
      }
    });
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

    let isDup = await admin.isDuplicate(username);

    if (isDup)
      return res.status(422).jsonp({
        message: '用户名重复',
      });

    if (!username || !password)
      return res.status(422).jsonp({
        message: '账户或密码不合法',
      });

    let result = await admin.SignUp(username, password);

    if (result) {
      res.status(200).jsonp({
        "message": "OK",
      });
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

  router.get('/out', function (req, res) {
    req.session.User = null;

    res.status(200).jsonp({
      "message": "ok"
    });
  });

  router.get('/status', function (req, res) {
    if (!req.session.User)
      return res.status(401).jsonp({ "message": "未登录" });

    res.status(200).jsonp({
      "message": "ok",
      "data": req.session.User
    });
  });

  return router;
}

