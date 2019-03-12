// Requires
const express = require('express');
require('dotenv').config();
const convict = require('convict');
const mongoose = require('mongoose');
const database = require('./config/database');
const path = require('path');
var favicon = require('serve-favicon');

// Define Server
var server = express();

// Port Number
const port = process.env.PORT || 3000;

// Start Server
server.listen(port, () => {
    console.log('Server started on port '+port);
});

// Set EJS - View Engine
server.set('view engine', 'ejs');
server.set('views', path.join(__dirname, 'views'));

//Set Favicon
server.use(favicon(path.join(__dirname,'favicon.ico')));

const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');

server.use('/', categoryRoutes);
server.use('/product', productRoutes);








