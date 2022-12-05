const express = require('express');
const path = require('path');
const categories = require(path.join(__dirname,'../model/Category.js'));
const products = require(path.join(__dirname, '../model/Product.js'));
const router = express.Router();

router.get('/new', (req, res) => {
    res.render('productForm.pug', {title: "Créer un produit", categories: categories.getAll()});
});

router.get('/:id',async(req, res) => {
    let prd = await products.getById(req.params.id);
    res.render('product.pug', {title : prd.name, product: prd, category:categories.getById(prd.categoryId).name});
});

router.get('/:id/update', (req, res) => {
    let prd = products.getAll()[req.params.id-1];
    res.render('productForm.pug', {title: "Modifier le produit "+prd.name, categories: categories.getAll(), item: prd});
});

router.get('/:id/delete', (req, res) => {
    let prd = products.getAll()[req.params.id-1];
    res.render('delete.pug', {title: "Suppression de produit.", name:prd.name, pad: " "});
});

module.exports = router;