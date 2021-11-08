/*
 *   Copyright (c) 2021 
 *   All rights reserved.
 */
const express = require('express');
const router = express.Router();
require('dotenv').config();
const nodemailer = require('nodemailer');
const multiparty = require('multiparty');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {title: 'Aliant'});
});

/* GET home page. */
router.get('/contact', function(req, res, next) {
  res.render('contact', {title: 'Aliant'});
});


//nodemailer
const transporter = nodemailer.createTransport({
  host: 'auth.smtp.1and1.fr',
  port: 587,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
});

// verify connection configuration
transporter.verify(function (error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log('Server is ready to take our messages');
  }
});

router.post('/send', (req, res) => {

  let form = new multiparty.Form();
  let data = {};
  form.parse(req, function (err, fields) {
    console.log(fields);

    Object.keys(fields).forEach(function (property) {
      data[property] = fields[property].toString();
    });

    if (data.miel !== '') {
      data.subject = `[BOT] ${data.subject}`;
    }

    const mail = {
      from: process.env.EMAIL,
      to: process.env.EMAIL,
      subject: data.subject,
      text: `${data.firstname} ${data.lastname} <${data.email}> \n${data.message}`,
    };

    transporter.sendMail(mail, (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).render('error');
      } else {
        res.status(200).render('sent');
      }
    });
  });
});

module.exports = router;
