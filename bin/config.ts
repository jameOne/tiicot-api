const user = require('../keys').user;
const pass = require('../keys').pass;
const dbName = require('../keys').dbName;

export const appSpace = 'tiicot.network';

export const db = {
    'connectionString': `mongodb+srv://${user}:${pass}@cluster0-y2lpo.gcp.mongodb.net/${dbName}?retryWrites=true&w=majority`,
    'connectionOptions': {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
};
