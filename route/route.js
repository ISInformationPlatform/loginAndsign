const express = require('express');

module.exports = initRoutes;

function initRoutes(app) {
  let router = express.Router();

  const sign = require('../bin');

  router.post('/in', async function (req, res) {
    var username = req.body.username;
    var password = req.body.password;

    let result = await sign.getidByUsernameAndPassword(username, password);

    if (result) {
      console.log(result)
      // req.session.ID = result;
      res.send('{"data":true}');
    } else {
      res.send('{"data":false}');
    }
  });

  router.post('/up', async function (req, res) {
    var username = req.body.username;
    var password = req.body.password;

    let result = await sign.SignUp(username, password);

    if (result) {
      res.send('{"data",true}');
    } else {
      res.send('{"data":false}');
    }
  });

  router.get('/loginout', function (req, res) {
    sign.logout(req);
  });

  return router;
}
