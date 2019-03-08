//Require Mongoose & Database config
const mongoose = require('mongoose');
const database = require('../config/database');

// Product Schema
const ProductSchema = mongoose.Schema({
    _id: {type: String, required: true},
    id: {type: Number, required: true},
    name: {type: String, required: true},
    page_description: {type: String},
    page_title: {type: String},
    parent_category_id: {type: String},
    image: {type: String},
}, { collection: 'products' });

//Create and Export Category Model
const Product = module.exports = mongoose.model('Product', ProductSchema);