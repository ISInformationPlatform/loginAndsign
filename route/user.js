const express = require('express');

module.exports = function initRoutes(config){
    let router = express.Router();

    const admin = require('../bin')(config);

    
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
    router.get('/:id', async function(req, res){
        let id = req.params.id;
    
        try{
            let result = await admin.getPersonalInfoByid(id);
    
            if(result){
              senddata = {
                  "message":"ok",
                  "data":{
                    'career_development':result.career_development,
                    'grade':result.grade,
                    'contact_way':result.contact_way,
                    'introduction':result.introduction
                  }
              }
    
              res.status(200).jsonp(senddata);
            }else{
              senddata = {
                "message":"the information is not found",
                "data":"false"
              }
    
              res.status(404).jsonp(senddata);
            }
    
        }catch(err){
          throw(err);
          res.sendStatus(500);
        }
    
      });

     /**
      * @api {post} /up 用户注册
      * @apiName addPersonalInfo
      * @apiGroup user
      * 
      * @apiSuccess {string} career_development 就业去向
      * @apiSuccess {string} grade              年级
      * @apiSuccess {string} contact_way        联系方式
      * @apiSuccess {string} introduction       个人简介     
      *
      *
      * @apiSuccessExample Success-Response:
      * {
      *    HTTP/1.1 200 ok
      *    "career_development":"go abroad",
      *    "grade":"fresh",
      *    "contact_way":"12345678",
      *    "introduction":"a student"
      * }      
      *
      * @apiError UserNotFound The id of the User was not found.
      *
      * @apiErrorExample Error-Response:
      * 
      *     HTTP/1.1 404 Not Found
      *     {
      *       "error": "Information NotFound"
      *     }     * 
      */
      router.post('/:id', async function(req, res){
        let id = req.params.id;
        let career_development = req.body.career_development;
        let grade = req.body.grade;
        let contact_way = req.body.contact_way;
        let introduction = req.body.introduction;

        try{
            await admin.addPersonalInfo(id, career_development, grade, contact_way, introduction);

            senddata = {
              "message":"ok",
              "data":"true"
            }

            res.status(200).jsonp(senddata);
        }catch(err){
          throw(err);
          res.sendStatus(500);
        }

      });

      return router;
}

    