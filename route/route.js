const express = require('express');

module.exports = function initRoutes(config) {
  let router = express.Router();

  const admin = require('../bin')(config);

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

  router.get('/loginout', function (req, res) {
    admin.logout(req);
  });

  return router;
}
