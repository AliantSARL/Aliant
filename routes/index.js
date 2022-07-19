/*
 *   Copyright (c) 2021 
 *   All rights reserved.
 */
const express = require('express');
const router = express.Router();
require('dotenv').config();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {title: 'Aliant'});
});

module.exports = router;
