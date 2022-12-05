const express = require('express');
const path = require('path');
const categories = require(path.join(__dirname,'../model/Category.js'));
const products = require(path.join(__dirname, '../model/Product.js'));
const router = express.Router();

router.get('/', async(req, res) => {
    res.render('categories.pug', {title : "Rayons",categories: await categories.getAll()});
});

router.get('/new', (req, res) => {
    res.render('categoryForm.pug', {title: ["Créer un rayon"]});
});

router.get('/:id', async(req, res) => {
    let cat = await categories.getById(req.params.id);
    res.render('category.pug', {title : "Produits du rayon "+ cat[0].name, products: await products.getByCategory(req.params.id), categoryId: req.params.id});
});

router.get('/:id/update', async(req, res) => {
    let cat = await categories.getById(req.params.id)
    res.render('categoryForm.pug', {title: "Modifier le rayon "+cat[0].name, item: cat[0]});
});

router.get('/:id/delete', (req, res) => {
    res.render('delete.pug', {title: "Suppression de rayon.", name:categories.getById(req.params.id).name, pad: " "});
});

router.post('/new', async (req, res)=>{

});

module.exports = router;