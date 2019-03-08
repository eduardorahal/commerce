// Requires
const express = require('express');
require('dotenv').config();
const convict = require('convict');
const mongoose = require('mongoose');
const database = require('./config/database');
const path = require('path');

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

const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');

server.use('/category', categoryRoutes);
server.use('/product', productRoutes);

const Category = require('./controllers/category');

server.get('/', Category.getCategory);







