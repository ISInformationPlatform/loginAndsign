const expect  = require('chai').expect;

const url = "mongodb://localhost:27017/";
const MongoClient = require('mongodb').MongoClient;
const mongo = require('kqudie')(url);
const getidByUsernameAndPassword = require('../bin/sign/getidByUsernameAndPassword');

const DATABASE = "ISInformationPlatform";
const COLLECTION = "User";


var obj_id = mongo.String2ObjectId('5b5746f4ffd5c52344ece77e'),
    username = 'admin',
    password = 123;


    
describe('getidByUsernameAndPassword',function(){
    before(async function(){
        try{
            let connect = null;

            try{
                connect = await MongoClient.connect(url);
            }catch(err){
                throw err;
            }
    
            let db = connect.db(DATABASE);
            let collect= db.collection(COLLECTION);
    
            try{
                await collect.deleteMany({});
            }catch(err){
                throw err;
            }
            let insert_json = {
                _id:obj_id,
                username:username,
                password:password
            }
            await collect.insert(insert_json);
        }catch(err){
            throw err;
        }
    });

    it('test',async function(){
        try{
            let result = getidByUsernameAndPassword(username,password);
            let expect_id = mongo.ObjectId2String(obj_id);
            expect(result).to.equal(expect_id);
        }catch(err){
            throw err;
        }
    });
});

