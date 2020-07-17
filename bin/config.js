"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = exports.appSpace = void 0;
var user = require('../keys').user;
var pass = require('../keys').pass;
var dbName = require('../keys').dbName;
exports.appSpace = 'tiicot.network';
exports.db = {
    'connectionString': "mongodb+srv://" + user + ":" + pass + "@cluster0-y2lpo.gcp.mongodb.net/" + dbName + "?retryWrites=true&w=majority",
    'connectionOptions': {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
};
