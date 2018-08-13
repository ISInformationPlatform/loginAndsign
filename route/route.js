const express = require('express');

module.exports = initRoutes;

const config = require('./config.js');

function initRoutes(app) {
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
