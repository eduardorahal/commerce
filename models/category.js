//Require Mongoose & Database config
const mongoose = require('mongoose');
const database = require('../config/database');

// Category Schema
const CategorySchema = mongoose.Schema({
    _id: {type: String, required: true},
    id: {type: Number, required: true},
    name: {type: String, required: true},
    page_description: {type: String},
    page_title: {type: String},
    parent_category_id: {type: String},
    image: {type: String},
}, { collection: 'categories' });

//Create and Export Category Model
const Category = module.exports = mongoose.model('Category', CategorySchema);

// Select All Categories from Database
module.exports.getCategory = Category.find({});

//Select Subcategories from Database
// module.exports.getSubCategory = Category.find({"categories":{$elemMatch:{"parent_category_id":"womens"}}}).exec(function(err, subcategories){
//     if(err){
//         console.log(err);
//     } else {
//         console.log(subcategories);
//     }
// });