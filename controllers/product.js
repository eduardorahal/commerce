const Product = require('../models/product');
const mongoose = require('mongoose');

// Select All Products from Database
exports.getProduct = (req, res, next) => {
    Product.find().exec().then(products => {
        res.json(products)
    });
}