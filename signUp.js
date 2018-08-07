const expect = require('chai').expect;

const url = "mongodb://www.lrworkshop.xin:27017/";
const MongoClient = require('mongodb').MongoClient;
const mongo = require('kqudie')(url);
const SignUp  = require('../bin/SignUp')

const DATABASE = "ISInformationPlatform";
const COLLECTION = "User";

describe('SignUp',function(){
    before(async function(){
        let connect = null;

        try{
            connect = await MongoClient.connect(url);
        }catch(err){
            throw err;
        }

        let db = connect.db(DATABASE);
        let collect= db.collection(COLLECTION);

        try{
            await collect.deleteMany();
        }catch(err){
            throw err;
        }
    });

    it('test',async function(){
        try{
            let username = 'admin';
         let password = 123;
         let result = await SignUp(username,password);

          expect(result).to.equal(true);
        }catch(err){
         throw err;
        }
    });
});