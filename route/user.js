const express = require('express');
var router = express.Router();
var admin;

module.exports = function initRoutes(config) {
  admin = require('../bin')(config);
  return router;
}


/**
 * @api {get} /:id 获取用户信息
 * @apiName getPersonalInfoByid
 * @apiGroup user
 * 
 * @apiParam {string} id
 * 
 * @apiSuccess {string} career_development 就业去向
 * @apiSuccess {string} grade              年级
 * @apiSuccess {string} contact_way        联系方式
 * @apiSuccess {string} introduction       个人简介
 * 
 * @apiSuccessExample Success-response
 * 
 *    http/1.1 200 ok
 *    {
 *       "career_development":"go abroad",
 *       "grade":"fresh",
 *       "contact_way":"12345678",
 *       "introduction":"a student"
 *    }
 * 
 * @apiError imformation not found
 * 
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "Information NotFound"
 *     }
 */
router.get('/:id', async function (req, res) {
  let id = req.params.id;

  try {
    let result = await admin.getPersonDetail(id);

    if (!result)
      return res.status(404);

    res.status(200).jsonp({
      "data": {
        'employment': result.employment,
        'grade': result.grade,
        'tel': result.tel,
        'introduction': result.introduction
      }
    });
  } catch (err) {
    throw (err);
    res.sendStatus(500);
  }

});

router.post('/:id', async function (req, res) {
  let id = req.params.id;

  let employment = req.body.employment;
  let grade = req.body.grade;
  let tel = req.body.tel;
  let introduction = req.body.introduction;

  let opt = {
    employment, grade, tel, introduction
  }

  try {
    let result = await admin.updatePersonDetail(id, opt);

    res.status(200).jsonp({
      "message": 'ok'
    });
  } catch (err) {
    throw (err);
    res.sendStatus(500);
  }

});