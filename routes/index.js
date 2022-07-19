/*
 *   Copyright (c) 2021 
 *   All rights reserved.
 */
const express = require('express');
const router = express.Router();
require('dotenv').config();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home', {title: 'Aliant'});
});

/* GET legal page. */
router.get('/legal', function(req, res, next) {
  res.render('legal', {title: 'Aliant'});
});


module.exports = router;
