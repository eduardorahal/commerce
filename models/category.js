//Require Mongoose & Database config
const mongoose = require('mongoose');
const database = require('../config/database');


// Sub Schema
const SubSchema = mongoose.Schema({
    _id: {type: String, required: true},
    id: {type: String, required: true},
    name: {type: String, required: true},
    page_description: {type: String},
    page_title: {type: String},
    parent_category_id: {type: String},
    image: {type: String},
});

// Category Schema
const CatSchema = mongoose.Schema({
    _id: {type: String, required: true},
    id: {type: String, required: true},
    name: {type: String, required: true},
    page_description: {type: String},
    page_title: {type: String},
    parent_category_id: {type: String},
    image: {type: String},
    categories: [SubSchema]
});

// Main Schema
const CategorySchema = mongoose.Schema({
    _id: {type: String, required: true},
    id: {type: String, required: true},
    name: {type: String, required: true},
    page_description: {type: String},
    page_title: {type: String},
    parent_category_id: {type: String},
    image: {type: String},
    categories: [CatSchema]
}, { collection: 'categories' });

//Create and Export Category Model
const Category = module.exports = mongoose.model('Category', CategorySchema);