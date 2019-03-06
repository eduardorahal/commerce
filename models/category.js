const mongoose = require('mongoose');
const database = require('../config/database');

// Category Schema

const CategorySchema = mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    page_description: {
        type: String,
        required: false
    },
    page_title: {
        type: String,
        required: false
    },
    parent_category_id: {
        type: String,
        required: false
    },
    image: {
        type: String,
        required: false
    },
});

const Category = module.exports = mongoose.model('Category', CategorySchema);

// Get Category
module.exports.getCategory = function(data, callback){
    const query = "{parent_category_id:data}";
    Category.find(query, callback);
}