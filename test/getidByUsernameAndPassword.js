const expect = require('chai').expect;

const url = "mongodb://www.lrworkshop.xin:27017/";
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;

const mongo = require('kqudie')(url);
const getidByUsernameAndPassword = require('../bin/getidByUsernameAndPassword');

const DATABASE = "ISInformationPlatform";
const COLLECTION = "User";


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
            let result = await getidByUsernameAndPassword(username, password);
            console.log(result)
            let expect_id = mongo.ObjectId2String(obj_id);

            expect(result.toString()).to.equal(obj_id.toString());
        } catch (err) {
            throw err;
        }
    });
});

