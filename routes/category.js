const express = require('express');
const router = express.Router();

CategoriesController = require('../controllers/category');
ProductsController = require('../controllers/product');

router.get("/", CategoriesController.getMain);
router.get("/:cat", CategoriesController.getCat);
router.get("/:cat/:sub", CategoriesController.getSub);
router.get("/:cat/:sub/:end", ProductsController.getProducts);


module.exports = router;