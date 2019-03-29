// Requires
const express = require('express');
require('dotenv').config();
const convict = require('convict');
const mongoose = require('mongoose');
const database = require('./config/database');
const path = require('path');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var expressLayouts = require('express-ejs-layouts');

// Define Server
var server = express();

// Set Static Folder
server.use('/public', express.static(__dirname + '/public'))

// Port Number
const port = process.env.PORT || 3000;

// Start Server
server.listen(port, () => {
    console.log('Server started on port '+port);
});

// Set EJS - View Engine
server.set('view engine', 'ejs');
server.set('views', path.join(__dirname, 'views'));

// Set Express-EJS-Layouts
server.use(expressLayouts);

// Set Favicon
server.use(favicon(path.join(__dirname,'favicon.ico')));

// Set Body Parser
server.use(bodyParser.urlencoded()); 
server.use(bodyParser.json())

//Set Routes
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');

server.use('/', categoryRoutes);








