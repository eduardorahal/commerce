const Product = require('../models/product');
const Category = require('../models/category');
const mongoose = require('mongoose');
var when = require('when');

// Select One Product
exports.getProduct = (req, res, next) => {
    when.all([
        Category.find().exec(),
        Category.find({"id":req.params.cat}).exec(),
        Category.find({"id":req.params.cat}, {"categories":{$elemMatch:{"id":req.params.sub}}}).exec(),
        Product.findOne({"id":req.params.id}).exec()
    ])
    .then(docs => {
        res.render('../views/pages/product', {main:docs[0], cat:docs[1], id:docs[2]});
    })
}

// Select Products of a Category
exports.getProducts = (req, res, next) => {
    when.all([
        Category.find({}, {'id':1, 'name':1 }).exec(),
        Category.find({"id":req.params.cat},{"id":1,"name":1}).exec(),
        Category.aggregate([
            { $match: { id: req.params.cat } } ,
            { $unwind: "$categories" },
            { $unwind: "$categories.categories" },
            { $match: { "categories.categories.id":req.params.end} }
            ]).exec(),
        Product.find({"primary_category_id":req.params.end}).exec()
    ])
    .then(docs => {
        res.render('../views/pages/products', {main:docs[0], cat:docs[1], sub:docs[2], end:docs[3]});
    })
}