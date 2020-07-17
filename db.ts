import {MongoClient} from "mongodb";
const assert = require('assert');
const config = require('./bin/config');
const cnx = require('mongodb').MongoClient;

let _db: MongoClient;

export const testDb = async (): Promise<boolean> => {
    try {
        const client = await cnx.connect(config.db.connectionString, config.db.connectionOptions);
        await client.close();
        return true;
    } catch (err) {
        return false;
    }
}

export const initDb = async (callback: Function): Promise<Function> => {
    if (_db) {
        console.warn('Trying to init DB again!');
        return callback(null, _db);
    }
    try {
        const client = await cnx.connect(config.db.connectionString, config.db.connectionOptions);
        const db = client.db('test');
        console.log('DB initialized - connected to: ' + config.db.connectionString.split('@')[1]);
        _db = db;
        return callback(null, _db);
    } catch (err) {
        return callback(err);
    }
}

export const getDb = (): MongoClient => {
    assert.ok(_db, 'Db has not been initialized. Please called init first.');
    return _db;
}
