const Product = require('../models/product');
const Category = require('../models/category');
const mongoose = require('mongoose');
var when = require('when');
var soap = require('soap');
var bodyParser = require('body-parser');
var _ = require('underscore');


//Get Last Date Exchange Rate
    
    var url = 'http://infovalutar.ro/curs.asmx?wsdl';
    
    var date = soap.createClientAsync(url).then((client) => {
        return client.lastdateinsertedAsync();
    }).then((result) => {
        var result1 = new Date(result[0].lastdateinsertedResult);
        var result2 = result1.getFullYear() + "-" + (result1.getMonth()<9 ? "0"+(result1.getMonth()+1) : (result1.getMonth()+1)) + "-" + result1.getDate();
        return result2;
    });

    

// Select One Product
exports.getProduct = (req, res, next) => {
    
    p = when.all([
        url,
        date
    ])
    .then(data => {
        url = data[0];
        date = data[1];
        args = {dt: date};
        
        when.all([
            soap.createClientAsync(url).then((client) => {
                return client.getallAsync(args);
            }).then((result) => {
                return result;
            })
        ])
        .then(result => {
            p = result[0][0].getallResult.diffgram.DocumentElement.Currency;
            for(i=0; i<p.length; i++){
                if(p[i].IDMoneda == "USD"){
                    ref = p[i].Value;
                }
            } 

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
                p,
                ref
            ])
            .then(docs => {
                ref = docs[3][0].price * docs[5];
                res.render('../views/pages/product', {main:docs[0], cat:docs[1], sub:docs[2], id:docs[3], p:docs[4], ref:ref});
            })


        })
    });
    
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
