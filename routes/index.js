const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Aliant' });
});

router.get('/contact', function(req, res, next) {
  res.render('contact', { title: 'Aliant' });
});

module.exports = router;
