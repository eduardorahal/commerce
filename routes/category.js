const express = require('express');
const router = express.Router();

CategoriesController = require('../controllers/category');

router.get("/", CategoriesController.getCategory);

module.exports = router;