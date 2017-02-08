const assert = require('chai').assert;
const connection = require('../lib/connection.js');

// run "gomongo" in terminal before you run this test

describe('Connect to mongodb', () => {
    const DB_URI = 'mongodb://localhost:27017/connect-test';
    let db = null;

    // connect to mongodb before the tests
    before(() => {
        return connection.connect(DB_URI)
        // database from connection.connect is assigned to db
        .then(_db => db = _db);
    });

    it('assigned the return of .connect() to db', () => {
        assert.strictEqual(db, connection.db);
    });

});