const Category = require('../models/category');
const mongoose = require('mongoose');
var when = require('when');

// Select Everything from Categories Collection
exports.getMain = (req, res, next) => {
    Category.find().exec()
    .then(docs => {
        res.render('../views/index', {docs:docs})
    })
}

// Select Only one Category
exports.getCat = (req, res, next) => {
    when.all([
        Category.find().exec(),
        Category.find({"id":req.params.cat}).exec()
    ])
    .then(docs => {
        res.render('../views/index', {docs:docs[0], cat:docs[1]});
    })
}

// Select SubCategory
exports.getSub = (req, res, next) => {
    when.all([
        Category.find().exec(),
        Category.find({"id":req.params.cat},{"categories":{$elemMatch:{"id":req.params.cat+"-"+req.params.sub}}}).exec()
    ])
    .then(docs => {
        res.render('../views/index', {docs:docs[0], cat:docs[1]});
    })
}
