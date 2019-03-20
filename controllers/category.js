const Category = require('../models/category');
const mongoose = require('mongoose');
var when = require('when');
var _ = require('underscore');



// Select Everything from Categories Collection
exports.getMain = (req, res, next) => {
    Category.find({}, {'id':1, 'name':1, 'page_title':1 }).exec()
    .then(docs => {
        res.render('../views/pages/home', {main:docs})
    })
}

// Select Only one Category
exports.getCat = (req, res, next) => {
    when.all([
        Category.find({}, {'id':1, 'name':1 }).exec(),
        Category.find({"id":req.params.cat},{"id":1,"name":1,"page_description":1, 'categories.id':1, 'categories.name':1, 'categories.page_title':1}).exec()
    ])
    .then(docs => {
        res.render('../views/pages/cat', {main:docs[0], cat:docs[1]});
    })
}

// Select SubCategory
exports.getSub = (req, res, next) => {
    when.all([
        Category.find({}, {'id':1, 'name':1 }).exec(),
        Category.find({"id":req.params.cat},{"id":1,"name":1}).exec(),
        Category.find({"id":req.params.cat}, {"categories":{$elemMatch:{"id":req.params.sub}}}).exec()
    ])
    .then( docs => {
        res.render('../views/pages/sub', { _ : _ ,main:docs[0], cat:docs[1], sub:docs[2] });
    })
}
