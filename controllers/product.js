const Product = require('../models/product');
const Category = require('../models/category');
const mongoose = require('mongoose');
var when = require('when');
var soap = require('soap');


// Select One Product
exports.getProduct = (req, res, next) => {
    var date = yyyymmdd();
    var url = 'http://infovalutar.ro/curs.asmx?wsdl';
    var args = {dt: date};
    let p = soap.createClientAsync(url).then((client) => {
            return client.getallAsync(args);
          }).then((result) => {
            return result;
          });
    when.all([
        Category.find({}, {'id':1, 'name':1 }).exec(),
        Category.find({"id":req.params.cat},{"id":1,"name":1}).exec(),
        Category.aggregate([
            { $match: { id: req.params.cat } } ,
            { $unwind: "$categories" },
            { $unwind: "$categories.categories" },
            { $match: { "categories.categories.id":req.params.end} }
            ]).exec(),
        Product.find({"id":req.params.id}).exec(),
        p
    ])
    .then(docs => {
        res.render('../views/pages/product', {main:docs[0], cat:docs[1], sub:docs[2], id:docs[3], p:docs[4][0].getallResult.diffgram.DocumentElement.Currency});
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


// Function to Get Date formatted

function yyyymmdd() {
    var now = new Date();
    var y = now.getFullYear();
    var m = now.getMonth() + 1;
    var d = now.getDate();
    var d = d - 1;
    var mm = m < 10 ? '0' + m : m;
    var dd = d < 10 ? '0' + d : d;
    return '' + y + "-" + mm + "-" + dd;
}


// Function to get data from SOAP
function findSoap (req, res, next) {
    date = yyyymmdd();
    url = 'http://infovalutar.ro/curs.asmx?wsdl';
    args = {dt: date};
    soap.createClient(url, function(err, client) {
        client.getall(args, function(err, result) {
            return result
        })
    })
}
