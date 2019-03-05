var config_convict = require('./convict.js');

const db_user = process.env.DB_USER;
const db_pass = process.env.DB_PASS;
const db_secret = process.env.DB_SECRET;
const env = config_convict._instance.env;

module.exports = {
    database: `mongodb://${db_user}:${db_pass}@localhost:27017/commerce-${env}`,
    secret: db_secret
}