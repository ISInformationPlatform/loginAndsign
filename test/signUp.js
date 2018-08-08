const expect = require('chai').expect;

const config = require('./config');
const url = config.url;
const MongoClient = require('mongodb').MongoClient;
const mongo = require('kqudie')(url);

const admin  = require('../bin')(config);

const DATABASE = config.database;
const COLLECTION = config.colleciton;

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
            let result = await admin.SignUp(username,password);

            expect(result).to.equal(true);
        }catch(err){
            throw err;
        }
    });

    it('isDuplicate',async function(){
        try{
            let username = 'admin';
            let password = 123;
            await admin.SignUp(username,password);
            let result = await admin.SignUp(username,password);

            expect(result).to.equal(false);
        }catch(err){
            throw err;
        }
    });
});