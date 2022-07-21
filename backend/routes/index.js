const express = require('express');
const router = express.Router();
require('dotenv').config();

let currentYear = new Date().getFullYear();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home', {title: 'Aliant', year: currentYear});
});

/* GET legal page. */
router.get('/legal', function(req, res, next) {
  res.render('legal', {title: 'Aliant', year: currentYear});
});

module.exports = router;
