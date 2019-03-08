const Category = require('../models/category');
const mongoose = require('mongoose');

// Select All Categories from Database
exports.getCategory = (req, res, next) => {
    Category.find()
    .exec()
    .then(docs => {
        res.render('../views/index', {docs:docs})
    })
    }

// Select Only Main Categories from Database
exports.getMain = (req, res, next) => {
    Category.find()
    .exec()
    .then(docs => {
        res.render('../views/index', {docs:docs})
    })
}