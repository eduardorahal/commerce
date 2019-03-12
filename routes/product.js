const express = require('express');
const router = express.Router();

ProductsController = require('../controllers/product');

router.get("/:id", ProductsController.getProduct);


module.exports = router;