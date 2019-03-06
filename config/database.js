var config_convict = require('./convict.js');
const mongoose = require('mongoose');

const db_user = process.env.DB_USER;
const db_pass = process.env.DB_PASS;
const db_host = process.env.DB_HOST;
const db_port = process.env.DB_PORT;
const db_secret = process.env.DB_SECRET;
const db_name = 'commerce-'+config_convict._instance.env;

database = module.exports = {
    url: `mongodb://${db_user}:${db_pass}@${db_host}:${db_port}/${db_name}`,
    secret: db_secret
}

// Connect to Database
mongoose.connect(database.url);

// On connection
mongoose.connection.on('connected', () => {
  console.log('Connected to database ' + db_name + ' on ' + db_host + ':' + db_port);
});

// On Error
mongoose.connection.on('error', (err) => {
  console.log('Database error '+err);
});