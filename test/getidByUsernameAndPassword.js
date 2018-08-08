const expect = require('chai').expect;

const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const config = require('./config');
const url = config.url;

const mongo = require('kqudie')(url);
const admin = require('../bin')(config);

const DATABASE = config.database;
const COLLECTION = config.colleciton;


var obj_id = mongo.String2ObjectId('5b5746f4ffd5c52344ece77e'),
    username = 'admin',
    password = 123;



describe('getidByUsernameAndPassword', function () {
    before(async function () {
        let connect = await MongoClient.connect(url);

        let db = connect.db(DATABASE);
        let collect = db.collection(COLLECTION);

        await collect.deleteMany({});

        let insert_json = {
            _id: obj_id,
            username: username,
            password: password
        }

        await collect.insert(insert_json);
    });

    it('test', async function () {
        try {
            let result = await admin.getidByUsernameAndPassword(username, password);
            let expect_id = mongo.ObjectId2String(obj_id);

            expect(result.toString()).to.equal(obj_id.toString());
        } catch (err) {
            throw err;
        }
    });
});

