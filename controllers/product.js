const Product = require('../models/product');
const mongoose = require('mongoose');

// Select One Product
exports.getProduct = (req, res, next) => {
    Product.find().exec().then(products => {
        res.json(products)
    });
}

// Select Products of a Category
exports.getProducts = (req, res, next) => {
    when.all([
        Category.find().exec(),
        Category.find({"id":req.params.cat}).exec()
    ])
    .then(docs => {
        res.render('../views/index', {docs:docs[0], cat:docs[1]});
    })
}