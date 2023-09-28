const router = require('express').Router();


router.get('/', async (req, res) => {
  
    res.render('home');
    //takes index.hbs by default
})

module.exports = router