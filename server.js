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

const categories = require('./routes/categories');
const products = require('./routes/products');

server.get('/', (req, res) => {
    res.render('index', {data: data});
  });
server.use('/categories', categories);
server.use('/products', products);

var Category = require("./models/category.js");
var data = Category.getCategory;