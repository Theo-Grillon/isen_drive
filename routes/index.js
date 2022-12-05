const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index.pug', {title: ["Bienvenue à ISEN Drive"]});
});

router.get('/easter_egg', (req, res) => {
    res.render('easter_egg.pug');
});
module.exports = router;